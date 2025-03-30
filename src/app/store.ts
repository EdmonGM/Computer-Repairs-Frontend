import { create } from "zustand";

interface UserState {
  username: string;
  email: string;
  id: string;
  name: string;
  setData: (username: string, email: string, id: string, name: string) => void;
}

const useStore = create<UserState>((set) => ({
  username: "",
  email: "",
  id: "",
  name: "",
  setData: (username, email, id, name) => {
    set({ username: username, email: email, id: id, name });
  },
}));

export default useStore;
