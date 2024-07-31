export interface bannerStatusAPI<T = any> {
  statusCode: number
  message: string
  content: banner[]
  dateTime: Date
  messageConstants: null
}

export interface banner {
  maBanner: number
  maPhim: number
  hinhAnh: string
}
