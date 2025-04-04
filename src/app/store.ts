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
  message: string | null;
  color: "danger" | "success";
  setState: (message: string | null, color: "danger" | "success") => void;
  clearState: () => void;
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
  color: "danger",
  setState: (message, color) => set({ message, color }),
  clearState: () => set({ message: null }),
}));

export { useUserStore, useFetchStore };
