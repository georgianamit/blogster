export interface IUser {
  _id?: string
  username?: string
  email: string
  password?: string
  errors?: any
}

export interface ITokenDecoded {
  id?: string
  username?: string
}
