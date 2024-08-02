import { Button, Col, Form, Input, Row, Typography } from 'antd'
import { Controller, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { userAPI } from '../../../apis/user.api'
import { UserLoginRequest, CurrentUser } from '../../../interface/user.interface'
import { setLocalStorage } from '../../../utils'
import { useDispatch } from 'react-redux'
import { setUser } from '../../../redux/slices/user_slices'
import { PATH } from '../../../routes/path'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

interface FormValues {
  username: string
  password: string
}
const schema = yup.object({
  username: yup.string().trim().required('Vui lòng nhập thông tin'),
  password: yup.string().trim().required('Vui lòng nhập thông tin'),
})
const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(schema),
    criteriaMode: 'all',
  })

  const dispatch = useDispatch()
  const { mutate: handleLogin, isLoading } = useMutation({
    mutationFn: (payload: UserLoginRequest) => userAPI.login(payload),
    onSuccess: (currentUser) => {
      setLocalStorage<CurrentUser>('user', currentUser)
      dispatch(setUser(currentUser))
      toast.success('Login successful!')
    },
    onError: (error: any) => {
      toast.error('Login failed. Please try again.')
    },
  })

  const onSubmit = (values: FormValues) => {
    const payload = {
      taiKhoan: values.username,
      matKhau: values.password,
    }
    handleLogin(payload)
  }

  return (
    <div className="w-[400px] mx-auto my-8">
      <div className="text-center mb-4">
        <Typography className="font-bold text-3xl">Đăng nhập</Typography>
        <Typography className="mt-2">Hi, Chào mừng bạn quay lại 👋</Typography>
      </div>

      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Row gutter={[48, 16]}>
          <Col span={24}>
            <label className="text-xs text-[#6A7280]">*Tài khoản</label>
            <Controller
              name="username"
              control={control}
              render={({ field }) => <Input {...field} type="text" size="large" className="mt-1" placeholder="Vui lòng nhập tài khoản..." status={errors.username ? 'error' : ''} />}
            />
            {errors.username && <p className="text-xs text-red-600">{errors.username.message}</p>}
          </Col>
          <Col span={24}>
            <label className="text-xs text-[#6A7280]">*Mật khẩu</label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => <Input {...field} type="password" size="large" className="mt-1" placeholder="Vui lòng nhập mật khẩu..." status={errors.password ? 'error' : ''} />}
            />
            {errors.password && <p className="text-xs text-red-600">{errors.password.message}</p>}
          </Col>

          <Col span={24}>
            <Button type="primary" htmlType="submit" size="large" block loading={isLoading}>
              Đăng nhập
            </Button>
          </Col>
        </Row>
      </Form>

      <Typography className="mt-8 text-center">
        Chưa có tài khoản?{' '}
        <a href={PATH.REGISTER}>
          <span className="text-blue-700 font-medium cursor-pointer">Tạo tài khoản</span>
        </a>
      </Typography>
    </div>
  )
}

export default Login
