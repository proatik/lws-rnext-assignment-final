import React from "react";

const Group = () => {
  return (
    <svg
      className="w-5 h-5"
      fill="currentColor"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x={48}
        y={48}
        rx={20}
        ry={20}
        width={176}
        height={176}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="ionicon-fill-none ionicon-stroke-width"
      />
      <rect
        y={48}
        x={288}
        rx={20}
        ry={20}
        width={176}
        height={176}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="ionicon-fill-none ionicon-stroke-width"
      />
      <rect
        x={48}
        y={288}
        rx={20}
        ry={20}
        width={176}
        height={176}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="ionicon-fill-none ionicon-stroke-width"
      />
      <rect
        x={288}
        rx={20}
        ry={20}
        y={288}
        width={176}
        height={176}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="ionicon-fill-none ionicon-stroke-width"
      />
    </svg>
  );
};

export default Group;
