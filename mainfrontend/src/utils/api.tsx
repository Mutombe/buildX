import { client } from "./baseApiUtil";
import { useState, useEffect } from "react";

export const signup = (username: string, email: string, password: string) => {
  return client.post("/register", {
    username: username,
    email: email,
    password: password,
  });
};

export const login = (username: string, password: string) => {
  return client.post("/login", { username: username, password: password });
};

export const logout = () => {
  return client.post("/logout", { withCredentials: true });
};

export const fetchProperties = async () => {
  try {
    const response: any = await client.get("/properties");
    if (response.status === 200) {
      return response;
    }
  } catch (error: any) {
    console.error("Error fetching properties: ", error.message);
    throw error;
  }
};

export const createProperties = async (property: any) => {
  try {
    const response = await client.post("/properties", property);
    return response;
  } catch (error) {
    console.error("Error creating properties: ", error);
    throw error;
  }
};

export const useDataFetcher = (url: any) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Request failed");
        }
        const jsonData = await response.json();
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
