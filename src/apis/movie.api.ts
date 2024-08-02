import { GROUP_CODE, PAGE_SIZE } from '../constant'
import { ApiWelcome } from '../interface'
import fetcher from './fetcher'

export const movieApi = {
  listMovie: async <T>(payload: { page: number; pageSize?: number }) => {
    const params = {
      maNhom: GROUP_CODE,
      soTrang: payload.page,
      soPhanTuTrenTrang: payload.pageSize || PAGE_SIZE,
    }

    try {
      const response = await fetcher.get<ApiWelcome<T>>('/QuanLyPhim/LayDanhSachPhimPhanTrang', {
        params,
      })
      return response.data.content
    } catch (error: any) {
      throw Error(error.response.data.content)
    }
  },
  getAllMovie: async <T>() => {
    try {
      const response = await fetcher.get<ApiWelcome<T>>(`/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_CODE}`)
      return response.data.content
    } catch (error: any) {
      throw Error(error.response.data.content)
    }
  },
  getInfoMovie: async <T>(payload: { maPhim: string }) => {
    try {
      const response = await fetcher.get<ApiWelcome<T>>(`/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${payload.maPhim}`)
      return response.data.content
    } catch (error: any) {
      throw Error(error.response.data.content)
    }
  },
  addMovie: async (payload:any)=>{
    try{
      const response = await fetcher.post("/QuanLyPhim/ThemPhimUploadHinh",payload);
      return response.data.content;
    }
    catch(error:any){
      throw Error(error.response.data.content);
    }
  },
  deleteMovie:async(idMovie:any)=>{
    try{
      const respone = await fetcher.delete(`/QuanLyPhim/XoaPhim?MaPhim=${idMovie}`);
      return respone.data.content
    }
    catch(error:any){
      throw Error(error.response.data.content);
    }
  }
}
