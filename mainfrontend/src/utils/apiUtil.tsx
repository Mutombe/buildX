import { useState, useEffect } from "react";
import axios from "axios";

 export const useDataFetcher = (url: any) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(url);
          if (!response) {
            throw new Error('Request failed');
          }
          const jsonData = await response.data;
          setData(jsonData);
        } catch (error: any) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [url]);
  
    return { data, loading, error };
  };