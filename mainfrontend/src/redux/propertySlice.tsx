import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authAxios from "../utils/authAxios";

//export const fetchProperties = createAsyncThunk(
  //"properties/fetchProperties",
  //async (_, { rejectWithValue }) => {
   // try {
     // const response = await authAxios.get("/properties/");
     // return response.data;
    //} catch (error: any) {
     // return rejectWithValue(error.response.data);
    //}
  //}
//);

export const fetchProperties = createAsyncThunk(
  'properties/fetchProperties',
  async ({ search = '', category = '' }, ) => {
    const response = await authAxios.get(`/properties/?search=${search}&category=${category}`);
    return response.data;
  }
);

export const fetchPropertyUnits = createAsyncThunk(
  "units/fetchPropertyUnits",
  async (propertyId) => {
    const response = await authAxios.get(`/properties/${propertyId}/units/`);
    return response.data;
  }
);

export const togglePinProperty = createAsyncThunk(
  'properties/togglePin',
  async (propertyId, { rejectWithValue }) => {
    try {
      const response = await authAxios.post(`/properties/${propertyId}/pin/`);
      return { propertyId, pinned: true };
    } catch (error: any) {
      if (error.response && error.response.status === 200) {
        try {
          await authAxios.delete(`/properties/${propertyId}/pin/`);
          console.log("Property pinned:", response.data);
          return { propertyId, pinned: false }; // If unpin is successful, mark as unpinned
        } catch (unpinError: any) {
          return rejectWithValue(unpinError.response.data); // Handle unpin errors
        }
      }
      return rejectWithValue(error.response.data); 
    }
  }
);

export const fetchUserProperties = createAsyncThunk(
  "properties/fetchUserProperties",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAxios.get("/user/properties/");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProperty = createAsyncThunk(
  "properties/updateProperty",
  async ({ id, propertyData }, { rejectWithValue }) => {
    try {
      const response = await authAxios.put(`/properties/${id}/`, propertyData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProperty = createAsyncThunk(
  "properties/deleteProperty",
  async (id, { rejectWithValue }) => {
    try {
      await authAxios.delete(`/properties/${id}/`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const uploadProperty = createAsyncThunk(
  "property/uploadProperty",
  async (propertyData, { rejectWithValue }) => {
    try {
      const response = await authAxios.post("/properties/", propertyData, {});
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const propertySlice = createSlice({
  name: "properties",
  initialState: {
    properties: [],
    userProperties: [],
    token: localStorage.getItem("token") || null,
    units: [],
    loading: false,
    success: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.properties = action.payload;
      })
      .addCase(fetchProperties.rejected, (state: any, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      .addCase(togglePinProperty.fulfilled, (state, action) => {
        const { propertyId, pinned } = action.payload;
        const property = state.properties.find(p => p.id === propertyId);
        if (property) {
          property.pinned = pinned;
        }
      })
      .addCase(togglePinProperty.rejected, (state, action) => {
        state.error = action.payload; // Handle any errors
      })
      .addCase(fetchPropertyUnits.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPropertyUnits.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.units = action.payload;
      })
      .addCase(fetchPropertyUnits.rejected, (state: any, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      .addCase(fetchUserProperties.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userProperties = action.payload;
        console.log("User Properties", state.userProperties)
      })
      .addCase(fetchUserProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(uploadProperty.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.properties.push(action.payload);
      })
      .addCase(uploadProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProperty.fulfilled, (state: any, action) => {
        const index = state.userProperties.findIndex(
          (property: any) => property.id === action.payload.id
        );
        if (index !== -1) {
          state.userProperties[index] = action.payload;
        }
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.userProperties = state.userProperties.filter(
          (property: any) => property.id !== action.payload
        );
      });
  },
});

export default propertySlice.reducer;
