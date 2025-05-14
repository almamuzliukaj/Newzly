import React from "react";

function EverythingCard(props) {
  return (
    <div className="everything-card bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 flex flex-col gap-3 text-black dark:text-white">
      <h2 className="font-bold text-lg">{props.title}</h2>

      {props.imgUrl && (
        <div className="w-full h-48 overflow-hidden rounded-md">
          <img
            src={props.imgUrl}
            alt="News"
            className="object-cover w-full h-full"
          />
        </div>
      )}

      <p className="text-sm">{props.description?.substring(0, 200)}...</p>

      <div className="text-sm text-gray-600 dark:text-gray-300 mt-auto">
        <p><strong>Author:</strong> {props.author || "Unknown"}</p>
        <p><strong>Source:</strong> {props.source}</p>
        <p><strong>Published:</strong> {new Date(props.publishedAt).toLocaleString()}</p>
      </div>

      <a
        href={props.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-2 px-4 py-2 border border-[#6e5844] text-[#6e5844] font-semibold rounded-md text-sm hover:bg-[#6e5844] hover:text-white transition"
      >
        Read More
        <span className="text-lg">→</span>
      </a>



    </div>
  );
}

export default EverythingCard;
