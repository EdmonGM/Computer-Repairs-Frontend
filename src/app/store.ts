import { create } from "zustand";

interface UserState {
  username: string;
  email: string;
  id: string;
}

const useStore = create<UserState>((set) => ({
  username: "",
  email: "",
  id: "",
}));

export default useStore;
