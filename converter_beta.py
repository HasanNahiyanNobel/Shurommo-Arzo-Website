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
pre_title = []
meta_tags = []
pre_description = []
description = []
pre_content = []
content = []
post_content = []

# TODO: Remove the following comment
# meta_title = ''
# meta_description = ''
# meta_image = ''
# meta_author = ''
# meta_og_type = ''
# meta_url = ''
# meta_twitter_domain = ''
# meta_twitter_card = ''

# Format every .py file using yapf Google style
py_files = glob.glob('*.py')
for py_file in py_files:
    os.system('yapf ' + py_file + ' -i --style google --no-local-style')

# Read pre- and post-contents from base file
with open(BASE_FILE, encoding='utf-8') as f:
    for line in f:
        if line.strip() == TITLE_BLOCK_MARKER:
            break
        pre_title.append(line)

    for line in f:
        if line.strip() == DESCRIPTION_BLOCK_MARKER:
            break
        pre_description.append(line)

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
                if 'title' in meta_tags:
                    meta_title = meta_tags['title']
                else:
                    meta_title = TITLE_DEFAULT
                if 'description' in meta_tags:
                    meta_description = meta_tags['description']
                else:
                    meta_description = DESCRIPTION_DEFAULT
                if 'image' in meta_tags:
                    meta_image = meta_tags['image']
                else:
                    meta_image = IMAGE_DEFAULT
                if 'author' in meta_tags:
                    meta_author = meta_tags['author']
                else:
                    meta_author = AUTHOR_DEFAULT
                if 'og_type' in meta_tags:
                    meta_og_type = meta_tags['og_type']
                else:
                    meta_og_type = OG_TYPE_DEFAULT
                if 'url' in meta_tags:
                    meta_url = meta_tags['url']
                else:
                    meta_url = URL_DEFAULT
                if 'twitter_domain' in meta_tags:
                    meta_twitter_domain = meta_tags['twitter_domain']
                else:
                    meta_twitter_domain = TWITTER_DOMAIN_DEFAULT
                if 'twitter_card' in meta_tags:
                    meta_twitter_card = meta_tags['twitter_card']
                else:
                    meta_twitter_card = TWITTER_CARD_DEFAULT
                print(meta_title + '\n' + meta_description + '\n' + meta_image +
                      '\n' + meta_author + '\n' + meta_og_type + '\n' +
                      meta_url + '\n' + meta_twitter_domain + '\n' +
                      meta_twitter_card)
            if current_line == START_OF_CONTENT_BLOCK_MARKER:
                content = read_block(f, True)

    # Write the contents in respective output files
    # output_path = OUTPUT_DIR + '\\' + source_file
    # with open(
    #         output_path, 'w+', encoding='utf-8'
    # ) as f:  # The 'w+' option creates the file if it does not exist already
    #     f.writelines(pre_title + meta_tags + pre_description + description +
    #                  pre_content + content + post_content)

    # Clean the arrays
    fluid_content = []
    content = []
