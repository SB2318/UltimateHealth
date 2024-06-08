import { BASE_URL, LOGIN_API } from "../helper/APIUtils";
import { postMethodCall,postMethodCallwithToken, 
    getMethodCall,getMethodCallwithToken } from "../helper/CallAPI";
import { LoginUser, UserModel } from "../models/User";

/** The purpose of this class is to store all auth-related methods 
 * which are connected with API,  together in one place */

export class AuthApiService{

    constructor(){

    }

    /** Add Function to call login api */

    // Issue 85 : Step 1: Complete the function

    login(params:LoginUser){
    /**
     *   @params : {
     *     email: string
     *     password: string
     *    }
     */
    
      return new Promise((resolve, reject)=>{

           // return new promises with  postMethodCall(url,params)
           let url = BASE_URL+LOGIN_API
      })
      // Remember this is an initial abstraction, if you faces any difficulties you can suggest your own
      // And if you familiar with it then okay
    }
}