export interface Showtime {
  maLichChieu: string
  maRap: string
  tenRap: string
  ngayChieuGioChieu: string
  giaVe: number
  thoiLuong: number
}

export interface CumRap {
  maCumRap: string
  tenCumRap: string
  hinhAnh: string | null
  lichChieuPhim: Showtime[]
}

export interface HeThongRap {
  maHeThongRap: string
  tenHeThongRap: string
  logo: string
  cumRapChieu: CumRap[]
}
