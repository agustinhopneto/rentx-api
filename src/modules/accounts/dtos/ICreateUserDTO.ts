interface ICreateUserDTO{
  id?: string
  email:string
  name: string
  password:string
  driver_license: string
  avatar?:string
}
export { ICreateUserDTO };
