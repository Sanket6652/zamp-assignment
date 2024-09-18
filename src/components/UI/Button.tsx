import React from 'react';

// Define the types for the props
type ButtonProps = {
  variant?: 'default' | 'outline'; // Add more variants if needed
  onClick?: React.MouseEventHandler<HTMLButtonElement>; // Event handler type
  className?: string;
  children: React.ReactNode; // Children prop type
  [key: string]: any; // Allows for additional props
};

const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  onClick,
  className = '',
  children,
  ...props
}) => {
  const baseStyles = "px-4 py-2 rounded font-semibold transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantStyles: Record<string, string> = {
    default: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
    // Add more variants as needed
  };

  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  return (
    <button
      className={buttonStyles}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
