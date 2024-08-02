import { useState } from 'react'
import { Alert, Breadcrumb, Button, Input, Pagination, Popconfirm, Spin, Table, Tag } from 'antd'
import { LoadingOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { useListUser } from '../../../hooks/useListUser'
import { GROUP_CODE, PAGE_SIZE } from '../../../constant'
import { UserItem } from '../../../interface/user.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { userAPI } from '../../../apis/user.api'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useOpenModal } from '../../../hooks/useOpenModal'
import AddOrEditUser, { FormValues } from './AddOrEditUser'

const AccountSetting = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { data, isFetching, error } = useListUser(currentPage)
  const queryClient = useQueryClient()
  const { isOpen, openModal, closeModal } = useOpenModal()
  const [dataEdit, setDataEdit] = useState<UserItem | undefined>(undefined)

  // Mutation for adding a user
  const { mutate: handleAddUser, isPending: isAdding } = useMutation({
    mutationFn: userAPI.addUser,
    onSuccess: () => {
      toast.success('User added successfully!')
      queryClient.refetchQueries({
        queryKey: ['list-user', { currentPage }],
        type: 'active',
      })
      closeModal()
    },
    onError: (error) => {
      toast.error('Error adding user')
      console.log('error: ', error)
    },
  })

  // Mutation for editing a user
  const { mutate: handleEditUser, isPending: isEditing } = useMutation({
    mutationFn: userAPI.editUser,
    onSuccess: () => {
      toast.success('User edited successfully!')
      queryClient.refetchQueries({
        queryKey: ['list-user', { currentPage }],
        type: 'active',
      })
      closeModal()
    },
    onError: (error) => {
      const errorMessage = error?.message || 'An unexpected error occurred'
      toast.error(errorMessage)
    },
  })

  // Mutation for deleting a user
  const { mutate: handleDeleteUser, isPending: isDeleting } = useMutation({
    mutationFn: (taiKhoan: string) => userAPI.deleteUser(taiKhoan),
    onSuccess: () => {
      toast.success('User deleted successfully!')
      queryClient.refetchQueries({
        queryKey: ['list-user', { currentPage }],
        type: 'active',
      })
    },
    onError: (error: any) => {
      const errorMessage = error?.message || 'An unexpected error occurred'
      toast.error(errorMessage)
      console.log('Error deleting user:', error)
    },
  })

  // Handle form submission
  const onSubmit = (formValues: FormValues) => {
    let formData = new FormData()
    formData.append('taiKhoan', formValues.taiKhoan)
    formData.append('matKhau', formValues.matKhau)
    formData.append('email', formValues.email)
    formData.append('soDt', formValues.soDt)
    formData.append('maNhom', GROUP_CODE)
    formData.append('maLoaiNguoiDung', formValues.maLoaiNguoiDung)
    formData.append('hoTen', formValues.hoTen)

    if (dataEdit) {
      handleEditUser({ taiKhoan: dataEdit.taiKhoan, ...formValues })
    } else {
      handleAddUser(formData)
    }
  }

  if (isFetching) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin indicator={<LoadingOutlined spin />} size="large" />
      </div>
    )
  }

  if (error) {
    const errorMessage = error.message || 'An error occurred'
    return <Alert message={`Error fetching data: ${errorMessage}`} type="error" />
  }

  const dataSource = (data?.items || []).map((item) => ({
    ...item,
    maNhom: item.maNhom || 'GP01',
  }))

  const total = data?.totalCount || 0
  const columns = [
    {
      title: 'Tài khoản',
      key: 'tai-khoan',
      dataIndex: 'taiKhoan',
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
    },
    {
      title: 'Họ Tên',
      key: 'hoTen',
      dataIndex: 'hoTen',
    },
    {
      title: 'Role',
      key: 'ma-Loai-Nguoi-Dung',
      dataIndex: 'maLoaiNguoiDung',
      render: (maLoaiNguoiDung: string) => <Tag color={maLoaiNguoiDung === 'QuanTri' ? 'geekblue' : 'green'}>{maLoaiNguoiDung === 'QuanTri' ? 'Admin' : 'Khách hàng'}</Tag>,
    },
    {
      title: 'Mã Nhóm',
      key: 'maNhom',
      dataIndex: 'maNhom',
      render: (maNhom: string) => <Tag color="volcano">{maNhom}</Tag>,
    },
    {
      title: 'Mật khẩu',
      key: 'matKhau',
      dataIndex: 'matKhau',
      render: (_: any, user: UserItem) => (
        <Input.Password style={{ width: 200 }} size="large" value={user.matKhau} readOnly iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
      ),
    },
    {
      title: 'Số Điện Thoại',
      key: 'soDt',
      dataIndex: 'soDt',
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: UserItem) => (
        <div className="flex">
          <Button
            type="primary"
            className="mr-2"
            onClick={() => {
              openModal()
              setDataEdit(record)
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this user?"
            description="This action cannot be undone."
            onConfirm={() => handleDeleteUser(record.taiKhoan)}
            onCancel={() => {}}
            placement="bottom"
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger loading={isDeleting}>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ]

  return (
    <div>
      <div className="flex items-center justify-between">
        <Breadcrumb separator=">" items={[{ title: 'Dashboard' }, { title: 'Account Management', href: '' }]} />
        <Button
          size="large"
          type="primary"
          onClick={() => {
            openModal()
            setDataEdit(undefined)
          }}
        >
          Add User
        </Button>
      </div>
      <h3 className="font-medium text-3xl mb-3">List Users</h3>
      <Table rowKey={({ email }) => email} columns={columns} dataSource={dataSource} pagination={false} loading={isFetching} />
      <div className="flex justify-end mt-10">
        <Pagination
          showSizeChanger={false}
          current={currentPage}
          defaultCurrent={1}
          total={total}
          pageSize={PAGE_SIZE}
          onChange={(page: number) => {
            setCurrentPage(page)
          }}
        />
      </div>
      <AddOrEditUser dataEdit={dataEdit} isOpen={isOpen} onCloseModal={closeModal} onSubmit={onSubmit} isAdding={isAdding} isEditing={isEditing} />
      <ToastContainer />
    </div>
  )
}

export default AccountSetting
