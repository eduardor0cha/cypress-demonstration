import React from "react";

type InputProps = {
  className?: string;
};

function Input({
  className,
  ...props
}: InputProps & React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`cyp-c-input ${className}`} {...props}></input>;
}

export default Input;
