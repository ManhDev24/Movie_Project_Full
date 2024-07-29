
import { Breadcrumb, Button, Table } from "antd";


const UserManagement = () => {
  const columns = [
    {
      title: "Username",
      key: "user-name",
      dataIndex: "taiKhoan",
    },
    {
      title:"Fullname",
      key:"fullname",
      dataIndex:"hoTen"
    },
    {
      title:"Email",
      key:"email",
      dataIndex:"email"
    },
    {
      title:"Phone Number",
      key:"phone-number",
      dataIndex:"soDT"
    },
    {
      title:"Type User",
      key:"type-user",
      dataIndex:"maLoaiNguoiDung"
    },
    {
      title: 'Action',
      key: 'action',
      render: () => {
        return(
          <div className="flex">
            <Button type="primary" className="mr-2">
                Edit
            </Button>
            <Button type="primary" danger>
                Delete
            </Button>
        </div>
        )
      }
    }
  ];
  return (
    <div>
      <div className="flex items-center justify-between">
        <Breadcrumb
          separator=">"
          items={[
            {
              title: "Dashboard",
            },
            {
              title: "User Management",
              href: "",
            },
          ]}
        />
        <Button size="large" type="primary">
          Add User
        </Button>
      </div>
      <h3 className="font-medium text-3xl mb-3">List User</h3>
      <Table
        columns={columns}
        dataSource={[{ taiKhoan: "123", address: "HCM" }]}
        pagination={false}
      />
    </div>
  );
};

export default UserManagement;
