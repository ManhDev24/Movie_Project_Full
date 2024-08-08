import { DataListUser, UserItem } from './../interface/user.interface'
import { CurrentUser } from '../interface/user.interface'
import { UserLoginRequest } from '../interface/user.interface'
import fetcher from './fetcher'
import { ApiWelcome } from '../interface'
import { register } from '../interface/register.inteface'
import { PAGE_SIZE } from '../constant'
export const userAPI = {
  login: async (data: UserLoginRequest) => {
    try {
      const response = await fetcher.post<ApiWelcome<CurrentUser>>('/QuanLyNguoiDung/DangNhap', data)
      return response.data.content
    } catch (error: any) {
      throw Error(error.response.data.content)
    }
  },

  register: async (data: register) => {
    try {
      const response = await fetcher.post<ApiWelcome<register>>('/QuanLyNguoiDung/DangKy', data)
      return response.data.content
    } catch (error: any) {
      throw Error(error.response.data.content)
    }
  },
  getAllUser: async <T>(payload: { page: number; pageSize?: number }) => {
    const params = {
      maNhom: 'GP00',
      soTrang: payload.page,
      soPhanTuTrenTrang: payload.pageSize || PAGE_SIZE,
    }
    try {
      const response = await fetcher.get<ApiWelcome<DataListUser>>('/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang', {
        params,
      })
      return response.data.content
    } catch (error: any) {
      throw Error(error.response.data.content)
    }
  },
  deleteUser: async <T>(taiKhoan: string) => {
    try {
      const response = await fetcher.delete(`/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`)
      return response.data.content
    } catch (error: any) {
      throw Error(error.response.data.content)
    }
  },
  addUser: async (payload: UserItem) => {
    try {
      const response = await fetcher.post('https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung', payload)
      return response.data.content
    } catch (error: any) {
      throw Error(error.response.data.content)
    }
  },
  editUser: async (payload: UserItem) => {
    try {
      const response = await fetcher.post('/QuanLyNguoiDung/CapNhatThongTinNguoiDung', payload)
      return response.data.content
    } catch (error: any) {
      throw Error(error.response.data.content)
    }
  },
  getUserInfo: async <T>(taiKhoan: string) => {
    try {
      const response = await fetcher.post(`/QuanLyNguoiDung/ThongTinTaiKhoan`)
      return response.data.content
    } catch (error: any) {
      throw Error(error.response.data.content)
    }
  },
}
