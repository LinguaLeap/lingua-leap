const NoPhoto = ({ size }: { size: string }) => {
  return (
    <div
      className={`relative ${size === "big" && "w-40 h-40"} ${
        size === "small" && "w-24 h-24"
      } overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 flex justify-center items-center`}
    >
      <svg
        className={`absolute ${size === "big" && "w-32 h-32"} ${
          size === "small" && "w-20 h-20"
        } text-gray-400`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          clipRule="evenodd"
        ></path>
      </svg>
    </div>
  );
};

export default NoPhoto;
