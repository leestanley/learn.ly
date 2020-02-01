import io
import os
import argparse
import six

# Imports the Google Cloud client library
from google.cloud import speech
from google.cloud.speech import enums
from google.cloud.speech import types
from google.cloud import translate_v2 as translate
from google.cloud import texttospeech



def translate_text(dest_language, source_language, text):
    print(dest_language)
    print(source_language)
    # [START translate_translate_text]
    """Translates text into the target language.

    Target must be an ISO 639-1 language code.
    See https://g.co/cloud/translate/v2/translate-reference#supported_languages
    """
    translate_client = translate.Client()

    if isinstance(text, six.binary_type):
        text = text.decode('utf-8')

    # Text can also be a sequence of strings, in which case this method
    # will return a sequence of results for each text.
    result = translate_client.translate(
        text, target_language=dest_language, source_language=source_language)

    print(u'Text: {}'.format([el['input'] for el in result]))
    print(u'Translation: {}'.format([el['translatedText'] for el in result]))
    
    return ".".join([el['translatedText'] for el in result])

    # [END translate_translate_text]


def audio_to_transcript(file_name, source_language):
    # Instantiates a client
    client = speech.SpeechClient()

    # Loads the audio into memory
    with io.open(file_name, 'rb') as audio_file:
        content = audio_file.read()
        audio = types.RecognitionAudio(content=content)

    config = types.RecognitionConfig(
        encoding=enums.RecognitionConfig.AudioEncoding.ENCODING_UNSPECIFIED,
        sample_rate_hertz=16000,
        language_code=source_language)

    # Detects speech in the audio file
    response = client.recognize(config, audio)

    output = []
    for result in response.results:
        output.append(result.alternatives[0].transcript)
    return output


def text_to_audio(text, source_language, output_path):
    # Instantiates a client
    client = texttospeech.TextToSpeechClient()
    print(text)
    # Set the text input to be synthesized
    synthesis_input = texttospeech.types.SynthesisInput(text=text)

    # Build the voice request, select the language code ("en-US") and the ssml
    # voice gender ("neutral")
    voice = texttospeech.types.VoiceSelectionParams(
        language_code=source_language,
        ssml_gender=texttospeech.enums.SsmlVoiceGender.FEMALE)

    # Select the type of audio file you want returned
    audio_config = texttospeech.types.AudioConfig(
        audio_encoding=texttospeech.enums.AudioEncoding.MP3)

    # Perform the text-to-speech request on the text input with the selected
    # voice parameters and audio file type
    response = client.synthesize_speech(synthesis_input, voice, audio_config)

    # The response's audio_content is binary.
    with open(output_path, 'wb') as out:
        # Write the response to the output file.
        out.write(response.audio_content)
        print(f'Audio content written to file {output_path}')


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("source_path")
    parser.add_argument("source_language")
    parser.add_argument("dest_language")
    parser.add_argument("output_path")
    args = parser.parse_args()
    text = audio_to_transcript(args.source_path, args.source_language)
    translated_text = translate_text(args.dest_language.split("-")[0], args.source_language.split("-")[0], text)
    text_to_audio(translated_text, args.dest_language, args.output_path)