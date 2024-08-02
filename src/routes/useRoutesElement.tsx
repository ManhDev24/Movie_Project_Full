import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { useAppSelector } from '../redux/hooks'
import { PATH } from './path'
import { Login } from '../modules/Auth/Login'
import { AuthenLayout } from '../layout/AuthenLayout'
import { Register } from '../modules/Auth/Register'
import { AdminLayout } from '../layout/AdminLayout'
import { UserManagement } from '../modules/Admin/UserManagement'
import { Moviemanagement } from '../modules/Admin/MovieManagement'
import { CinemaManagement } from '../modules/Admin/CinemaManagement'
import { AccountSetting } from '../modules/Admin/AccountSetting'
import { HomeLayout } from '../layout/Home'

// Outlet để cho phép đi tiếp vào children hay các trang con
// Ví dụ ở đây là khi vào trang /auth nó sẽ vào phần element nếu ở element có Outlet nó sẽ cho đi tiếp vào các trang con bên dưới
// Ví dụ khi vào /auth nếu chưa đăng nhập do kiểm tra ở phần element nó sẽ đưa vào trang đăng nhập nếu rồi sẽ đưa ra trang home thông qua  return <Navigate to={PATH.HOME} />;

const RejectedRoutes = () => {
  const { currentUser } = useAppSelector((state) => state.user)
  if (currentUser === null) {
    return <Outlet></Outlet>
  }
  return currentUser.maLoaiNguoiDung === 'QuanTri' ? <Navigate to={PATH.ADMIN} /> : <Navigate to={PATH.HOME} />
}
const ProtectedRoutes = () => {
  const { currentUser } = useAppSelector((state) => state.user)

  if (currentUser === null) {
    return <Navigate to={PATH.HOME} />
  }

  return currentUser.maLoaiNguoiDung === 'QuanTri' ? <Outlet /> : <Navigate to={PATH.HOME} />
}
const useRoutesElement = () => {
  const routes = useRoutes([
    {
      path: '*',
      element: <Navigate to={PATH.HOME} />,
    },
    {
      path: '/',
      element: <HomeLayout />,
    },
    {
      path: 'auth',
      element: <RejectedRoutes></RejectedRoutes>,
      children: [
        {
          path: PATH.LOGIN,

          element: (
            <AuthenLayout>
              <Login></Login>
            </AuthenLayout>
          ),
        },
        {
          path: PATH.REGISTER,
          element: (
            <AuthenLayout>
              <Register></Register>
            </AuthenLayout>
          ),
        },
      ],
    },
    {
      path: PATH.ADMIN,
      element: <ProtectedRoutes></ProtectedRoutes>,
      children: [
        {
          index: true,
          element: <Navigate to={PATH.ADMIN_USER} />,
        },
        {
          path: PATH.ADMIN_USER,
          element: (
            <AdminLayout>
              <UserManagement></UserManagement>
            </AdminLayout>
          ),
        },
        {
          path: PATH.ADMIN_MOVIE,
          element: (
            <AdminLayout>
              <Moviemanagement></Moviemanagement>
            </AdminLayout>
          ),
        },
        {
          path: PATH.ADMIN_CINEMA,
          element: (
            <AdminLayout>
              <CinemaManagement></CinemaManagement>
            </AdminLayout>
          ),
        },
        {
          path: PATH.ADMIN_ACCOUNT_SETTINGS,
          element: (
            <AdminLayout>
              <AccountSetting></AccountSetting>
            </AdminLayout>
          ),
        },
      ],
    },
  ])
  return routes
}

export default useRoutesElement
