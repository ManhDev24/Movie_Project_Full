import { GROUP_CODE, PAGE_SIZE } from '../constant'
import { BREARER, TOKEN_CYBERSOFT } from '../constant/urlConfig';
import { ApiWelcome } from '../interface'
import { Movie } from '../interface/movie.interface';
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
      const response = await fetcher.post("/QuanLyPhim/ThemPhimUploadHinh",payload,{
        headers:{
          'Content-Type':'multipart/form-data',
        }
      });

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
  },
  editMovie: async (payload: any) => {
    try {
      //const response = await fetcher.post('/QuanLyPhim/CapNhatPhimUpload', payload)
      const response = await fetcher.post<ApiWelcome<any>>("/QuanLyPhim/CapNhatPhimUpload",payload,{
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
  },
  getMovieDetail: async(maPhim:any)=>{
    try {
      const response = await fetcher.get<ApiWelcome<any>>(`/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`)
      return response.data.content
    } catch (error: any) {
      throw Error(error.response.data.content)
    }
  }
}
