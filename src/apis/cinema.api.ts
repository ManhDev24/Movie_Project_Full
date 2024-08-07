import { number } from 'yup'
import { GROUP_CODE } from '../constant'
import fetcher from './fetcher'

export const cinemaApi = {
  getAllCinema: async <T>() => {
    try {
      const response = await fetcher.get('/QuanLyRap/LayThongTinHeThongRap')
      return response.data.content
    } catch (error: any) {
      throw new Error(error.response.data.content)
    }
  },
  getThreateFromCinema: async <T>(payload: { maHeThongRap: string }) => {
    try {
      const response = await fetcher.get(`/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${payload.maHeThongRap}`)
      return response.data.content
    } catch (error: any) {
      throw new Error(error.response.data.content)
    }
  },
  getSystemShowtimes: async <T>(payload: { maHeThongRap: string }) => {
    try {
      const response = await fetcher.get(`/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${payload.maHeThongRap}&maNhom=GP01`)
      return response.data.content
    } catch (error: any) {
      throw new Error(error.response.data.content)
    }
  },
  getRoomDetails: async <T>(maLichChieu: number) => {
    try {
      const response = await fetcher.get(`/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`)
      return response.data.content
    } catch (error: any) {
      throw new Error(error.response.data.content)
    }
  },
}
