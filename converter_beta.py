"""
This converter generates static html files from a base template and source files (a bit like Django!).
Copyright © 2021-22 by Hasan Nahiyan Nobel.
"""

# Imports
from os import listdir
from os.path import isfile, join
from converter_utilities import *
import os.path
import glob
import json

# Variables
pre_meta_tags = []
meta_tags = []
pre_content = []
content = []
post_content = []

meta_title = ''
meta_description = ''
meta_image = ''
meta_author = ''
meta_og_type = ''
meta_url = ''
meta_twitter_domain = ''
meta_twitter_card = ''

# Format every .py file using yapf Google style
py_files = glob.glob('*.py')
for py_file in py_files:
    os.system('yapf ' + py_file + ' -i --style google --no-local-style')

# Read pre- and post-contents from base file
with open(BASE_FILE, encoding='utf-8') as f:
    for line in f:
        if line.strip() == META_BLOCK_MARKER:
            break
        pre_meta_tags.append(line)

    for line in f:
        if line.strip() == CONTENT_BLOCK_MARKER:
            break
        pre_content.append(line)

    for line in f:
        post_content.append(line)

# Make a list of the source files. Concept from: https://stackoverflow.com/a/3207973.
# source_files = [
#     f for f in listdir(SOURCE_DIR) if isfile(join(SOURCE_DIR, f)) and
#     f[0] != '_' and os.path.splitext(f)[1] == '.html'
# ]  # Files starting with an underscore are template files, so they are not included in this list. Also, we are processing only html files.

source_files = ['1-shahorik.html']  # TODO: Remove this debug line

for source_file in source_files:
    # Read the source file
    source_path = SOURCE_DIR + '\\' + source_file
    with open(source_path, encoding='utf-8') as f:
        for line in f:
            current_line = line.strip()
            if current_line == START_OF_META_BLOCK_MARKER:
                meta_tags = read_block(f)
                meta_tags = ''.join(meta_tags)
                meta_tags = json.loads(meta_tags)

                meta_title = set_title(meta_tags)
                meta_description = set_description(meta_tags)
                meta_image = set_image(meta_tags)
                meta_author = set_author(meta_tags)
                meta_og_type = set_og_type(meta_tags)
                meta_url = set_url(meta_tags)
                meta_twitter_domain = set_twitter_domain(meta_tags)
                meta_twitter_card = set_twitter_cards(meta_tags)

                print(''.join(meta_title))
                print(''.join(meta_description))
                print(''.join(meta_image))
                print(''.join(meta_author))
                print(''.join(meta_og_type))
                print(''.join(meta_url))
                print(''.join(meta_twitter_domain))
                print(''.join(meta_twitter_card))

                meta_tags = meta_title
                meta_tags += meta_description
                meta_tags += meta_image
                meta_tags += meta_author
                meta_tags += meta_og_type
                meta_tags += meta_url
                meta_tags += meta_twitter_domain
                meta_tags += meta_twitter_card

            if current_line == START_OF_CONTENT_BLOCK_MARKER:
                content = read_block(f, True)

    # Write the contents in respective output files
    output_path = OUTPUT_DIR + '\\' + source_file
    with open(
            output_path, 'w+', encoding='utf-8'
    ) as f:  # The 'w+' option creates the file if it does not exist already
        f.writelines(pre_meta_tags + meta_tags + pre_content + content +
                     post_content)

    # Clean the arrays
    fluid_content = []
    content = []
