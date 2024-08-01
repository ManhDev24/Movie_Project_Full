import { Alert, Button, Col, Form, Input, Row, Typography } from 'antd'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { register } from '../../../interface/register.inteface'
import { PATH } from '../../../routes/path'
import { GROUP_CODE } from '../../../constant'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { userAPI } from '../../../apis/user.api'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Register = () => {
  const [apiError, setApiError] = useState<string | null>(null)
  const navigate = useNavigate()

  const schema = yup.object({
    taiKhoan: yup.string().trim().required('Vui lòng nhập thông tin'),
    matKhau: yup.string().trim().required('Vui lòng nhập Mật khẩu'),
    email: yup
      .string()
      .trim()
      .required('Vui lòng nhập Email')
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email không hợp lệ'),
    hoTen: yup.string().trim().required('Vui lòng nhập Họ và tên'),
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<register>({
    defaultValues: {
      taiKhoan: '',
      matKhau: '',
      email: '',
      soDt: '',
      maNhom: GROUP_CODE,
      hoTen: '',
    },
    resolver: yupResolver(schema),
    criteriaMode: 'all',
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: (payload: register) => userAPI.register(payload),
    onSuccess: () => {
      toast.success('Đăng ký thành công!')
      setTimeout(() => {
        navigate(PATH.LOGIN)
      }, 2000)
    },
    onError: (error) => {
      const errorMessage = error?.message || 'An unknown error occurred'
      setApiError(errorMessage)
    },
  })

  const onSubmit = (formValues: register) => {
    mutate(formValues)
  }

  return (
    <div className="w-[400px]">
      <div className="my-4 text-center">
        <Typography className="font-bold text-3xl">Đăng Ký</Typography>
        <Typography className="mt-2">Hi, Chào mừng bạn ❤️❤️</Typography>
      </div>
      {apiError && <Alert message="Error" description={apiError} type="error" showIcon />}
      <Form className="mt-4" layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Row gutter={[48, 16]}>
          <Col span={24}>
            <label className="text-xs text-[#6A7280]">*Tài khoản</label>
            <Controller
              name="taiKhoan"
              control={control}
              render={({ field }) => <Input type="text" {...field} size="large" className="mt-1" status={errors.taiKhoan ? 'error' : ''} placeholder="Vui lòng nhập tài khoản..." />}
            />
            {errors?.taiKhoan && <p className="text-xs text-red-600">{errors.taiKhoan.message}</p>}
          </Col>
          <Col span={24}>
            <label className="text-xs text-[#6A7280]">*Mật khẩu</label>
            <Controller
              name="matKhau"
              control={control}
              render={({ field }) => <Input type="password" {...field} size="large" className="mt-1" status={errors.matKhau ? 'error' : ''} placeholder="Vui lòng nhập Mật khẩu..." />}
            />
            {errors?.matKhau && <p className="text-xs text-red-600">{errors.matKhau.message}</p>}
          </Col>
          <Col span={24}>
            <label className="text-xs text-[#6A7280]">*Họ tên</label>
            <Controller
              name="hoTen"
              control={control}
              render={({ field }) => <Input type="text" {...field} size="large" className="mt-1" status={errors.hoTen ? 'error' : ''} placeholder="Vui lòng nhập Họ tên..." />}
            />
            {errors?.hoTen && <p className="text-xs text-red-600">{errors.hoTen.message}</p>}
          </Col>
          <Col span={24}>
            <label className="text-xs text-[#6A7280]">*Email</label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => <Input type="text" {...field} size="large" className="mt-1" status={errors.email ? 'error' : ''} placeholder="Vui lòng nhập Email..." />}
            />
            {errors?.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
          </Col>
          <Col span={24}>
            <Button type="primary" htmlType="submit" size="large" block loading={isLoading}>
              Đăng Ký
            </Button>
          </Col>
        </Row>
      </Form>
      <Typography className="mt-8 text-center">
        Có tài khoản ?{' '}
        <a href={PATH.LOGIN}>
          <span className="text-blue-700 font-medium cursor-pointer">Login</span>
        </a>
      </Typography>
      <ToastContainer />
    </div>
  )
}

export default Register
