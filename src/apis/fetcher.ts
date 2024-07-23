import axios from "axios";
import { BASE_URL, TOKEN_CYBERSOFT } from "../constant/urlConfig";

const fetcher = axios.create({
    baseURL:BASE_URL,
    headers:{
        "Content-Type":"application/json",
        TokenCybersoft:TOKEN_CYBERSOFT
    }
})

fetcher.interceptors.request.use((config)=>{
    return config
})
export default fetcher;