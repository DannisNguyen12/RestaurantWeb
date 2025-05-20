"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LikeButton({ itemId, likeCount }: { itemId: number; likeCount: number }) {
  const [count, setCount] = useState(likeCount);
  const [canLike, setCanLike] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check for auth_token cookie in the browser
    if (typeof document !== "undefined") {
      setCanLike(document.cookie.includes("auth_token="));
    }
  }, []);

  async function handleLike() {
    if (!canLike) {
      setShowPrompt(true);
      return;
    }
    await fetch("/api/like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId }),
    });
    setCount(count + 1);
  }

  function handleLogin() {
    setShowPrompt(false);
    router.push("/login");
  }

  return (
    <div>
      <button
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={handleLike}
      >
        Like
      </button>
      <span className="ml-2">{count} Likes</span>
      {showPrompt && (
        <div className="mt-2 bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-2 rounded">
          <span>You must be logged in to like. </span>
          <button
            className="ml-2 underline text-blue-600"
            onClick={handleLogin}
          >
            Login?
          </button>
          <button
            className="ml-2 underline text-gray-600"
            onClick={() => setShowPrompt(false)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
