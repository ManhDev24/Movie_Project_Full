import { Breadcrumb, Button, Layout, Menu, theme  } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import React,{FC, useState} from 'react'
import { PATH } from '../../routes/path';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  AccountBookOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

interface AdminLayoutProps{
    children:React.ReactNode
}
const AdminLayout: FC<AdminLayoutProps> = ({children}) => {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="text-center flex items-center justify-center mb-8 cursor-pointer h-[80px]">
          <img src="/vite.svg" width={50} onClick={()=> navigate(PATH.HOME)}/>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[PATH.ADMIN_USER]}
          onSelect={(items) => {
            navigate(items.key);
          }}
          items={[
            {
              key: PATH.ADMIN_USER,
              icon: <UserOutlined />,
              label: "USER MANAGEMENT",
            },
            {
              key: PATH.ADMIN_MOVIE,
              icon: <VideoCameraOutlined />,
              label: "MOVIE MANAGEMENT",
            },
            {
              key: PATH.ADMIN_CINEMA,
              icon: <UploadOutlined />,
              label: "CINEMA MANAGEMENT",
            },
            {
              key: PATH.ADMIN_ACCOUNT_SETTINGS,
              icon: <AccountBookOutlined />,
              label: "ACCOUNT MANAGEMENT",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};






export default AdminLayout
