#!/usr/bin/env python

# Copyright 2016 Google, Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""This application demonstrates how to perform basic operations with the
Google Cloud Translate API

For more information, the documentation at
https://cloud.google.com/translate/docs.
"""

import argparse

import six



def translate_text(dest_language, source_language, text):
    # [START translate_translate_text]
    """Translates text into the target language.

    Target must be an ISO 639-1 language code.
    See https://g.co/cloud/translate/v2/translate-reference#supported_languages
    """
    from google.cloud import translate_v2 as translate
    translate_client = translate.Client()

    if isinstance(text, six.binary_type):
        text = text.decode('utf-8')

    # Text can also be a sequence of strings, in which case this method
    # will return a sequence of results for each text.
    result = translate_client.translate(
        text, target_language=dest_language, source_language=source_language)

    print(u'Text: {}'.format(result['input']))
    print(u'Translation: {}'.format(result['translatedText']))

    # [END translate_translate_text]


if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        description=__doc__,
        formatter_class=argparse.RawDescriptionHelpFormatter)
    subparsers = parser.add_subparsers(dest='command')

    translate_text_parser = subparsers.add_parser(
        'translate-text', help=translate_text.__doc__)
    translate_text_parser.add_argument('target')
    translate_text_parser.add_argument('source')
    translate_text_parser.add_argument('text')


    args = parser.parse_args()
    
    if args.command == 'translate-text':
        translate_text(args.target, args.source, args.text)