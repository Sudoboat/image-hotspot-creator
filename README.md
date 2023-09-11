# Image Hotspot Creator

## Overview

Hotspot : A hotspot is a region in a picture that has to be highlighted

Multiple hotspots may be created in a picture by editors using the Hotspot Creator widget. Simply click and drag on the image to place a hotspot where users want it.
It will be simpler to use this Hotspot maker if there is a picture and a section of the picture that has to be highlighted. The created hotspots can also be edited and deleted after creation.

## Requirements

To use this app, user will need:

- A content type with three fields in it:
  - "Title": Field type - Short Text
  - "Image URL": Field type - Short Text
  - "hotspots": Field type - JSON Object

## How does the app work?

 Once the installation of the custom application is completed, go to the content type and add the custom application to the entry editor.

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

## Where it can be used?

The Image Hotspot Creator is useful in scenarios where user need to highlight specific areas in an image and perform actions when clicking or hovering over those areas. Here are a few examples:

- If a particular area in a picture has to be highlighted and an action like redirecting or opening a popup should be taken while clicking or hovering over the particular area, this Image hotspot creator will make it easier to reach the goal by modifying the json object.
- If there is a picture that has a number of people in it, then it can be made as clicking on a person which redirect to his instagram profile by adding a new key and value for the profile url in the json object and using that url a developer can make it interactive.
- If there is a picture that consists of a Table, a chair, a laptop, mobile, etc.There should be a seperate key and value that has the url for every product,with those keys and values developer can make it interactive, When clicking on each object, there should be a popup that does some action, like displaying detailed information of that particular product or redirecting to the shopping page for that particular product.

This tool simplifies the process of adding interactivity and enhancing user experience in images by allowing user to define and manage hotspots with ease.