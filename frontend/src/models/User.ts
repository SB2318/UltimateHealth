import { BaseModel } from "./BaseObject";

/** User Model */
export class UserModel extends BaseModel{

    // Add your user schema
}

export class LoginUser extends BaseModel{
    email: string
    password: string
}