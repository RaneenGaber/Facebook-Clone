export interface IUser {
  id: number | null ,
  name: string | null ,
  image?: string | null,
  email: string | null,
  createdAt?: string | null,
  updatedAt?:string | null,
  facebookUrl?: string | null,
  phoneNumber?: string | null,
  bio?: string | null
}

