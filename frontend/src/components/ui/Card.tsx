import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`
        bg-[rgb(255,255,240)]
        shadow
        p-6
        transition-all
        duration-300
        border-2
        border-transparent
        hover:border-yellow-400
        hover:shadow-yellow-300/50
        rounded-sm
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
