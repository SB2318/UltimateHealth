import { BASE_URL, LOGIN_API, REGISTRATION_API } from "../helper/APIUtils";
import { postMethodCall,postMethodCallwithToken, 
    getMethodCall,getMethodCallwithToken } from "../helper/CallAPI";
import { LoginUser, UserModel } from "../models/User";
import axios from "axios";

/** The purpose of this class is to store all auth-related methods 
 * which are connected with API,  together in one place */

export class AuthApiService{

    constructor(){

    }

    /** Add Function to call login api */

    // Issue 85 : Step 1: Complete the function

    //pull userdata from params argument and send to api
    async login(params:LoginUser){
        params = {
            email: params.email,
            password: params.password
        }

        let url = BASE_URL+LOGIN_API

        
    
    
      return new Promise((resolve, reject)=>{

           // return new promises with  postMethodCall(url,params)
           let url = BASE_URL+LOGIN_API
           axios.post(url, params)
           .then(res => {resolve(res.data.user)})
           .catch(error => {reject(error)})

      })
      // Remember this is an initial abstraction, if you faces any difficulties you can suggest your own
      // And if you familiar with it then okay
    }


        /** Add Function to call register api */

    // Issue 115 : Step 1: Complete the function

    register(params:UserModel){
      
        
        return new Promise((resolve, reject)=>{
  
             // return new promises with  postMethodCall(url,params)
             let url = BASE_URL+REGISTRATION_API
        })
        // Remember this is an initial abstraction, if you faces any difficulties you can suggest your own
        // And if you familiar with it then okay
      }

}