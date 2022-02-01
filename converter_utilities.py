"""
This script contains some constants and functions used by the other scripts.
Copyright © 2021-22 by Hasan Nahiyan Nobel and Oteeddho.
"""

# Constants
SOURCE_DIR = 'src'
OUTPUT_DIR = 'public'
BASE_FILE = SOURCE_DIR + '\\_base.html'
GOOGLE_OWNERSHIP_VERIFICATION_FILE = 'googleeed65ae6e233e9f6.html'

DATA_BLOCK_MARKER = '{% block data %}'
TITLE_BLOCK_MARKER = '{% block title %}{% endblock %}'
START_OF_TITLE_BLOCK_MARKER = '{% block title %}'
DESCRIPTION_BLOCK_MARKER = '{% block description %}{% endblock %}'
START_OF_DESCRIPTION_BLOCK_MARKER = '{% block description %}'
CONTENT_BLOCK_MARKER = '{% block content %}{% endblock %}'
START_OF_CONTENT_BLOCK_MARKER = '{% block content %}'
END_OF_BLOCK_MARKER = '{% endblock %}'

COPYRIGHT_LINE = '<!--\n---- এখানে কী চাই? 🤨\n---- এই ফাইলটা পাইথন ফ্রেমওয়ার্ক দিয়ে নির্মিত, এবং এইচটিএমএল মিনিফায়ার (এনপিএম) দিয়ে ক্ষুদ্রীকৃত।\n---- অধিকার ২০২১-২২, সুরম্য আর্য।\n--->'


# Functions
def prepend_line(filepath, line_to_prepend):
    """
    Prepend lines at the beginning of a file. Concept from https://stackoverflow.com/a/5917395.

    :param filepath: Path of the file.
    :param line_to_prepend: The line to prepend.
    :return: Nothing.
    """
    with open(filepath, 'r+', encoding='utf-8') as a_file:
        content = a_file.read()
        a_file.seek(0, 0)
        a_file.write(line_to_prepend.rstrip('\r\n') + '\n' + content)


def read_block(file):
    """
    Read lines from a file until the end of block marker is read. Additionally, adds a &NoBreak; before every em dash.

    :param file: The file from which the lines are being read.
    :return: The read lines as an array.
    """
    block = []
    for line in file:
        if line.strip() == END_OF_BLOCK_MARKER:
            break
        line = line.replace('—', '&NoBreak;—')
        block.append(line)
    return block


def english_to_bangla_number(number=None):
    """
    A slowww, but effective function to convert English numbers to Bangla, as a string.

    :param number: The number to be translated.
    :return: The translated number in Bangla, as a string. If the input is not parsed as a number, and empty string is returned.
    """
    if number is None:
        # No argument has been passed, return an empty string.
        return ''

    try:
        float(number)  # Check whether input is a number.
        bangla_digits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
        english_digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        number = number.__str__()
        for i, digit in enumerate(english_digits):
            number = [sub.replace(digit, bangla_digits[i]) for sub in number]
        return ''.join(number)

    # Input hasn't been parsed as a number. Return an empty string.
    except ValueError:
        return ''
    except TypeError:
        return ''
