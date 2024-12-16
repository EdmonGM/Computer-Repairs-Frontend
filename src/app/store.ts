import { create } from "zustand";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface UserState {
  username: string;
  email: string;
  id: string;
  decodeToken: () => void;
}
type TokenPayload = {
  id: string;
  username: string;
  email: string;
};

const useStore = create<UserState>((set) => ({
  username: "",
  email: "",
  id: "",
  decodeToken: () => {
    let token = Cookies.get("access");
    if (token) {
      let { id, username, email }: TokenPayload = jwtDecode(token);
      set({ id: id, username: username, email: email });
    }
  },
}));

export default useStore;
