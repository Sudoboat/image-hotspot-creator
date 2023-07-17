# Image Hotspot Creator

## Overview

The Image Hotspot Creator is a tool that allows you to highlight specific regions in an image called "hotspots". Hotspots can be created, edited, and deleted using the Hotspot Creator widget. Simply click and drag on the image to place a hotspot where you want it. This tool is particularly useful when you need to highlight and add interactivity to specific areas of an image.

## Requirements

To use this app, you will need:

- A content type with three fields:
  - "Title": Field type - Short Text
  - "Image URL": Field type - Short Text
  - "hotspots": Field type - JSON Object

## How to use the app?

1. Install the custom application.
2. Go to the content type and add the custom application to the entry editor.
3. In the content section, select the content type created earlier and click the "Add Entry" button.
4. Open the Hotspot Creator in the Entry Editor.
5. Upload a new picture or select an existing image from the contentful asset.
6. Click "Proceed" to move to the creator page.
7. To create hotspots:
   - Click the crop icon.
   - Drag-select the part of the image that needs to be highlighted.
8. The coordinates of the hotspot will be displayed on the right side of the image.
9. Click "Save" to save the hotspot or "Cancel" to remove it.
10. The created hotspots will be displayed under the "Existing hotspot" section.
11. To edit a hotspot, click on its title.
12. Move to the Contentful editor, where the values will be updated in the corresponding fields.

The hotspot coordinates include:
- x: Top position of the hotspot
- y: Left position of the hotspot
- height: Height of the hotspot
- width: Width of the hotspot
- name: Name of the hotspot
- borderColor: Color of the hotspot border
- hotspotX: Top position of the point inside the hotspot
- hotspotY: Left position of the point inside the hotspot

These coordinates are stored as an array called "hotspots" in the JSON object field.

## Where can it be used?

The Image Hotspot Creator is useful in scenarios where you need to highlight specific areas in an image and perform actions such as redirecting or opening a popup when clicking or hovering over those areas. Here are a few examples:

- Highlighting people in a picture: Clicking on a person's hotspot can redirect to their Instagram profile or perform any desired action.
- Interacting with objects in an image: Clicking on objects like tables, chairs, laptops, or mobile phones can trigger popups displaying detailed information or redirecting to specific product pages.

This tool simplifies the process of adding interactivity and enhancing user experience in images by allowing you to define and manage hotspots with ease.