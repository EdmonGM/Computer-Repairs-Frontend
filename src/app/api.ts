import axios from "axios";
import { ICreateTicket, ITicket, IUpdateTicket, IUser } from "./types";

const api = axios.create({
  baseURL: "https://localhost:7198/api/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.status === 401) {
      try {
        await RefreshHandler();
        return api(originalRequest);
      } catch (err) {
        console.error("Refresh token failed", err);
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

async function LoginHandler(username: string, password: string) {
  let res = await api.post("auth/login", {
    username: username,
    password: password,
  });

  return res;
}

async function GetCurrentUser(): Promise<IUser> {
  let res = await api.get("/app-user/current");
  return res.data;
}

async function GetCurrentUserTickets(): Promise<Array<ITicket>> {
  let res = await api.get("/app-user/tickets");
  return res.data;
}

async function GetUserById(id: string): Promise<IUser> {
  let res = await api.get(`/app-user?userId=${id}`);
  return res.data;
}

async function GetTicketById(id: string): Promise<ITicket> {
  let res = await api.get(`/ticket/${id}`);
  return res.data;
}

async function CreateTicket({
  title,
  description,
  isCompleted,
}: ICreateTicket) {
  let res = await api.post("/ticket", {
    title: title,
    description: description,
    isCompleted: isCompleted,
  });
  return res.data;
}

async function UpdateTicket({
  id,
  title,
  description,
  isCompleted,
}: IUpdateTicket) {
  let res = await api.put(`/ticket/${id}`, {
    title: title,
    description: description,
    isCompleted: isCompleted,
  });
  return res.data;
}

async function RefreshHandler() {
  let res = await api.post("/auth/refresh");
  return res.status;
}
export {
  LoginHandler,
  GetCurrentUser,
  GetCurrentUserTickets,
  GetUserById,
  GetTicketById,
  CreateTicket,
  UpdateTicket,
  RefreshHandler,
};
