import React, { useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";

// Define the shape of a comment object
interface Comment {
  text: string;
  author: string;
  profileImageUrl: string;
  likeCount: number;
  publishedAt: string; // Published date field
}

const App: React.FC = () => {
  const [videoId, setVideoId] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalComments, setTotalComments] = useState<number>(0);

  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY as string;

  const extractVideoId = (url: string): string => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname === "youtu.be") {
        return urlObj.pathname.slice(1);
      } else if (urlObj.hostname === "www.youtube.com") {
        return urlObj.searchParams.get("v") || "";
      }
      return "";
    } catch {
      return "";
    }
  };

  const fetchComments = async (): Promise<void> => {
    const cleanedVideoId = extractVideoId(videoId);
    setLoading(true);
    setError(null);

    let allComments: Comment[] = [];
    let nextPageToken: string | null = null;

    try {
      do {
        const { data }: any = await axios.get(
          "https://www.googleapis.com/youtube/v3/commentThreads",
          {
            params: {
              part: "snippet",
              videoId: cleanedVideoId,
              key: apiKey,
              maxResults: 100,
              pageToken: nextPageToken,
            },
          }
        );

        const fetchedComments: Comment[] = data.items.map((item: any) => ({
          text: cleanHtml(item.snippet.topLevelComment.snippet.textDisplay),
          author: item.snippet.topLevelComment.snippet.authorDisplayName,
          profileImageUrl:
            item.snippet.topLevelComment.snippet.authorProfileImageUrl,
          likeCount: item.snippet.topLevelComment.snippet.likeCount,
          publishedAt: item.snippet.topLevelComment.snippet.publishedAt, // Published date field
        }));

        allComments = [...allComments, ...fetchedComments];
        nextPageToken = data.nextPageToken || null;
      } while (nextPageToken);

      setComments(allComments);
      setTotalComments(allComments.length);
    } catch {
      setError("Failed to fetch comments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const cleanHtml = (text: string): string => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");
    return doc.body.textContent || "";
  };

  const pickMostLikedComment = (): void => {
    if (comments.length > 0) {
      const mostLikedComment = comments.reduce((prev, current) =>
        prev.likeCount > current.likeCount ? prev : current
      );
      setSelectedComment(mostLikedComment);
    } else {
      setError("No comments available to pick from.");
    }
  };

  const pickRandomComment = (): void => {
    if (comments.length > 0) {
      const randomIndex = Math.floor(Math.random() * comments.length);
      setSelectedComment(comments[randomIndex]);
    } else {
      setError("No comments available to pick from.");
    }
  };

  return (
    <div className="font-sans p-8 max-w-4xl mx-auto bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        YouTube Comment Picker
      </h1>
      <div className="flex flex-col space-y-6 mb-8">
        {/* Input field for video URL */}
        <input
          type="text"
          placeholder="Enter YouTube Video URL"
          value={videoId}
          onChange={(e) => setVideoId(e.target.value)}
          className="p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/* Button to fetch comments */}
        <button
          onClick={fetchComments}
          className="p-3 bg-blue-600 text-white rounded-lg flex items-center justify-center shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
          disabled={loading}
        >
          {loading ? <ClipLoader size={20} color={"#fff"} /> : "Fetch Comments"}
        </button>
        {/* Buttons to pick comments */}
        <div className="flex space-x-4 mt-4">
          <button
            onClick={pickMostLikedComment}
            className="p-3 bg-green-600 text-white rounded-lg flex items-center justify-center shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105"
            disabled={loading || comments.length === 0}
          >
            Pick Most Liked Comment
          </button>
          <button
            onClick={pickRandomComment}
            className="p-3 bg-orange-600 text-white rounded-lg flex items-center justify-center shadow-lg hover:bg-orange-700 transition-transform transform hover:scale-105"
            disabled={loading || comments.length === 0}
          >
            Pick Random Comment
          </button>
        </div>
      </div>
      {/* Display error message */}
      {error && (
        <div className="text-red-600 mt-4 text-center font-semibold">
          {error}
        </div>
      )}
      {/* Display total number of comments */}
      <div className="text-center text-gray-600 mb-4">
        <p className="text-lg font-medium">Total Comments: {totalComments}</p>
      </div>
      {/* Display selected comment */}
      {selectedComment && (
        <div className="mt-6 p-4 border border-gray-300 rounded-lg shadow-lg bg-white">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">
            Selected Comment:
          </h3>
          <div className="flex items-center space-x-4">
            <img
              src={selectedComment.profileImageUrl}
              alt="Profile"
              className="w-20 h-20 rounded-full border border-gray-300"
            />
            <div className="text-left">
              <p className="font-semibold text-xl text-gray-800">
                {selectedComment.author}
              </p>
              <p className="mt-2 text-gray-700">{selectedComment.text}</p>
              <p className="mt-2 text-sm text-gray-500">
                Likes: {selectedComment.likeCount}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
