import axios from "axios";
import Cookies from "js-cookie";
import { ICreateTicket, ITicket, IUpdateTicket, IUser } from "./types";

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

export {
  LoginHandler,
  GetCurrentUserTickets,
  GetUserById,
  GetTicketById,
  CreateTicket,
  UpdateTicket,
};
