import axios from "axios";
import {
  ICreateTicket,
  ITicket,
  IUpdateTicket,
  IUpdateUser,
  IUser,
} from "./types";

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

// AUTH ENDPOINTS

async function LoginHandler(username: string, password: string) {
  let res = await api.post("auth/login", {
    username: username,
    password: password,
  });

  return res;
}

async function RefreshHandler() {
  let res = await api.post("/auth/refresh");
  return res.status;
}

// APP-USERS ENDPOINT

// TODO : GETALL

// TODO : SIGN-UP

async function GetCurrentUserTickets(): Promise<Array<ITicket>> {
  let res = await api.get("/app-users/tickets");
  return res.data;
}

async function GetUserById(id: string): Promise<IUser> {
  let res = await api.get(`/app-users/${id}`);
  return res.data;
}

// TODO: DELETE

async function GetCurrentUser(): Promise<IUser> {
  let res = await api.get("/app-users/current");
  return res.data;
}

async function UpdateCurrentUser({
  name,
  email,
  currentPassword,
  newPassword,
}: IUpdateUser) {
  let res = await api.put("/app-users/current/edit", {
    name,
    email,
    currentPassword,
    newPassword,
  });
  return res.data;
}

// TICKETS ENDPOINT

// TODO : GETALL

async function CreateTicket({
  title,
  description,
  isCompleted,
}: ICreateTicket) {
  let res = await api.post("/tickets", {
    title: title,
    description: description,
    isCompleted: isCompleted,
  });
  return res.data;
}

async function GetTicketById(id: string): Promise<ITicket> {
  let res = await api.get(`/tickets/${id}`);
  return res.data;
}

async function UpdateTicket({
  id,
  title,
  description,
  isCompleted,
}: IUpdateTicket) {
  let res = await api.put(`/tickets/${id}`, {
    title: title,
    description: description,
    isCompleted: isCompleted,
  });
  return res.data;
}

// TODO : DELETE

export {
  LoginHandler,
  RefreshHandler,
  GetCurrentUser,
  GetCurrentUserTickets,
  GetUserById,
  UpdateCurrentUser,
  GetTicketById,
  CreateTicket,
  UpdateTicket,
};
