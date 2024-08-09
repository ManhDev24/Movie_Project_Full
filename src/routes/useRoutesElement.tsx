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
import { ProfileUser } from '../layout/Home/Profile'
import { MovieDetail } from '../modules/MovieDetail'
import { Booking } from '../modules/Booking'
import PurchaseHistory from '../layout/Home/PurchaseHistory'

const RejectedRoutes = () => {
  const { currentUser } = useAppSelector((state) => state.user)
  if (currentUser === null) {
    return <Outlet />
  }
  return currentUser.maLoaiNguoiDung === 'QuanTri' ? <Navigate to={PATH.ADMIN} /> : <Navigate to={PATH.HOME} />
}
const RejectedRoutesBooking = () => {
  const { currentUser } = useAppSelector((state) => state.user)
  if (currentUser === null) {
    return <Outlet />
  }
  return currentUser.maLoaiNguoiDung === 'KhachHang' || currentUser.maLoaiNguoiDung === 'QuanTri'  ? <Navigate to={PATH.HOME} /> : <Navigate to={PATH.HOME} />
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
      path: PATH.PROFILE,
      element: <ProfileUser />,
    },
    {
      path: PATH.MOVIE_DETAILS,
      element: <MovieDetail />,
    },
    {
      path: PATH.BOOKING,
      element:<Booking/>
    },
    {
      path: PATH.PURCHASE,
      element:<PurchaseHistory/>
    },
    {
      path:PATH.HOME,
      element:<RejectedRoutesBooking/>,
      children:[
        {
          path: PATH.LOGIN,
          element: (
            <AuthenLayout>
              <Login />
            </AuthenLayout>
          ),
        }
      ]
    },
    // {
    //   path:PATH.MOVIE_DETAILS,
    //   element:<RejectedRoutesBooking/>,
    //   children:[
    //     {
    //       path: PATH.LOGIN,
    //       element: (
    //         <AuthenLayout>
    //           <Login />
    //         </AuthenLayout>
    //       ),
    //     }
    //   ]
    // },
    {
      path: 'auth',
      element: <RejectedRoutes />,
      children: [
        {
          path: PATH.LOGIN,
          element: (
            <AuthenLayout>
              <Login />
            </AuthenLayout>
          ),
        },
        {
          path: PATH.REGISTER,
          element: (
            <AuthenLayout>
              <Register />
            </AuthenLayout>
          ),
        },
      ],
    },
    {
      path: PATH.ADMIN,
      element: <ProtectedRoutes />,
      children: [
        {
          index: true,
          element: <Navigate to={PATH.ADMIN_USER} />,
        },
        {
          path: PATH.ADMIN_USER,
          element: (
            <AdminLayout>
              <UserManagement />
            </AdminLayout>
          ),
        },
        {
          path: PATH.ADMIN_MOVIE,
          element: (
            <AdminLayout>
              <Moviemanagement />
            </AdminLayout>
          ),
        },
        {
          path: PATH.ADMIN_CINEMA,
          element: (
            <AdminLayout>
              <CinemaManagement />
            </AdminLayout>
          ),
        },
        {
          path: PATH.ADMIN_ACCOUNT_SETTINGS,
          element: (
            <AdminLayout>
              <AccountSetting />
            </AdminLayout>
          ),
        },
      ],
    },
  ])
  return routes
}

export default useRoutesElement