import {Navigate, Outlet, useRoutes } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { PATH } from "./path";
import { Login } from "../modules/Auth/Login";

// Outlet để cho phép đi tiếp vào children hay các trang con 
// Ví dụ ở đây là khi vào trang /auth nó sẽ vào phần element nếu ở element có Outlet nó sẽ cho đi tiếp vào các trang con bên dưới
// Ví dụ khi vào /auth nếu chưa đăng nhập do kiểm tra ở phần element nó sẽ đưa vào trang đăng nhập nếu rồi sẽ đưa ra trang home thông qua  return <Navigate to={PATH.HOME} />;

const RejectedRoutes = () =>{
    const {currentUser} = useAppSelector((state)=> state.user);
    if(currentUser === null){
        return <Outlet></Outlet>
    }
    return currentUser.maLoaiNguoiDung === "QuanTri" ? <Navigate to={PATH.ADMIN}  /> : <Navigate to={PATH.HOME}/>;
}

const useRoutesElementtsts = () =>{
    const routes = useRoutes([
        {
            path:"auth",
            element:<RejectedRoutes></RejectedRoutes>,
            children:[
                {
                    path:PATH.LOGIN,
                    element:<Login></Login>
                }
            ]
        }
    ])
    return [];
}

export default useRoutesElementtsts