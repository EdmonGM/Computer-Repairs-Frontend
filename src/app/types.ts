export interface ITicket {
  id: number;
  userId: string;
  title: string;
  description: string;
  createdDate: Date;
  updatedDate: Date;
  isCompleted: boolean;
}
export interface IUser {
  id: string;
  name: string;
  userName: string;
  email: string;
  salary: number;
  tickets: Array<Object>;
}
export interface ICreateTicket {
  title: string;
  description: string;
  isCompleted: boolean;
}
export interface IUpdateTicket extends ICreateTicket {
  id: number;
}
