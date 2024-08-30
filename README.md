# YouTube Comment Picker

## Overview

The YouTube Comment Picker is a simple web application that allows users to fetch and display comments from a YouTube video. Users can input a video URL, retrieve comments, and choose either the most liked comment or a random comment from the fetched list.

## Features

- **Fetch Comments**: Retrieve up to 100 comments from a specified YouTube video.
- **Pick Most Liked Comment**: Select the comment with the highest number of likes.
- **Pick Random Comment**: Choose a random comment from the fetched list.
- **Display Comment Details**: Show the author's profile image, name, comment text, and like count.

## Technologies Used

- **HTML**: Structure of the web application.
- **CSS**: Styling and layout.
- **JavaScript**: Functionality and interactivity.
- **Axios**: HTTP client to make requests to the YouTube Data API.

## How to Use

1. **Download the `index.html` File**

   - Copy the provided HTML code into a file named `index.html`.

2. **Replace API Key**

   - Open the `index.html` file in a text editor.
   - Locate the line with `const apiKey = 'YOUR_YOUTUBE_API_KEY';`.
   - Replace `'YOUR_YOUTUBE_API_KEY'` with your actual YouTube Data API key.

3. **Open the HTML File**

   - Double-click the `index.html` file to open it in your web browser.

4. **Use the Application**
   - **Enter YouTube Video URL**: Type or paste the URL of the YouTube video into the input field and click "Fetch Comments."
   - **Pick Comments**:
     - **Pick Most Liked Comment**: Click this button to select and display the comment with the highest like count.
     - **Pick Random Comment**: Click this button to select and display a random comment from the list.

## Explanation of the Code

### HTML

- **Structure**: Defines the structure of the application, including input fields, buttons, and sections to display comments and error messages.
- **Input Field**: Allows users to enter the YouTube video URL.
- **Buttons**:
  - **Fetch Comments**: Triggers the function to retrieve comments from the YouTube API.
  - **Pick Most Liked Comment** and **Pick Random Comment**: Trigger functions to select comments based on like count or randomly.
- **Display Areas**:
  - **error**: Shows error messages if any issues occur.
  - **totalComments**: Displays the total number of comments fetched.
  - **selectedComment**: Shows the details of the selected comment.

### CSS

- **Styling**: Provides basic styling for the application to make it visually appealing. Includes font settings, padding, margins, and button hover effects.

### JavaScript

- **API Key**: Stores the YouTube Data API key needed for authentication.
- **Functions**:
  - **extractVideoId(url)**: Extracts the video ID from a given YouTube URL.
  - **fetchComments()**: Fetches comments from the YouTube API using the video ID and updates the UI with the fetched comments.
  - **cleanHtml(text)**: Cleans HTML content from comment text to ensure it is displayed properly.
  - **pickMostLikedComment()**: Selects the comment with the highest like count from the list of fetched comments.
  - **pickRandomComment()**: Randomly selects a comment from the list of fetched comments.
  - **displaySelectedComment(comment)**: Updates the UI to show details of the selected comment.
  - **setError(message)**: Displays error messages if an issue occurs during fetching or processing comments.

## Additional Information

- **YouTube Data API**: The application uses the YouTube Data API to fetch comments. You need an API key from Google Cloud Console to use this functionality.
- **Limitations**: The application fetches up to 100 comments per request. YouTube API quotas and rate limits may apply.
- **Improvements**: Future improvements could include adding more sorting options, enhancing UI/UX design, or adding pagination for comments.

---

This README provides an overview of the YouTube Comment Picker project, explains its functionality, and offers guidance on how to set up and use the application. If you have any more questions or need further assistance, feel free to ask!
