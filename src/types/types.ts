import { Timestamp } from "firebase/firestore"

export type IUser = {
  email: string,
  accessToken: string,
  name: string,
  uid: string,
  photoURL: string,
}

export type ICurrentUser = {
  uid: string,
  photoUrl: string,
  displayName: string,
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
  uid: string,
}

export type ActiveUser = {
  displayName: string,
  photoURL: string,
  email: string,
  uid: string,
}

export type IMessage = {
  date: Timestamp,
  id: string,
  senderUser: string,
  textMessage: string,
}
