import { GROUP_CODE } from '../constant'
import fetcher from './fetcher'

export const bookingAPI = {
  bookingTicket: async () => {
    try {
      const response = await fetcher.get(`/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUP_CODE}`)
      return response.data.content
    } catch (error: any) {
      throw Error(error.response.data.content)
    }
  },
}
