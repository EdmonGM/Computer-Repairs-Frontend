import { create } from "zustand";

interface UserState {
  username: string;
  email: string;
  id: string;
  setData: (username: string, email: string, id: string) => void;
}

const useStore = create<UserState>((set) => ({
  username: "",
  email: "",
  id: "",
  setData: (username, email, id) => {
    set({ username: username, email: email, id: id });
  },
}));

export default useStore;
