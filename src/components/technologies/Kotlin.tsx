import React from 'react';

interface KotlinIconProps {
  className?: string;
}

const Kotlin: React.FC<KotlinIconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      className={className}
      fill="none"
    >
      <path
        fill="url(#kotlin_gradient)"
        d="M128 128H0V0h128L64 64l64 64z"
      />
      <defs>
        <linearGradient
          id="kotlin_gradient"
          x1="128"
          y1="0"
          x2="0"
          y2="128"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#E44857" />
          <stop offset="30%" stopColor="#C711E1" />
          <stop offset="100%" stopColor="#00AFEC" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Kotlin;