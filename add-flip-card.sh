#!/bin/bash

# Interactive flipcard creator
echo "============================"
echo "=== Flipcard Set Creator ==="
echo "============================"

read -p "File name (used for yaml and images folder): " NAME
read -p "Title: " TITLE
read -p "Cover image file name (put in assets/images/$NAME/): " COVER

DATA_DIR="_data"
IMAGES_DIR="assets/images/$NAME"
mkdir -p "$DATA_DIR"
mkdir -p "$IMAGES_DIR"

YAML_FILE="$DATA_DIR/$NAME.yml"

echo "title: $TITLE" > "$YAML_FILE"
echo "cover: $COVER" >> "$YAML_FILE"
echo "pages:" >> "$YAML_FILE"

while true; do
    echo "=== New Page ==="
    read -p "Left page image (leave empty if none): " LEFT_IMAGE
    read -p "Left page text (leave empty if none): " LEFT_TEXT

    read -p "Right page image (leave empty if none): " RIGHT_IMAGE
    read -p "Right page text (leave empty if none): " RIGHT_TEXT

    echo "  - left:" >> "$YAML_FILE"
    if [ -n "$LEFT_IMAGE" ]; then
        echo "      image: $LEFT_IMAGE" >> "$YAML_FILE"
    fi
    if [ -n "$LEFT_TEXT" ]; then
        echo "      text: |" >> "$YAML_FILE"
        while IFS= read -r line; do
            echo "        $line" >> "$YAML_FILE"
        done <<< "$LEFT_TEXT"
    fi

    echo "    right:" >> "$YAML_FILE"
    if [ -n "$RIGHT_IMAGE" ]; then
        echo "      image: $RIGHT_IMAGE" >> "$YAML_FILE"
    fi
    if [ -n "$RIGHT_TEXT" ]; then
        echo "      text: |" >> "$YAML_FILE"
        while IFS= read -r line; do
            echo "        $line" >> "$YAML_FILE"
        done <<< "$RIGHT_TEXT"
    fi

    read -p "Add another page? (y/n): " MORE
    if [[ ! "$MORE" =~ ^[Yy]$ ]]; then
        break
    fi
done

echo "Flipcard set '$NAME' created!"
echo "YAML: $YAML_FILE"
echo "Images folder: $IMAGES_DIR/"
