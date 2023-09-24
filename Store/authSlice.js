import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    profileTitle: null,
    description: null,
    profileImage: null,
    profileID: null,
  },
  reducers: {
    setToken: (state, action) => {
      const token = action.payload;
      state.profileID = token.profileID;
      state.profileTitle = token.profileTitle;
      state.description = token.profileDescription;
      state.profileImage = token.path;
    },
    clearToken: (state) => {
      state.profileTitle = null;
      state.profileID = null;
      state.description = null;
      state.profileImage = null;
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;

export const login = (token) => async (dispatch) => {
  try {
    dispatch(setToken(token));
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => async (dispatch) => {
  dispatch(clearToken());
};

export default authSlice.reducer;
