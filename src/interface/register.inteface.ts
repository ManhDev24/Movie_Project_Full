export interface registerStatus<T = any> {
  statusCode: number
  message: string
  content: register
  dateTime: Date
  messageConstants: null
}

export interface register {
  taiKhoan: string
  matKhau: string
  email: string
  soDt: string
  maNhom: string
  hoTen: string
}
