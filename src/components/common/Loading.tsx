/* eslint-disable react/require-default-props */
import PacmanLoader from 'react-spinners/PacmanLoader';

interface LoadingType {
  color?: string;
  size?: number;
}

function Loading({ color = '#28d4d7', size = 20 }: LoadingType) {
  return (
    <div className="flex flex-1 mx-auto justify-center p-3">
      <PacmanLoader color={color} loading size={size} />
    </div>
  );
}

export default Loading;
