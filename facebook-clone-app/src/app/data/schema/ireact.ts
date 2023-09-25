import { IUser } from "./iuser";

export interface IReact {
  type: 0 | 1 | 2, //1=like 2=love
  user: IUser,
}
