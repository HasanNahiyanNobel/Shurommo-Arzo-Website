"""
This converter generates static html files from a base template and source files (a bit like Django!).
Copyright © 2021-22 by Hasan Nahiyan Nobel and Oteeddho.
"""

# Imports
from os import listdir
from os.path import isfile, join
from converter_utilities import *
import os.path
import glob

# Variables
pre_title = []
title = []
pre_description = []
description = []
pre_content = []
content = []
post_content = []

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
source_files = [
    f for f in listdir(SOURCE_DIR) if isfile(join(SOURCE_DIR, f)) and
    f[0] != '_' and os.path.splitext(f)[1] == '.html'
]  # Files starting with an underscore are template files, so they are not included in this list. Also, we are processing only html files.

for source_file in source_files:
    # Read the source file
    source_path = SOURCE_DIR + '\\' + source_file
    with open(source_path, encoding='utf-8') as f:
        for line in f:
            current_line = line.strip()
            if current_line == START_OF_TITLE_BLOCK_MARKER:
                title = read_block(f)[0].strip()
                if not title:
                    title = WEBSITE_TITLE_DEFAULT
                    title = [
                        '<title>',
                        title,
                        '</title>',
                        '<meta property="og:title" content="',
                        title,
                        '">',
                        '<meta name="twitter:title" content="',
                        title,
                        '">',
                    ]
                else:
                    title = [
                        '<title>',
                        title,
                        ' – ',
                        WEBSITE_TITLE_DEFAULT,
                        '</title>',
                        '<meta property="og:title" content="',
                        title,
                        '">',
                        '<meta name="twitter:title" content="',
                        title,
                        '">',
                    ]
            if current_line == START_OF_DESCRIPTION_BLOCK_MARKER:
                description = read_block(f)[0].strip()
                if not description:
                    description = WEBSITE_DESCRIPTION_DEFAULT
                description = [
                    '<meta name="description" content="',
                    description,
                    '...">',
                    '<meta property="og:description" content="',
                    description,
                    '...">',
                    '<meta name="twitter:description" content="',
                    description,
                    '...">',
                ]
            if current_line == START_OF_CONTENT_BLOCK_MARKER:
                content = read_block(f, True)

    # Write the contents in respective output files
    output_path = OUTPUT_DIR + '\\' + source_file
    with open(
            output_path, 'w+', encoding='utf-8'
    ) as f:  # The 'w+' option creates the file if it does not exist already
        f.writelines(pre_title + title + pre_description + description +
                     pre_content + content + post_content)

    # Clean the arrays
    fluid_content = []
    content = []

# Make a list of the output files
output_files = [
    f for f in listdir(OUTPUT_DIR)
    if isfile(join(OUTPUT_DIR, f)) and os.path.splitext(f)[1] == '.html'
]  # Output directory may contain files other than html—so this extra check is included in if-condition.

# Remove the output files which have been deleted from source files
for output_file in output_files:
    if not (source_files.__contains__(output_file)) and not (
            output_file == GOOGLE_OWNERSHIP_VERIFICATION_FILE
    ):  # Exclude the Google ownership verification file from deletion
        os.remove(OUTPUT_DIR + '\\' +
                  output_file)  # Remove the file from directory
        output_files.remove(output_file)  # Also remove the file from list
        print('Deleted: ' + output_file)

# Minify the script using html-minifier (https://www.npmjs.com/package/html-minifier)
os.system(
    'html-minifier --collapse-whitespace --minify-js true --no-html5 --remove-comments --remove-empty-attributes --remove-optional-tags --remove-redundant-attributes --input-dir public --output-dir public --file-ext html'
)

# Add copyright lines to the minified files
for output_file in output_files:
    prepend_line(OUTPUT_DIR + '\\' + output_file, COPYRIGHT_LINE)
