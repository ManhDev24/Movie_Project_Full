// movietheater.interface.ts

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
export interface ThongTinCumRap {
  maCumRap: string
  tenCumRap: string
  diaChi: string
  danhSachRap: CinemaListItem[]
}

export interface CinemaListItem {
  maRap: string
  tenRap: string
}
