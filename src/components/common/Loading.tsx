import React, { useState, useEffect } from 'react';
import PacmanLoader from 'react-spinners/PacmanLoader';

const Loading: React.FC = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 8000);
  }, []);

  return <PacmanLoader color="#28d4d7" loading={loading} size={30} />;
};

export default Loading;
