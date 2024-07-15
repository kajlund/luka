# LuKa

Simply my website built using

- Server-rendered pages using EJS templates
- Node.js plus Mongoose
- Vanilla JS

## Resources

- [Remix icons](https://remixicon.com/)
- [EJS](https://ejs.co/) Temmplating
- [Validator.js](https://github.com/validatorjs/validator.js/)
- [Markdown it](https://markdown-it.github.io/markdown-it/)
- [Prism.js](https://prismjs.com/) for source code highlighting

## ToDos

- [x] Add basic files needed and commit initial
- [x] Create a basic server setup
  - [x] Setup barebones express server
  - [x] Add proper router class
  - [x] Add templating
  - [x] Add 404 route and handler
  - [x] Add generic error route and handler
  - [x] Add route logging middleware
  - [x] Add DB setup
  - [x] Serve public folder
  - [x] Add favicon
  - [x] Add base stylesheet
- [x] Main Navigation
  - [x] Add header section with responsive navigation
  - [x] Add main.js script for handling popup menu
  - [x] Add theme toggle functionality
  - [x] Highligt active page in main menu 
- [x] Home page
  - [x] Add random quote functionality
- [x] Register user
  - [x] Add register form
  - [x] Add server functionality for adding user
-  [x] Login
  - [x] Add login screen
  - [x] Add session handling to server
  - [x] Add post login handler
  - [x] Add logged in user image to menu bar
  - [x] Add logout option to menu bar. Only show relevant option
  - [x] Implement logout in server clearing session
- [ ] About page
  - [x] Add personal info and image
  - [ ] Add See Also section
  - [x] Add history section
- [x] Resources page
  - [x] Ceate backend model for resources
  - [x] Create backend service for handling resource data
  - [x] Create backend routes for navigating resources
  - [x] Create backend handlers for resource routes
  - [x] Create a page for displaying and finding resources
  - [x] Create a page for adding a resource (admin)
  - [x] Create a page for editing and deleting a resource (admin)
  - [x] Create basic styling for resources UI
- [ ] Blog page
  - [x] Create backend model for posts
  - [x] Create backend service for hanling post data
  - [x] Create backend routes for navigating blog/posts
  - [x] Create backend handlers for posts routes
  - [x] Create a page for displaying posts
    - [ ] Sort pages latest updated on top
    - [ ] Add filter for tags
  - [x] Create a page for adding a post (admin)
    - [ ] Add tags
  - [x] Create a page for editing and deleting a post (admin)
    - [ ] Add tags
  - [x] Create a page for viewing a post (with markdown rendering and source code highlighting)
    - [x] Add note for old posts
  - [x] Create basic styling for posts
  - [ ] Add better widget for boolean toggles
  - [ ] Add page control widget with content on separate page
  - [ ] Add widget for mardown editing?
- [x] Add server /healthz endpoint
- [ ] Footer
  - [ ] Add copyright
  - [ ] Add social media links

## Improvements

- [ ] Add animation for displaing proverb
- [ ] Rethink and implement CSS variables, shared....
- [x] Remove theme selection for now.
- [ ] Reimplement theme selection
- [ ] Persist theme selection