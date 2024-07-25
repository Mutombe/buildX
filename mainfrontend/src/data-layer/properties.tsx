import { fetchProperties, createProperties } from "../utils/api";

export const getProperties = async () => {
  try {
    const response: any = await fetchProperties();
    return response;
  } catch (error: any) {
    return error.message;
  }
};

export const addProperties = async (property: any) => {
  try {
    const response = await createProperties(property);
    return response.data;
  } catch (error: any) {
    console.log(error.message);
  }
};
