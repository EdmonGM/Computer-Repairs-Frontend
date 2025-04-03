import { create } from "zustand";

interface UserState {
  username: string;
  email: string;
  id: string;
  name: string;
  role: string;
  setData: (
    username: string,
    email: string,
    id: string,
    name: string,
    role: string
  ) => void;
}

interface FetchState {
  message: any | null;
  setMessage: (message: string | null) => void;
  clearMessage: () => void;
}

const useUserStore = create<UserState>((set) => ({
  username: "",
  email: "",
  id: "",
  name: "",
  role: "",
  setData: (username, email, id, name, role) => {
    set({ username, email, id, name, role });
  },
}));

const useFetchStore = create<FetchState>((set) => ({
  message: null,
  setMessage: (message) => set({ message }),
  clearMessage: () => set({ message: null }),
}));

export { useUserStore, useFetchStore };
