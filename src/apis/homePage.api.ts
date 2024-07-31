import { banner, bannerStatusAPI } from '../interface/banner.interface'
import fetcher from './fetcher'

export const homePageAPI = {
  getListBanner: async () => {
    try {
      const response = await fetcher.get<bannerStatusAPI<banner>>('/QuanLyPhim/LayDanhSachBanner')
      return response.data.content
    } catch (error: any) {
      throw Error(error.response.data.content)
    }
  },
}
