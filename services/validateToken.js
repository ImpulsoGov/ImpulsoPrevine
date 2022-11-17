import axios from "axios";
import { API_URL } from "../constants/API_URL";

const validatetoken = async(token)=>{
    console.log(token)
    let config = {
        method: 'get',
        url: API_URL+'suporte/validate-token',
        headers: { 
        'Authorization': 'Bearer '+ token
        }
    };
    
    if(token){
        const {data} = await axios(config)
        console.log(data)
        return data
    }else{
        return "token invalido"
    }
    
    
}

export {validatetoken}