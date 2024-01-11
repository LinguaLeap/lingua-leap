function NoPhoto({ size }: { size: string }) {
  return (
    <div
      className={`relative ${size === 'big' && 'w-40 h-40'} ${
        size === 'small' && 'w-24 h-24'
      } overflow-hidden bg-sky-blue-100 rounded-md dark:bg-deeper-sea-blue flex justify-center items-center`}
    >
      <svg
        className={`absolute ${size === 'big' && 'w-32 h-32'} ${
          size === 'small' && 'w-20 h-20'
        } text-teal-700`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}

export default NoPhoto;
