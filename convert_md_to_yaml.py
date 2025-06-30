#!/usr/bin/env python3
"""
Convert Jekyll publication markdown files to YAML format without external dependencies.
This script reads all .md files from _publications directory and creates a consolidated YAML file.
"""

import os
import re
import json
from pathlib import Path

def parse_yaml_simple(yaml_text):
    """Simple YAML parser for frontmatter."""
    data = {}
    current_key = None
    in_list = False
    list_items = []
    current_list_item = {}
    
    lines = yaml_text.strip().split('\n')
    
    i = 0
    while i < len(lines):
        line = lines[i]
        
        # Skip empty lines
        if not line.strip():
            i += 1
            continue
            
        # Count indentation
        indent = len(line) - len(line.lstrip())
        
        # Handle list items
        if line.strip().startswith('- '):
            if not in_list:
                in_list = True
                list_items = []
            
            # Start a new list item
            if current_list_item and in_list:
                list_items.append(current_list_item)
            current_list_item = {}
            
            # Parse the rest of the line after '- '
            item_text = line.strip()[2:].strip()
            if ':' in item_text:
                # It's a dict item with immediate key-value
                parts = item_text.split(':', 1)
                key = parts[0].strip()
                value = parts[1].strip().strip('"').strip("'")
                current_list_item[key] = value
            elif item_text:
                # It's a simple string item
                list_items.append(item_text.strip('"').strip("'"))
                current_list_item = {}
        else:
            # If we were in a list and hit a non-list line at base indentation, save the list
            if in_list and indent == 0 and ':' in line:
                if current_list_item:
                    list_items.append(current_list_item)
                    current_list_item = {}
                if current_key and list_items:
                    data[current_key] = list_items
                in_list = False
                list_items = []
            
            # Handle key-value pairs
            if ':' in line:
                parts = line.split(':', 1)
                key = parts[0].strip()
                value = parts[1].strip()
                
                # Check if this is a sub-key in a list item
                if in_list and indent > 0:
                    # This is a property of the current list item
                    if value.startswith('"') and value.endswith('"'):
                        value = value[1:-1]
                    elif value.startswith("'") and value.endswith("'"):
                        value = value[1:-1]
                    current_list_item[key] = value
                else:
                    # This is a top-level key
                    # Remove quotes
                    if value.startswith('"') and value.endswith('"'):
                        value = value[1:-1]
                    elif value.startswith("'") and value.endswith("'"):
                        value = value[1:-1]
                    
                    current_key = key
                    
                    # If value is not empty, it's a simple key-value
                    if value:
                        data[key] = value
        
        i += 1
    
    # Handle any remaining list
    if in_list:
        if current_list_item:
            list_items.append(current_list_item)
        if current_key and list_items:
            data[current_key] = list_items
    
    return data

def parse_markdown_frontmatter(content):
    """Extract YAML frontmatter from markdown file."""
    # Match content between --- markers
    pattern = r'^---\s*\n(.*?)\n---'
    match = re.match(pattern, content, re.DOTALL)
    
    if match:
        frontmatter_text = match.group(1)
        return parse_yaml_simple(frontmatter_text)
    return None

def format_yaml_value(value, indent=0):
    """Format a value for YAML output."""
    spaces = '  ' * indent
    
    if isinstance(value, dict):
        lines = []
        for k, v in value.items():
            if isinstance(v, (list, dict)):
                lines.append(f"{spaces}{k}:")
                lines.append(format_yaml_value(v, indent + 1))
            else:
                # Escape quotes in values
                if isinstance(v, str) and ('"' in v or "'" in v or ':' in v or '\n' in v):
                    v = '"' + v.replace('"', '\\"') + '"'
                elif isinstance(v, str) and v == '':
                    v = '""'
                lines.append(f"{spaces}{k}: {v}")
        return '\n'.join(lines)
    
    elif isinstance(value, list):
        lines = []
        for item in value:
            if isinstance(item, dict):
                lines.append(f"{spaces}- ")
                # Format dict items with proper indentation
                dict_lines = format_yaml_value(item, indent + 1).split('\n')
                for i, line in enumerate(dict_lines):
                    if i == 0:
                        lines[-1] = f"{spaces}- {line.strip()}"
                    else:
                        lines.append(f"{spaces}  {line.strip()}")
            else:
                # Escape quotes in list items
                if isinstance(item, str) and ('"' in item or "'" in item):
                    item = '"' + item.replace('"', '\\"') + '"'
                lines.append(f"{spaces}- {item}")
        return '\n'.join(lines)
    
    else:
        return f"{spaces}{value}"

def convert_publications():
    """Convert all publication markdown files to a single YAML file."""
    publications_dir = Path("_publications")
    publications = []
    
    # Skip template file
    skip_files = ['template.md']
    
    # Process all markdown files
    for md_file in sorted(publications_dir.glob("*.md")):
        if md_file.name in skip_files:
            continue
            
        print(f"Processing: {md_file.name}")
        
        with open(md_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Parse frontmatter
        data = parse_markdown_frontmatter(content)
        
        if data:
            # Clean up the data structure
            publication = {}
            
            # Add fields in order
            if 'shortname' in data:
                publication['id'] = data['shortname']
            else:
                publication['id'] = md_file.stem
                
            if 'title' in data:
                publication['title'] = data['title']
            if 'type' in data:
                publication['type'] = data['type']
            if 'field' in data:
                publication['field'] = data['field']
            if 'date' in data:
                publication['date'] = str(data['date'])
            if 'journal' in data:
                publication['journal'] = data['journal']
            if 'issue' in data:
                publication['issue'] = str(data['issue'])
            if 'pages' in data:
                publication['pages'] = str(data['pages'])
            if 'doi' in data and data['doi']:
                publication['doi'] = data['doi']
            if 'document' in data:
                publication['document'] = data['document']
            if 'abstract' in data:
                publication['abstract'] = data['abstract']
            
            # Handle coauthors
            if 'coauthors' in data and data['coauthors']:
                publication['coauthors'] = []
                for author in data['coauthors']:
                    if isinstance(author, dict) and 'name' in author:
                        publication['coauthors'].append(author['name'].strip())
                    elif isinstance(author, str):
                        publication['coauthors'].append(author.strip())
            
            # Handle links - FIXED to properly include URLs
            if 'links' in data and data['links']:
                publication['links'] = []
                for link in data['links']:
                    if isinstance(link, dict):
                        link_item = {}
                        if 'title' in link:
                            link_item['title'] = link['title']
                        if 'url' in link:
                            link_item['url'] = link['url']
                        # Only add link if it has both title and url
                        if 'title' in link_item and 'url' in link_item:
                            publication['links'].append(link_item)
            
            publications.append(publication)
    
    # Write to YAML file
    output_file = Path("data/publications.yaml")
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("publications:\n")
        for pub in publications:
            f.write("  - id: " + pub.get('id', '') + "\n")
            for key, value in pub.items():
                if key != 'id':  # Already written
                    if isinstance(value, (list, dict)):
                        f.write(f"    {key}:\n")
                        formatted = format_yaml_value(value, 3)
                        f.write(formatted + "\n")
                    else:
                        # Handle multiline strings (like abstracts)
                        if isinstance(value, str) and ('\n' in value or len(value) > 80):
                            f.write(f'    {key}: |\n')
                            for line in value.split('\n'):
                                f.write(f'      {line}\n')
                        elif isinstance(value, str) and ('"' in value or "'" in value or ':' in value):
                            # Escape special characters
                            escaped = value.replace('"', '\\"')
                            f.write(f'    {key}: "{escaped}"\n')
                        elif value == '':
                            f.write(f'    {key}: ""\n')
                        else:
                            f.write(f"    {key}: {value}\n")
            f.write("\n")
    
    print(f"\nConverted {len(publications)} publications to {output_file}")
    print(f"Skipped files: {skip_files}")

if __name__ == "__main__":
    convert_publications()