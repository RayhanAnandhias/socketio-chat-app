import { useEffect, useState } from 'react';

export const useFetch = (url) => {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        console.log('send fetch request');
        setLoading(true);
        const response = await fetch(
          import.meta.env.VITE_API_SERVER_BASE_URL + url
        );
        const responseJson = await response.json();
        setResponseData(responseJson);
        console.log(responseJson);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return { responseData, error, loading };
};
