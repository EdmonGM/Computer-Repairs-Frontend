import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "https://localhost:7198/api/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  let token = Cookies.get("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.pathname = "/login";
      return Promise.reject(error);
    }
  }
);

async function LoginHandler(username: string, password: string) {
  let res = await api.post("auth/Login", {
    username: username,
    password: password,
  });

  return res;
}

async function GetCurrentUserTickets(): Promise<Array<Object>> {
  let res = await api.get("/app-user/tickets");
  return res.data;
}

async function GetUserById(id: string): Promise<Object> {
  let res = await api.get(`/app-user?userId=${id}`);
  return res.data;
}

export { LoginHandler, GetCurrentUserTickets, GetUserById };
