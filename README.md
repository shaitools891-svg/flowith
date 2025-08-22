# Bright Hearts Brighter Society - Animated React Website

Welcome to the official repository for the Bright Hearts Brighter Society website. This document provides a comprehensive guide for administrators.

## Overview

This project is a static, responsive, and multilingual (Bengali/English) website built with **React**. It features a modern, clean user interface with fluid animations powered by **Framer Motion**. The content is managed through simple JSON files, and the site is optimized for deployment on GitHub Pages.

A simple admin panel is included to assist users in generating content snippets, which are then manually added to the site's data files to update the content.

---

## Features

*   **Home:** An engaging landing page introducing the organization.
*   **About:** Detailed information about the organization's history, mission, and vision.
*   **Team:** A showcase of the core team members.
*   **Programs:** A list of ongoing programs with detailed descriptions and updates.
*   **Calendar:** An interactive calendar for upcoming events.
*   **Gallery:** A visual gallery of past events and activities.
*   **Contact:** A simple form for users to get in touch.
*   **Admin Panel:** A password-protected interface for generating content snippets.
*   **Multilingual Support:** Seamlessly switch between English and Bengali.

---

## For Administrators - Content Management Guide

This guide explains how administrators can update website content. The process involves two main stages:
1.  **Generating Content:** Using the website's Admin Panel to create a formatted content snippet.
2.  **Publishing Content:** Manually adding the generated snippet to the correct data file in the project's GitHub repository.

### **Step 1: Accessing the Admin Panel**

1.  Open the live website in your browser.
2.  Navigate to the admin page by adding `#/admin` to the end of the URL (e.g., `https://your-site.com/#/admin`).
3.  You will be prompted to log in.

### **Step 2: Logging In**

Enter the administrator password when prompted. Upon successful login, you will be redirected to the Admin Control Panel.

### **Step 3: Updating Content**

The admin panel provides forms to generate content for "Program Updates" and the "Gallery".

#### **A) How to Add a "Program Update"**
1.  In the "Add Program Update" form, select the program you wish to update from the dropdown menu.
2.  Fill in the update details in both the **English** and **Bengali** text fields.
3.  Click **"Generate Update JSON"**.
4.  A text box will appear below with a snippet of code. **Copy this entire snippet.**

#### **B) How to Add a "Gallery" Item**
This is a two-part process: first upload the image, then create its gallery entry.

1.  **Upload the Image on GitHub:**
    *   Navigate to the `public/images/gallery` folder in the GitHub repository.
    *   Click `Add file` > `Upload files`.
    *   Drag and drop your new image into the uploader.
    *   Once uploaded, **note the exact filename** (e.g., `new-event-photo.jpg`).

2.  **Create the Gallery Entry:**
    *   Return to the website's Admin Panel.
    *   In the "Manage Gallery" form, enter the **Image URL** (e.g., `public/images/gallery/new-event-photo.jpg`).
    *   Add titles and descriptions in both English and Bengali.
    *   Click **"Generate Gallery JSON"** and **copy the entire code snippet** that appears.

### **Step 4: Manually Publishing the Changes on GitHub**

After copying a JSON snippet from the admin panel, you must add it to the corresponding data file on GitHub. This final step makes your content live.

1.  **Navigate to the Data Folder:**
    *   Go to the project's repository on GitHub.
    *   Navigate to the `public/data/` folder.

2.  **Select and Edit the Correct File:**
    *   For **Program Updates**, click on `programs.json`.
    *   For **Gallery Items**, click on `gallery.json`.
    *   Click the **pencil icon** (Edit this file) in the top-right corner of the file viewer.

3.  **Paste the Copied Snippet:**
    *   **For `programs.json`**: Find the specific program by its `id` and locate its `"updates": []` array. Paste the copied snippet *inside* the square brackets `[]`. If other updates already exist, **add a comma** after the last closing brace `}` before pasting.
    *   **For `gallery.json`**: This file is an array of items. Scroll to the end of the array, add a **comma** after the last item's closing brace `}`, and paste the new snippet.

    > **Example:** Adding a new update to `programs.json`
    > ```json
    > "updates": [
    >   {
    >     "date": "2025-07-20",
    >     "text": {
    >       "en": "Previous update.",
    >       "bn": "পূর্ববর্তী আপডেট।"
    >     }
    >   },
    >   {
    >     "date": "2025-08-22",
    >     "text": {
    >       "en": "New update text in English.",
    >       "bn": "বাংলায় নতুন আপডেট টেক্সট।"
    >     }
    >   }
    > ]
    > ```

4.  **Finalize the Changes:**
    *   Scroll to the bottom of the page and click the green **"Commit changes"** button.
    *   You can leave the default commit message or add a brief description.
    *   Click **"Commit changes"** again.

Once committed, the changes are saved, and the website will automatically redeploy with the new content within a few minutes.
# flowith
