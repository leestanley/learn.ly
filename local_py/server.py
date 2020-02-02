import argparse
import random
import shutil
import ssl
import os
import string

import struct
import sys
import wave
import subprocess

from google.cloud import storage

from gcp_ml_interaction import translate_audio
from requests_toolbelt.multipart import decoder
from http.server import BaseHTTPRequestHandler, HTTPServer, SimpleHTTPRequestHandler
from socketserver import ThreadingMixIn
from urllib.parse import urlparse, parse_qsl


class Server(SimpleHTTPRequestHandler):
    old_translation_name = "dsafdsf.wav"
    new_translation_name = "dsafdsf.wav"

    @classmethod
    def blob_to_flac(cls, blob, file_name):
        wav_file = f"{file_name}.wav"
        flac_file = f"{file_name}.flac"
        if os.path.exists(cls.old_translation_name + '.flac'):
            os.remove(cls.old_translation_name + '.flac')
        if os.path.exists(wav_file):
            os.remove(wav_file)
        if os.path.exists(flac_file):
            os.remove(flac_file)

        with open(wav_file, mode='bx') as f:
            f.write(blob)

        cmd = f"ffmpeg -i {wav_file} {flac_file}"
        subprocess.call(cmd, shell=True)
        os.remove(wav_file)
        return flac_file

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        SimpleHTTPRequestHandler.end_headers(self)

    def do_POST(self):  # noqa N802
        content_len = int(self.headers.get("Content-Length"))
        blob = self.rfile.read(content_len)
        Server.old_translation_name = Server.new_translation_name
        Server.new_translation_name = ''.join(random.choice(string.ascii_lowercase) for _ in range(10))
        parameters = dict(parse_qsl(self.path))
        print(parameters)
        flac_path = self.blob_to_flac(blob, Server.new_translation_name)
        result, text = translate_audio(flac_path, parameters["src_language"], parameters["dst_language"],
                                       flac_path)

        self._set_headers(200, content="text")
        self.wfile.write(f"{Server.new_translation_name}.flac\n{text}".encode("utf-8"))

    def _set_headers(self, response, content="text/xml", length=None):
        self.send_response(response)
        self.send_header("Content-Type", content)

        if length:
            self.send_header("Content-Length", length)
        self.end_headers()


class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
    """Handle requests in a separate thread."""


def run_server(port, certificate=None, key=None):
    server_address = ("0.0.0.0", port)
    httpd = ThreadedHTTPServer(server_address, Server)
    if certificate:
        if key:
            httpd.socket = ssl.wrap_socket(httpd.socket, certfile=certificate, keyfile=key, server_side=True)
        else:
            httpd.socket = ssl.wrap_socket(httpd.socket, certfile=certificate, server_side=True)
    print(
        "Starting {PROTOCOL} server on port {PORT}, use <Ctrl-C> to stop".format(
            PROTOCOL="HTTPS" if certificate else "HTTP", PORT=port
        )
    )
    httpd.serve_forever()


def get_arguments():
    parser = argparse.ArgumentParser(description="Simple Server")
    parser.add_argument(
        "--certificate", help="The certificate to use for the external authenticator to run in HTTPS. Has to be .pem"
    )
    parser.add_argument("--key", help="The .key of the certificate, if not included in it")
    return parser.parse_args()


def main():
    try:
        args = get_arguments()
        # cleaning up the directory containing old files
        run_server(port=8444, certificate=args.certificate, key=args.key)
    except KeyboardInterrupt:
        print("Closing the server")
    except Exception as e:
        print("Unexpected error of type {0}: {1}".format(type(e).__name__, e))
        sys.exit(1)


if __name__ == "__main__":
    main()
