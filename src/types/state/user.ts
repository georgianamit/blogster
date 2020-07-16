export interface IUser {
  _id: string
  username: string
  email: string
}

export interface ITokenDecoded {
  id?: string
  username?: string
}
