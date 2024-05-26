import { createSlice } from "@reduxjs/toolkit";

const propertySlice = createSlice({
  name: "properties",
  initialState: {
    properties: [],
    sellerProperties: [],
    message: "",
    error: "",
    showNotification: false,
  },
  reducers: {
    addProperty: (state, action) => {
      state.properties = action.payload.map((property) => ({
        ...property,
        liked: false,
      }));
    },
    addsellerProperties: (state, action) => {
      state.sellerProperties = action.payload.map((property) => ({
        ...property,
        liked: false,
      }));
    },
    incrementLike: (state, action) => {
      const propertyId = action.payload;
      const propertyToUpdate = state.properties.find(
        (property) => property._id === propertyId
      );
      if (propertyToUpdate) {
        propertyToUpdate.like += 1;
        propertyToUpdate.liked = true;
      }
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setshowNotification: (state, action) => {
      state.showNotification = action.payload;
    },
  },
});

export const {
  addProperty,
  addsellerProperties,
  incrementLike,
  setMessage,
  setError,
  setshowNotification,
} = propertySlice.actions;
export { propertySlice };
