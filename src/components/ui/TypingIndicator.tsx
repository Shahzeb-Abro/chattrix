import React from "react";

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex absolute bottom-0 right-0 translate-x-[10px] items-center justify-center bg-blue-600 rounded-xl p-1 py-0.5 min-w-8 min-h-5 ">
      <span
        className="inline-block w-1 h-1 mx-0 rounded-full bg-white animate-typing-bounce"
        style={{ animationDelay: "0s" }}
      />
      <span
        className="inline-block w-1 h-1 mx-0 rounded-full bg-white animate-typing-bounce"
        style={{ animationDelay: "0.2s" }}
      />
      <span
        className="inline-block w-1 h-1 mx-0 rounded-full bg-white animate-typing-bounce"
        style={{ animationDelay: "0.4s" }}
      />
    </div>
  );
};

export default TypingIndicator;
