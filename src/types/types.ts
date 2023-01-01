export type IUser = {
  email: string | null,
  accessToken: string | null,
  name: string | null,
  id: string | null,
  photoURL: string | null,
}

export type ILogin = {
  email: string,
  password: string,
}

export type IUserData = {
  firstName: string,
  lastName: string, 
  email: string, 
  password: string,
  image: null | File
}

export type IPost = {
  id: string,
  name: string,
  img: string,
  date: string,
  body: string,
}
