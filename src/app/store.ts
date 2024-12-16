import { create } from "zustand";

interface UserState {
  username: string;
  email: string;
  id: string;
  tickets: Array<Object>;
  setId: (id: string) => void;
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
}

const useStore = create<UserState>((set) => ({
  username: "",
  email: "",
  id: "",
  tickets: [],
  setId: (id) => set({ id: id }),
  setUsername: (username) => set({ username: username }),
  setEmail: (email) => set({ email: email }),
}));

export default useStore;
