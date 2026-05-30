"use client";

export default function AnimatedC() {
  return (
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-w-85 max-h-85">
      <rect width="400" height="400" rx="40" fill="#FFD234"/>
      <path
        d="M360,88 C320,32 258,4 192,4 C82,4 4,76 4,200 C4,324 82,396 192,396 C258,396 320,368 360,312"
        fill="none"
        stroke="#2a2a1a"
        strokeWidth="1"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
      >
        <animate
          attributeName="stroke-dashoffset"
          values="1;0;0;1;1"
          keyTimes="0;0.55;0.72;0.95;1"
          dur="4s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.2 1; 0 0 1 1; 0.5 0 0.5 1; 0 0 1 1"
        />
        <animate
          attributeName="stroke-opacity"
          values="1;1;0;0;1"
          keyTimes="0;0.72;0.82;0.92;1"
          dur="4s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}