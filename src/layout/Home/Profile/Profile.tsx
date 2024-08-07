import Navbar from '../Navbar'
import ProfileSetting from './ProfileSetting'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { userAPI } from '../../../apis/user.api'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { LoadingPage } from '../../../modules/Loading'
import { toast, ToastContainer } from 'react-toastify'
import { setUser } from '../../../redux/slices/user_slices'
import { UserItem } from '../../../interface/user.interface'
import { setLocalStorage } from '../../../utils'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../../../routes/path'

const Profile = () => {
  const { currentUser } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const {
    data: DataOfUser,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['userInfo', currentUser?.taiKhoan],
    queryFn: () => userAPI.getUserInfo<UserItem>(currentUser?.taiKhoan || ''),
    enabled: !!currentUser?.taiKhoan,
  })

  const { mutate: handleEditUser, isPending: isEditing } = useMutation({
    mutationFn: userAPI.editUser,
    onSuccess: (data: UserItem) => {
      console.log('data: ', data)
      toast.success('User edited successfully!')

      const currentAccessToken = currentUser?.accessToken || localStorage.getItem('accessToken')
      let maLoaiNguoiDung = data.maLoaiNguoiDung
      if (maLoaiNguoiDung === 'Khách hàng') {
        maLoaiNguoiDung = 'KhachHang'
      } else if (maLoaiNguoiDung === 'Quản trị') {
        maLoaiNguoiDung = 'QuanTri'
      }
      const updatedUser = {
        taiKhoan: data.taiKhoan,
        hoTen: data.hoTen,
        email: data.email,
        soDT: data.soDT,
        maNhom: data.maNhom,
        maLoaiNguoiDung,
        accessToken: currentAccessToken,
      }
      dispatch(setUser(updatedUser))
      setLocalStorage('user', updatedUser)
      queryClient.refetchQueries({
        queryKey: ['userInfo', currentUser?.taiKhoan],
        type: 'active',
      })
    },
  })

  if (isLoading) {
    return <LoadingPage />
  }

  if (isError) {
    console.log('isError: ', isError)
    return <div>Error loading user info</div>
  }

  return (
    <div>
      <Navbar />
      <ProfileSetting DataOfUser={DataOfUser || {}} handleEditUser={handleEditUser} />
      <ToastContainer />
    </div>
  )
}

export default Profile
