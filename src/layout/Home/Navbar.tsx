import { useSelector } from 'react-redux'
import { Menu, Dropdown, Button } from 'antd'
import { DownOutlined, UserOutlined } from '@ant-design/icons'
import { PATH } from '../../routes/path'
import { CurrentUser } from '../../interface/user.interface'
import { useSignOut } from '../../redux/hooks'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const user = useSelector((state: { user: { currentUser: CurrentUser } }) => state.user.currentUser)
  const { signOutUser } = useSignOut()
  const menu = (
    <Menu>
      <Menu.Item key="home">
        <Link to={PATH.HOME}>Home</Link>
      </Menu.Item>
      {user?.maLoaiNguoiDung === 'QuanTri' && (
        <Menu.Item key="admin">
          <Link to={PATH.ADMIN}>Admin Menu</Link>
        </Menu.Item>
      )}
      <Menu.Item key="profile">
        <Link to={PATH.PROFILE}>Profile</Link>
      </Menu.Item>
      <Menu.Item key="history">
        <Link to="#">History Purchase</Link>
      </Menu.Item>
      <Menu.Item key="signout">
        <a onClick={signOutUser}>Sign Out</a>
      </Menu.Item>
    </Menu>
  )

  return (
    <div className="navbar relative">
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to={PATH.HOME} className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/img/logo.png" className="h-8" alt="Film logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Movieee</span>
          </Link>

          {user ? (
            <div className="relative flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
                <Button
                  type="text"
                  icon={<UserOutlined />}
                  className="flex text-sm bg-gray-300 text-white rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
                >
                  <span className="sr-only">Open user menu</span>
                  <DownOutlined style={{ marginLeft: 8 }} />
                </Button>
              </Dropdown>
            </div>
          ) : (
            <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li className="flex space-x-3 md:space-x-8">
                  <Link
                    to={PATH.LOGIN}
                    className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-white md:p-0 md:dark:text-white transition-all duration-300 ease-in-out hover:text-blue-700"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to={PATH.REGISTER}
                    className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-white md:p-0 md:dark:text-white transition-all duration-300 ease-in-out hover:text-blue-700"
                  >
                    Đăng Ký
                  </Link>
                </li>
              </ul>
            </div>
          )}

          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link to="#" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">
                  Lịch chiếu
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Cụm rạp
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Tin tức
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
