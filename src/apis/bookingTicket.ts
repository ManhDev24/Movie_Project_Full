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
  bookingList: async(maLichChieu:any)=>{
    try {
      const response = await fetcher.get(`/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`)
      return response.data.content
    } catch (error: any) {
      throw Error(error.response.data.content)
    }
  },
  bookingTicketApi:async(data:any)=>{
    try {
      const response = await fetcher.post("/QuanLyDatVe/DatVe",data,{
        headers:{
          "TokenCyberSoft": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA2NiIsIkhldEhhblN0cmluZyI6IjI1LzEyLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTczNTA4NDgwMDAwMCIsIm5iZiI6MTcwNTUxMDgwMCwiZXhwIjoxNzM1MjMyNDAwfQ.FrZqgp-B9SVwd6fnz8aY6uCneamGpnAdxPt96fXIUKw',

          "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA2NiIsIkhldEhhblN0cmluZyI6IjI1LzEyLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTczNTA4NDgwMDAwMCIsIm5iZiI6MTcwNTUxMDgwMCwiZXhwIjoxNzM1MjMyNDAwfQ.FrZqgp-B9SVwd6fnz8aY6uCneamGpnAdxPt96fXIUKw',

          
          'Content-Type':'multipart/form-data',
      }
      });
      return response.data.content
    } catch (error: any) {
      throw Error(error.response.data.content)
    }
  }
  
}

