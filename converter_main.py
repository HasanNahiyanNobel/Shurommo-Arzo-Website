#
# This converter generates static html files from a base template and source files (a bit like Django!)
#

# Imports
from os import listdir
from os.path import isfile, join
from utilities import *
import os.path
import glob

# Variables
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
        if line.strip() == CONTENT_BLOCK_MARKER:
            break
        pre_content.append(line)

    for line in f:
        post_content.append(line)

# Make a list of the source files. Concept from: https://stackoverflow.com/a/3207973.
source_files = [
    f for f in listdir(SOURCE_DIR)
    if isfile(join(SOURCE_DIR, f)) and f[0] != '_'
]  # Files starting with an underscore are template files, so they are not included in this list.

for source_file in source_files:
    # Read the source file
    source_path = SOURCE_DIR + '\\' + source_file
    with open(source_path, encoding='utf-8') as f:
        for line in f:
            current_line = line.strip()
            if current_line == START_OF_CONTENT_BLOCK_MARKER:
                content = read_block(f)

    # Create modified pre- and post-contents (to give the current page an `active` class in navbar)
    modified_pre_content = [
        sub.replace('{{ ' + source_file + ' }}', REPLACED_ACTIVE_CLASS)
        for sub in pre_content
    ]
    modified_post_content = [
        sub.replace('{{ ' + source_file + ' }}', REPLACED_ACTIVE_CLASS)
        for sub in post_content
    ]

    # Write the contents in respective output files
    output_path = OUTPUT_DIR + '\\' + source_file
    with open(
            output_path, 'w+', encoding='utf-8'
    ) as f:  # The 'w+' option creates the file if it does not exist already
        f.writelines(modified_pre_content + content + modified_post_content)

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
    if not source_files.__contains__(output_file):
        os.remove(OUTPUT_DIR + '\\' +
                  output_file)  # Remove the file from directory
        output_files.remove(output_file)  # Also remove the file from list
        print('Deleted: ' + output_file)

# Minify the script using html-minifier (https://www.npmjs.com/package/html-minifier)
os.system(
    'html-minifier --collapse-whitespace --minify-js true --no-html5 --remove-comments --remove-empty-attributes --remove-optional-tags --remove-redundant-attributes --input-dir public_beta --output-dir public_beta --file-ext html'
)  # TODO: Change input and output dir here

# Add copyright lines to the minified files
for output_file in output_files:
    prepend_line(OUTPUT_DIR + '\\' + output_file, COPYRIGHT_LINE)
