export interface ApiWelcome<T = any>{
    statusCode:       number;
    message:          string;
    content:          CurrentUser;
    dateTime:         Date;
    messageConstants: null;
}

export interface CurrentUser {
    taiKhoan:        string;
    hoTen:           string;
    email:           string;
    soDT:            string;
    maNhom:          string;
    maLoaiNguoiDung: string;
    accessToken:     string;
}