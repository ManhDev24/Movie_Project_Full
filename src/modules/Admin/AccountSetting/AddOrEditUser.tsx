import { Modal, Row, Form, Col, Input, Typography, Select, Button } from 'antd'
import React, { FC, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { yupResolver } from '@hookform/resolvers/yup'

export interface FormValues {
  taiKhoan: string
  matKhau: string
  email: string
  soDt: string
  maNhom: string
  maLoaiNguoiDung: string
  hoTen: string
}

interface AddOrEditUserModalProps {
  isOpen: boolean
  isAdding: boolean
  isEditing: boolean
  onCloseModal: () => void
  onSubmit: (formValues: FormValues) => void
  dataEdit?: any
}

const AddOrEditUser: FC<AddOrEditUserModalProps> = ({ isOpen, onCloseModal, dataEdit, isAdding, onSubmit }) => {
  const schema = yup.object({
    taiKhoan: yup.string().trim().required('Vui lòng nhập thông tin'),
    matKhau: yup.string().trim().required('Vui lòng nhập Mật khẩu'),
    email: yup
      .string()
      .trim()
      .required('Vui lòng nhập Email')
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email không hợp lệ'),
    soDt: yup.string().trim().required('Vui lòng nhập Số điện thoại'),
    maNhom: yup.string().trim().required('Vui lòng nhập Mã nhóm'),
    maLoaiNguoiDung: yup.string().trim().required('Vui lòng nhập Mã Loại người dùng'),
    hoTen: yup.string().trim().required('Vui lòng nhập Họ và tên'),
  })

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      taiKhoan: '',
      matKhau: '',
      email: '',
      soDt: '',
      maNhom: '',
      maLoaiNguoiDung: '',
      hoTen: '',
    },
    resolver: yupResolver(schema),
    criteriaMode: 'all',
  })

  useEffect(() => {
    if (dataEdit) {
      setValue('taiKhoan', dataEdit.taiKhoan)
      setValue('matKhau', dataEdit.matKhau)
      setValue('email', dataEdit.email)
      setValue('soDt', dataEdit.soDt)
      setValue('maNhom', dataEdit.maNhom)
      setValue('maLoaiNguoiDung', dataEdit.maLoaiNguoiDung)
      setValue('hoTen', dataEdit.hoTen)
    }
  }, [dataEdit, setValue])

  const handleCloseModal = () => {
    reset()
    onCloseModal()
  }

  return (
    <div>
      <Modal footer={false} open={isOpen} onCancel={handleCloseModal} title={<Typography className="text-2xl font-medium">{dataEdit ? 'Edit User' : 'Add User'}</Typography>}>
        <Form onFinish={handleSubmit(onSubmit)}>
          <Row gutter={[48, 24]}>
            {/* Fields for taiKhoan, matKhau, email, soDt, maNhom, hoTen */}
            <Col span={24}>
              <label className="text-sm pt-2">
                <span className="text-red-600">*</span>
                Tài khoản
              </label>
              <Controller
                name="taiKhoan"
                control={control}
                render={({ field }) => <Input {...field} status={errors.taiKhoan ? 'error' : ''} size="large" className="mt-1" placeholder="Tài Khoản" />}
              />
              {errors?.taiKhoan && <p className="text-xs text-red-600">{errors.taiKhoan.message}</p>}
            </Col>
            <Col span={24}>
              <label className="text-sm pt-2">
                <span className="text-red-600">*</span>
                Mật khẩu
              </label>
              <Controller
                name="matKhau"
                control={control}
                render={({ field }) => (
                  <Input.Password
                    {...field}
                    status={errors.matKhau ? 'error' : ''}
                    size="large"
                    placeholder="Mật khẩu"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                )}
              />
              {errors?.matKhau && <p className="text-xs text-red-600">{errors.matKhau.message}</p>}
            </Col>
            <Col span={24}>
              <label className="text-sm pt-2">
                <span className="text-red-600">*</span>
                Email
              </label>
              <Controller name="email" control={control} render={({ field }) => <Input {...field} status={errors.email ? 'error' : ''} size="large" className="mt-1" placeholder="Email" />} />
              {errors?.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
            </Col>
            <Col span={24}>
              <label className="text-sm pt-2">
                <span className="text-red-600">*</span>
                Số điện thoại
              </label>
              <Controller name="soDt" control={control} render={({ field }) => <Input {...field} status={errors.soDt ? 'error' : ''} size="large" className="mt-1" placeholder="Số điện thoại" />} />
              {errors?.soDt && <p className="text-xs text-red-600">{errors.soDt.message}</p>}
            </Col>
            <Col span={24}>
              <label className="text-sm pt-2">
                <span className="text-red-600">*</span>
                Mã nhóm
              </label>
              <Controller name="maNhom" control={control} render={({ field }) => <Input {...field} status={errors.maNhom ? 'error' : ''} size="large" className="mt-1" placeholder="Mã nhóm" />} />
              {errors?.maNhom && <p className="text-xs text-red-600">{errors.maNhom.message}</p>}
            </Col>
            <Col span={24}>
              <label className="text-sm pt-2">
                <span className="text-red-600">*</span>
                Họ và Tên
              </label>
              <Controller name="hoTen" control={control} render={({ field }) => <Input {...field} status={errors.hoTen ? 'error' : ''} size="large" className="mt-1" placeholder="Họ và tên" />} />
              {errors?.hoTen && <p className="text-xs text-red-600">{errors.hoTen.message}</p>}
            </Col>
            {/* Select field for maLoaiNguoiDung */}
            <Col span={24}>
              <label className="text-sm pt-2">
                <span className="text-red-600">*</span>
                Mã loại người dùng
              </label>
              <br></br>
              <Controller
                name="maLoaiNguoiDung"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    status={errors.maLoaiNguoiDung ? 'error' : ''}
                    style={{ width: '100%' }} // Expand width to fit the container
                    options={[
                      { value: 'KhachHang', label: 'Khách Hàng' },
                      { value: 'QuanTri', label: 'Quản trị' },
                    ]}
                  />
                )}
              />
              {errors?.maLoaiNguoiDung && <p className="text-xs text-red-600">{errors.maLoaiNguoiDung.message}</p>}
            </Col>
            <Col span={24} className="flex justify-end" onClick={onCloseModal}>
              <Button size="large" type="default" className="mt-3">
                Cancel
              </Button>
              <Button loading={isAdding} disabled={isAdding} htmlType="submit" size="large" type="primary" className="mx-3 mt-3">
                {dataEdit ? 'Edit movie' : 'Add movie'}
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  )
}

export default AddOrEditUser
