import { CurrentUser } from "../interface/user.interface";
import { UserLoginRequest } from "../interface/user.interface"
import fetcher from "./fetcher"
import { ApiWelcome } from "../interface";
export const userAPI = {
    login:async (data:UserLoginRequest)=>{
        try{
            const response = await fetcher.post<ApiWelcome<CurrentUser>>("/QuanLyNguoiDung/DangNhap",data);
            return response.data.content;
        }
        catch(error:any){
            throw Error(error.response.data.content);
        }
    }
        
}