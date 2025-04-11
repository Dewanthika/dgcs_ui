import { RootState } from "../store";


export const getProfile = (state: RootState) => state.user.data;