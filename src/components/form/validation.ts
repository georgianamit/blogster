const PATTERN = '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+).([a-zA-Z]{2,5})$'

interface IValidate {
  name: string
  value: string
}
interface IErrors {
  username: string
  email: string
  password: string
  title: string
  body: string
}
const Validate = (name: string, value: string) => {
  let errors: IErrors = {
    username: '',
    email: '',
    password: '',
    title: '',
    body: '',
  }

  switch (name) {
    case 'name':
      errors.username = value.length === 0 ? 'Username is required' : ''
      break
    case 'email':
      errors.email = value.length === 0 ? 'Email is required' : !value.match(PATTERN) ? 'Enter a valid email id' : ''
      break
    case 'password':
      errors.password =
        value.length === 0 ? 'Password is required' : value.length < 6 ? 'Password must be atleast 6 characters' : ''
      break
    case 'title':
      errors.title = value.length === 0 ? 'Title is required' : ''
      break
    case 'body':
      errors.body = value.length === 0 ? 'Description is required' : ''
      break
    default:
      break
  }

  return {
    errors,
  }
}

export default Validate
