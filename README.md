# Image Hotspot Creator

## Overview

Hotspots Areas are interactive regions marked over an Image. Hotspot is an identifier marker within the hotspot area to help identify and draw attention to that specific point.
Image Hotspot Creator helps users setup hotspots areas, with customisable border colours, Hotspot link positions, customisable size, etc

## Requirements

To use this app, user will need:

- A content type with three fields in it.
  - A field type of Short Text named --Image URL--.
  - A field type of JSON Object named --Hotspots--.

## How to use the app?

1. Once the installation of the Image Hotspot Creator is complete, go to the Respective content type and add the Image Hotspot to the entry editor.
2. Add an entry to the respective content model
3. Click on the crop icon and drag on the image to create interactive image hotspots
4. Details Regarding the created hotspot area are displayed on the right side of the sidebar.
5. Click save button to save the hotspot or Cancel to remove it.
6. The left side bar displays the list of crated hotspots
7. Once the creation is completed move to the Editor of Contentful, and the values are updated in the fields as user created.

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

The Image Hotspot Creator is useful in scenarios where user need to highlight specific areas in an image and perform actions when clicking or hovering over those areas. Here are a few examples:

- Highlighting people in a picture: Clicking on a person's hotspot can redirect to their Instagram profile or perform any desired action.
- Interacting with objects in an image: Clicking on objects like tables, chairs, laptops, or mobile phones can trigger popups displaying detailed information or redirecting to specific product pages.

This tool simplifies the process of adding interactivity and enhancing user experience in images by allowing user to define and manage hotspots with ease.

## Demo 
 https://www.sudoboat.com/contentful/ihc/ihc.html#demo

## Code Documentation
https://github.com/Sudoboat/image-hotspot-creator