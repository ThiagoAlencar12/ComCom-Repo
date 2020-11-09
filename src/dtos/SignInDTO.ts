export class SignInDto {
  email: string
  password: string
}

export class ChangePasswordDto {
  id: string
  old_password: string
  new_password: string
}

export class Token {
  token: string 
}
