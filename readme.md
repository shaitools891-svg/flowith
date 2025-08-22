# Bright Hearts Brighter Society - Content Management Guide

Welcome, Admin! This guide explains how to update the website content. Since this is a static website deployed on GitHub Pages, the update process is manual but straightforward. You will use the Admin Panel on the website to generate content snippets, and then paste them into the correct data files directly in the GitHub repository.

**Required Tools:**
*   A GitHub account with access to the website's repository.
*   A web browser.

---

### **Step 1: Access the Admin Panel**

1.  Navigate to the website.
2.  Add `/index.html#/admin` to the end of the URL. For example: `https://your-site.com/index.html#/admin`
3.  Enter the administrator password to log in.

---

### **Step 2: Generating Content**

The admin panel has forms for adding "Program Updates" and "Gallery Images".

#### **A) Adding a Program Update**

1.  In the Admin Panel, go to the "Add Program Update" section.
2.  Select the program you want to update from the dropdown menu.
3.  Enter the update text in both English and Bengali.
4.  Choose the date for the update.
5.  Click the "Generate Update JSON" button.
6.  A text box will appear below the button containing a block of JSON code. **Copy this entire block of code.**

#### **B) Adding a Gallery Image**

1.  **Important First Step:** Upload your image to the `src/assets/images/gallery/` folder in the GitHub repository first. You can do this using the GitHub website's "Add file -> Upload files" feature. Note the exact filename (e.g., `new_event_photo.jpg`).
2.  In the Admin Panel, go to the "Add Gallery Image" section.
3.  Enter the image filename you just uploaded (e.g., `new_event_photo.jpg`).
4.  Enter the caption in both English and Bengali.
5.  Click the "Generate Gallery JSON" button.
6.  A text box will appear with a block of JSON code. **Copy this entire block of code.**

---

### **Step 3: Updating the Data Files on GitHub**

This is the final and most critical step.

1.  Go to the website's repository on GitHub.
2.  Navigate to the `src/data/` directory.

#### **For Program Updates:**

1.  Click on the `programs.json` file to open it.
2.  Click the "Edit" (pencil) icon in the top right corner of the file view.
3.  Find the correct program entry by looking for its `"id"`.
4.  Inside that program's object, find the `"updates": []` array.
5.  Paste the JSON code you copied from the admin panel inside the square brackets `[]`. If there are already updates, add a comma `,` after the last one before pasting.

    **Example:**
    *Before:*
    ```json
    "updates": [
        { "date": "2025-08-22", "text_en": "Old update.", "text_bn": "পুরানো আপডেট।" }
    ]
