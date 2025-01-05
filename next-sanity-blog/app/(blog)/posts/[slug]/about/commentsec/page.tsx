"use client"

import React, { useState, useEffect } from "react";

const CommentsSec = () => {
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<{ username: string; comment: string }[]>([]);

  // Load comments from localStorage on component mount
  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem("comments") || "[]");
    setComments(savedComments);
  }, []);

  // Save comments to localStorage whenever comments state updates
  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();

    if (username.trim() && comment.trim()) {
      const newComment = { username, comment };
      setComments([newComment, ...comments]); // Add new comment at the beginning
      setUsername(""); // Clear the username field
      setComment(""); // Clear the comment field
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-gray-100 rounded-lg shadow-lg mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">Comments Section</h1>

      {/* Form Section */}
      <form onSubmit={handleAddComment} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <textarea
          placeholder="Enter your comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={4}
          required
        ></textarea>
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
        >
          Add Comment
        </button>
      </form>

      {/* Comments List */}
      <div className="mt-6 space-y-4">
        {comments.length > 0 ? (
          comments.map((c, index) => (
            <div key={index} className="p-3 border rounded bg-white shadow-sm">
              <p className="font-bold text-blue-600">{c.username}</p>
              <p className="text-gray-700">{c.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default CommentsSec;
