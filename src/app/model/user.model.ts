import { Role } from "./Role";

export class User{
    user_id!: number
    username!:string ;
    password!: string ;
    email!: string ;
    emailConfirmed!: boolean ;
    enabled!: boolean
    roles!:Role[]
    }