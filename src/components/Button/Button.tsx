import React from "react";

type ButtonProps = {
  className?: string;
};

function Button({
  className,
  ...props
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={`cyp-c-button ${className}`} {...props}></button>;
}

export default Button;
