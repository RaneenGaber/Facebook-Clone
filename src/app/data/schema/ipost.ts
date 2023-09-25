import { IUser } from "./iuser";

export interface IPost {
  id: number,
  title?: string,
  content: string,
  image?: string,
  user: IUser,
  createAt?: string,
  numberOfReact: number,
  numberOfComment: number,
  isReact: 0 | 1 | 2, //0 = no ,1 = like , 2 = love
  sharedPost?: IPost,
  privacy: number //0=>public 1=>friend 2=>private
}
