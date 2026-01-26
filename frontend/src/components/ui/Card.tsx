import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`
        bg-white
        shadow
        p-6
        transition-all
        duration-300
        border-2
        border-transparent
        hover:border-yellow-400
        hover:shadow-yellow-300/50
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
