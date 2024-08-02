import fetcher from './fetcher'

export const cinemaApi = {
  getAllCinema: async <T>() => {
    try {
      const response = await fetcher.get('/QuanLyRap/LayThongTinHeThongRap')
      return response.data.content
    } catch (error: any) {
      throw Error(error.response.data.content)
    }
  },
  getThreateFromCinema: async <T>(payload: { maHeThongRap: string }) => {
    try {
      const response = await fetcher.get(`/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${payload.maHeThongRap}`)
      return response.data.content
    } catch (error: any) {
      throw Error(error.response.data.content)
    }
  },
}
