import api from "./baseApiUtil";

export const signup = (username: string, email: string, password: string) => {
  return api.post("/register", {
    username: username,
    email: email,
    password: password,
  });
};

export const login = (username: string, password: string) => {
  return api.post("/login", { username: username, password: password });
};

export const logout = () => {
  return api.post("/logout");
};

export const fetchUser = () => {
  const response = api.get("/user");
  console.log(response);
  return response;
};

export const subscribeToProperty = async (
  userId: number,
  propertyId: number
) => {
  try {
    const response = await api.post("/subscriptions/", {
      user: userId,
      property: propertyId,
    });
    return response.data;
  } catch (error) {
    console.error("Error subscribing to property:", error);
    throw error;
  }
};
