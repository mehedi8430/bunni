import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type BusinessInfo = {
    id: string | number;
};

const initialState: BusinessInfo = {
    id: "",
};

const businessSwitchSlice = createSlice({
    name: "businessSwitch",
    initialState,
    reducers: {
        setBusinessId: (state, action) => {
            // Mutate the state directly (Redux Toolkit uses Immer)
            Object.assign(state, { id: action.payload });
        },
    },
});

export const { setBusinessId } = businessSwitchSlice.actions;
export const selectBusinessId = (state: RootState) => state.businessSwitch.id;

export default businessSwitchSlice.reducer;