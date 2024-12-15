export interface IPasswordTypes {
  confirmPassword: string
  newPassword: string
  oldPassword: string
}

export interface IProfileDataTypes extends IPasswordTypes {
  name: string
  emailId: string
  plannerDate: string
}
