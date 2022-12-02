import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IItem {
  item: string | undefined;
  checked: boolean;
}
export interface IList {
  items: IItem[];
  currentText: string | undefined;
  isRecording: boolean;
}

const initialState: IList = {
  items: [],
  currentText: undefined,
  isRecording: false,
};

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<any>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.items = action.payload;
    },
    addToList: (state, action: PayloadAction<string | undefined>) => {
      const list = [...state.items];
      list.push({ item: action.payload, checked: false });
      state.items = list;
    },

    setCurrentText: (state, action: PayloadAction<string | undefined>) => {
      state.currentText = action.payload;
    },
    setIsRecording: (state, action: PayloadAction<boolean>) => {
      state.isRecording = action.payload;
    },

    checkItem: (state, action: PayloadAction<number>) => {
      const list = [...state.items];
      list[action.payload].checked = !list[action.payload].checked;
      state.items = list;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setItems,
  setCurrentText,
  setIsRecording,
  addToList,
  checkItem,
} = listSlice.actions;

export default listSlice.reducer;
