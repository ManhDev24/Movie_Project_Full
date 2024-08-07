import { useQuery } from '@tanstack/react-query'
import { Breadcrumb, Button, Pagination, Table, Tag } from 'antd'
import { userAPI } from '../../../apis/user.api'
import { PAGE_SIZE, USER_TYPES_MAPPING } from '../../../constant'
import { UserItem } from '../../../interface/user.interface'
import { useState } from 'react'

const UserManagement = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setCurrentPageSize] = useState(PAGE_SIZE)

  const { data, isLoading, error } = useQuery({
    queryKey: ['list-user', { currentPage, pageSize }],
    queryFn: () => userAPI.getAllUser({ page: currentPage, pageSize }),
  })
  const totalPages = data?.totalPages || 0
  const columns = [
    {
      title: 'Username',
      key: 'user-name',
      dataIndex: 'taiKhoan',
    },
    {
      title: 'Fullname',
      key: 'fullname',
      dataIndex: 'hoTen',
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
    },
    {
      title: 'Phone Number',
      key: 'phone-number',
      dataIndex: 'soDT',
    },
    {
      title: 'Type User',
      key: 'type-user',
      dataIndex: 'maLoaiNguoiDung',
      render: (_: any, { maLoaiNguoiDung }: { maLoaiNguoiDung: string }) => <Tag>{USER_TYPES_MAPPING[maLoaiNguoiDung] || ''}</Tag>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: UserItem) => {
        return (
          <div className="flex">
            <Button type="primary" className="mr-2">
              Edit
            </Button>
            <Button type="primary" danger onClick={() => alert(record.taiKhoan)}>
              Delete
            </Button>
          </div>
        )
      },
    },
  ]
  const dataSource = data?.items || []
  return (
    <div>
      <div className="flex items-center justify-between">
        <Breadcrumb
          separator=">"
          items={[
            {
              title: 'Dashboard',
            },
            {
              title: 'User Management',
              href: '',
            },
          ]}
        />
        <Button size="large" type="primary">
          Add User
        </Button>
      </div>
      <h3 className="font-medium text-3xl mb-3">List User</h3>
      <Table rowKey={({ taiKhoan }) => taiKhoan} columns={columns} dataSource={dataSource} pagination={false} />
      <div className="flex justify-end mt-10">
        <Pagination
          showSizeChanger={false}
          defaultCurrent={currentPage}
          total={totalPages}
          onChange={(page: number, pSize: number) => {
            setCurrentPage(page)
            setCurrentPageSize(pageSize)
            if (pSize !== pageSize) {
              setCurrentPageSize(pageSize)
            }
          }}
        />
      </div>
    </div>
  )
}

export default UserManagement
