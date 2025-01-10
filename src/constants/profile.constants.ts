export enum FieldType {
  ConfirmPassword = 'confirmPassword',
  EmailId = 'emailId',
  Name = 'name',
  NewPassword = 'newPassword',
  OldPassWord = 'oldPassword',
  PlannerDate = 'plannerDate',
}

export enum ProfileManagerPreset {
  changePassword = 'changePassword',
  DeleteAccount = 'deleteAccount',
  EmailUpdate = 'emailUpdate',
  NameUpdate = 'nameUpdate',
  PlannerDateUpdate = 'plannerDateUpdate',
}

export const PROFILE_DEFAULT_DATA = {
  confirmPassword: '',
  emailId: '',
  name: '',
  newPassword: '',
  oldPassword: '',
  plannerDate: '',
}
