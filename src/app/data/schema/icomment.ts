import { IUser } from "./iuser";

export interface IComment {
  id: number,
  content: string,
  user: IUser,
  createAt?: string,
}
