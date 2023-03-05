import { useEffect, useState } from "react";

const useFetch = ({ fetchParamData, url, secondParam, method }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const data = fetchParamData;
      fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setData(data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.warn("Error:", error);
          setError(error.message);
        });
    }, [100]);
  }, [url, secondParam]);

  return { data, loading, error };
};
export default useFetch;
