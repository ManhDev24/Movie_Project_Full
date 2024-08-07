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
  console.log('currentUser: ', currentUser)
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
      dispatch(setUser(data))
      setLocalStorage('user', data)
      queryClient.refetchQueries({
        queryKey: ['userInfo', currentUser?.taiKhoan],
        type: 'active',
      })
      navigate(PATH.PROFILE)
    },
    onError: (error) => {
      toast.error('Error updating user: ' + (error as Error).message)
    },
  })

  if (isLoading) {
    return <LoadingPage />
  }

  if (isError) {
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
