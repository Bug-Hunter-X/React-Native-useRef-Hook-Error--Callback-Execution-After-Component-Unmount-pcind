import React, { useRef, useEffect, useState } from 'react';

const MyComponent = () => {
  const [data, setData] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      // Check if component is still mounted before updating state
      if (!isMounted) return;
      fetch('https://api.example.com/data')
        .then(response => response.json())
        .then(result => setData(result));
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const [isMounted, setIsMounted] = useState(true);
  useEffect(() => {
    return () => {
      setIsMounted(false);
    };
  }, []);

  return (
    <div>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}
    </div>
  );
};

export default MyComponent;