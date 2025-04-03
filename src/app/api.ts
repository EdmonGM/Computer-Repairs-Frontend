import axios, { AxiosError, AxiosResponse, isAxiosError } from "axios";
import {
  ICreateTicket,
  ITicket,
  IUpdateCurrentUser,
  IUpdateTicket,
  IUpdateUser,
  IUser,
} from "./types";
import { useFetchStore } from "./store";

export const api = axios.create({
  baseURL: "https://localhost:7198/api/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
  },
  withCredentials: true,
});

api.interceptors.response.use(
  async (response: AxiosResponse) => {
    return Promise.resolve(response);
  },
  async (error: AxiosError) => {
    if (!isAxiosError(error) || !error.config) return Promise.reject(error);

    if (error.status === 401) {
      try {
        await RefreshHandler();
        return api(error.config);
      } catch (error) {
        console.log(error);
      }
    }
    if (error.status === 401) {
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

function ApiMessageHandler(res: AxiosResponse) {
  if (isAxiosError(res)) {
    useFetchStore.getState().setMessage(res.response?.data ?? null);
  }
}

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

async function GetAllUsers(): Promise<Array<IUser>> {
  let res = await api.get("/app-users");
  return res.data;
}

// TODO : SIGN-UP

async function GetCurrentUserTickets(): Promise<Array<ITicket>> {
  let res = await api.get("/app-users/tickets");
  return res.data;
}

async function GetUserById(id: string): Promise<IUser> {
  let res = await api.get<IUser>(`/app-users/${id}`);
  return res.data;
}

async function UpdateUserById({ id, user }: { id: string; user: IUpdateUser }) {
  let res = await api.put(`/app-users/${id}`, {
    ...user,
  });
  return res.data;
}

async function DeleteUserById(id: string) {
  let res = await api.delete(`/app-users/${id}`);
  ApiMessageHandler(res);
  return res?.data;
}

async function GetCurrentUser(): Promise<IUser> {
  let res = await api.get("/app-users/current");
  return res.data;
}

async function UpdateCurrentUser({
  name,
  email,
  currentPassword,
  newPassword,
}: IUpdateCurrentUser) {
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

async function DeleteTicket(id: number) {
  let res = await api.delete(`/tickets/${id}`);
  return res.data;
}

export {
  LoginHandler,
  RefreshHandler,
  GetAllUsers,
  DeleteUserById,
  GetCurrentUser,
  GetCurrentUserTickets,
  GetUserById,
  UpdateUserById,
  UpdateCurrentUser,
  GetTicketById,
  CreateTicket,
  UpdateTicket,
  DeleteTicket,
};
