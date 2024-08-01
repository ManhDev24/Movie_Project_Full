import { CurrentUser, DataListUser, UserItem } from "../interface/user.interface";
import { UserLoginRequest } from "../interface/user.interface"
import fetcher from "./fetcher"
import { ApiWelcome } from "../interface";
import { GROUP_CODE, PAGE_SIZE } from "../constant";
export const userAPI = {
    login:async (data:UserLoginRequest)=>{
        try{
            const response = await fetcher.post<ApiWelcome<CurrentUser>>("/QuanLyNguoiDung/DangNhap",data);
            return response.data.content;
        }
        catch(error:any){
            throw Error(error.response.data.content);
        }
    },
    getListUser:async(payload:{page:number, pageSize?:number})=>{
        try{
            const params = {
                MaNhom:GROUP_CODE,
                soTrang:payload.page,
                soPhanTuTrenTrang:payload.pageSize||PAGE_SIZE
            }
            const response = await fetcher.get<ApiWelcome<DataListUser>>(`QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang`,
            {
                params
            }
                
            );
            return response.data.content;
        }
        catch(error:any){
            throw Error(error.response.data.content);
        }
    }
        
}