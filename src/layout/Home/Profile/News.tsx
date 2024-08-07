import { Tabs, TabsProps } from 'antd'

const News = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: <span className="text-2xl">Điện Ảnh 24h</span>,
      children: (
        <div className="w-full max-w-6xl mx-auto px-4 py-6">
          <div className="grid grid-rows-2 gap-4">
            <div className="content-top">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-left w-[430px] h-[378px]">
                  <a href="#" className="rounded-lg shadow-lg overflow-hidden w-full h-full">
                    <img
                      className="w-full h-[238.141px] object-cover rounded-md"
                      src="https://s3img.vcdn.vn/123phim/2021/03/an-dinh-chac-nich-ngay-khoi-chieu-16-04-ly-hai-tung-clip-lat-mat-48h-dam-chat-fast-furious-mien-song-nuoc-16170881088272.png"
                      alt="news-movie"
                    />
                    <div className="p-4 flex-1">
                      <h4 className="text-lg font-bold mb-2">Ấn định chắc nịch ngày khởi chiếu 16.04, Lý Hải tung clip Lật Mặt: 48H đậm chất</h4>
                      <p className="text-gray-600">Trước thềm khởi chiếu 16.04 này, Lý Hải bất ngờ tung clip rượt đuổi gay cấn thót tim fans hâm mộ</p>
                    </div>
                  </a>
                </div>
                <div className="text-left w-[430px] h-[378px]">
                  <a
                    href="https://tix.vn/goc-dien-anh/7964-mortal-kombat-cuoc-chien-sinh-tu-goi-ten-nhung-phim-dien-anh-noi-tieng-duoc-chuyen-the-tu-cac-tua-game-dinh-dam"
                    className="rounded-lg shadow-lg overflow-hidden w-full h-full"
                  >
                    <img
                      className="w-full h-[238.141px] object-cover rounded-md"
                      src="https://s3img.vcdn.vn/123phim/2021/03/mortal-kombat-cuoc-chien-sinh-tu-goi-ten-nhung-phim-dien-anh-noi-tieng-duoc-chuyen-the-tu-cac-tua-game-dinh-dam-16170160290762.png"
                      alt="news-movie"
                    />
                    <div className="p-4 flex-1">
                      <h4 className="text-lg font-bold mb-2">[MORTAL KOMBAT: CUỘC CHIẾN SINH TỬ] - GỌI TÊN NHỮNG PHIM ĐIỆN ẢNH NỔI...</h4>
                      <p className="text-gray-600">
                        Cư dân nơi khác đang sắp “gato nổ mắt” với dân Sài Thành khi sắp tới đây thành phố HCM sẽ chào đón một rạp chiếu phim mang phong cách Artistic Urban Lifestyle đầu tiên tại Việt
                        Nam!
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="content-bottom">
              <div className="grid grid-cols-3 gap-4">
                <div className="content-1 w-[282px] h-[336px]">
                  <a href="https://tix.vn/goc-dien-anh/7963-promising-young-woman-bong-hong-nuoc-anh-carey-mulligan-va-man-tra-thu-dan-ong-de-doi">
                    <img
                      className="w-[282px] h-[156px] object-cover rounded-md"
                      src="https://s3img.vcdn.vn/123phim/2021/03/promising-young-woman-bong-hong-nuoc-anh-carey-mulligan-va-man-tra-thu-dan-ong-de-doi-16166710855522.png"
                      alt="news-movie"
                    />
                    <div className="py-3">
                      <h4 className="text-lg font-bold">PROMISING YOUNG WOMAN | Bông hồng nước Anh Carey Mulligan và màn trả thù...</h4>
                      <p className="text-gray-600">Đề cử giải Oscar danh giá vừa gọi tên Carey Mulligan ở hạng mục nữ chính xuất sắc nhất cho vai diễn "đẫm máu" nhất sự nghiệp của cô trong phim</p>
                    </div>
                  </a>
                </div>
                <div className="content-2 w-[282px] h-[336px]">
                  <a href="https://tix.vn/goc-dien-anh/7962-vua-dep-lai-vua-tai-nang-dan-sao-nam-cua-phim-ban-tay-diet-quy-dam-bao-don-tim-hoi-chi-em">
                    <img
                      className="w-[282px] h-[156px] object-cover rounded-md"
                      src="https://s3img.vcdn.vn/123phim/2021/03/vua-dep-lai-vua-tai-nang-dan-sao-nam-cua-phim-ban-tay-diet-quy-dam-bao-don-tim-hoi-chi-em-16165783843676.png"
                      alt="news-movie"
                    />
                    <div className="py-3">
                      <h4 className="text-lg font-bold">VỪA ĐẸP LẠI VỪA TÀI NĂNG, DÀN SAO NAM CỦA PHIM “BÀN TAY DIỆT QUỶ”...</h4>
                      <p className="text-gray-600">
                        Quy tụ 3 nam tài tử vừa điển trai, vừa được đánh giá cao về năng lực diễn xuất là Park Seo Joon, Woo Do Hwan và Choi Woo Sik, tác phẩm kinh dị – hành
                      </p>
                    </div>
                  </a>
                </div>
                <div className="content-3 w-[282px] h-[336px]">
                  <a href="https://tix.vn/goc-dien-anh/7961-khai-truong-rap-xin-gia-ngon-chuan-xi-tai-sai-gon">
                    <div className="flex items-center">
                      <img
                        className="w-[84px] h-[84px] object-cover rounded-md"
                        src="https://s3img.vcdn.vn/123phim/2021/01/khai-truong-rap-xin-gia-ngon-chuan-xi-tai-sai-gon-16115477671555.jpg"
                        alt="news-movie"
                      />
                      <div className="ml-3">
                        <h6 className="text-gray-600">Khai trương rạp xịn giá ngon, chuẩn xì-tai Sài Gòn</h6>
                      </div>
                    </div>
                  </a>
                  <a href="https://tix.vn/goc-dien-anh/7960-boc-tem-to-hop-giai-tri-moi-toanh-cua-gioi-ha-thanh">
                    <div className="flex items-center mt-2">
                      <img
                        className="w-[84px] h-[84px] object-cover rounded-md"
                        src="https://s3img.vcdn.vn/123phim/2020/11/boc-tem-to-hop-giai-tri-moi-toanh-cua-gioi-ha-thanh-16056939435004.png"
                        alt="news-movie"
                      />
                      <div className="ml-3">
                        <h6 className="text-gray-600">“Bóc tem” tổ hợp giải trí mới toanh của giới Hà Thành</h6>
                      </div>
                    </div>
                  </a>
                  <a href="https://tix.vn/goc-dien-anh/7957-tiec-trang-mau-chinh-thuc-can-moc-100-ty-chi-sau-2-tuan-cong-chieu">
                    <div className="flex items-center mt-2">
                      <img
                        className="w-[84px] h-[84px] object-cover rounded-md"
                        src="https://s3img.vcdn.vn/123phim/2020/11/tiec-trang-mau-chinh-thuc-can-moc-100-ty-chi-sau-2-tuan-cong-chieu-16043751284117.png"
                        alt="news-movie"
                      />
                      <div className="ml-3">
                        <h6 className="text-gray-600">Tiệc Trăng Máu chính thức cán mốc 100 tỷ chỉ sau 2 tuần công</h6>
                      </div>
                    </div>
                  </a>
                  <a href="https://tix.vn/goc-dien-anh/7956-ngo-thanh-van-chinh-thuc-khoi-dong-cuoc-thi-thiet-ke-trang-phuc-cho-sieu-anh-hung-dau-tien-cua-viet-nam-vinaman">
                    <div className="flex items-center mt-2">
                      <img
                        className="w-[84px] h-[84px] object-cover rounded-md"
                        src="https://s3img.vcdn.vn/123phim/2020/10/ngo-thanh-van-chinh-thuc-khoi-dong-cuoc-thi-thiet-ke-trang-phuc-cho-sieu-anh-hung-dau-tien-cua-viet-nam-vinaman-16041584850247.jpg"
                        alt="news-movie"
                      />
                      <div className="ml-3">
                        <h6 className="text-gray-600">NGÔ THANH VÂN CHÍNH THỨC KHỞI ĐỘNG CUỘC THI THIẾT</h6>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: '2',
      label: <span className="text-2xl">Review</span>,
      children: (
        <div className="w-full max-w-6xl mx-auto px-4 py-6">
          <div className="grid grid-rows-2 gap-4">
            <div className="content-top">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-left w-[430px] h-[378px]">
                  <a href="#" className="rounded-lg shadow-lg overflow-hidden w-full h-full">
                    <img
                      className="w-full h-[238.141px] object-cover rounded-md"
                      src="https://s3img.vcdn.vn/123phim/2020/08/review-tan-tich-quy-am-relic-ba-the-he-va-moi-lien-ket-15965255784224.png"
                      alt="news-movie"
                    />
                    <div className="p-4 flex-1">
                      <h4 className="text-lg font-bold mb-2">Ấn định chắc nịch ngày khởi chiếu 16.04, Lý Hải tung clip Lật Mặt: 48H đậm chất</h4>
                      <p className="text-gray-600">Trước thềm khởi chiếu 16.04 này, Lý Hải bất ngờ tung clip rượt đuổi gay cấn thót tim fans hâm mộ</p>
                    </div>
                  </a>
                </div>
                <div className="text-left w-[430px] h-[378px]">
                  <a href="#" className="rounded-lg shadow-lg overflow-hidden w-full h-full">
                    <img
                      className="w-full h-[238.141px] object-cover rounded-md"
                      src="https://s3img.vcdn.vn/123phim/2020/08/review-dinh-thu-oan-khuat-ghost-of-war-15965120886610.png"
                      alt="news-movie"
                    />
                    <div className="p-4 flex-1">
                      <h4 className="text-lg font-bold mb-2">[MORTAL KOMBAT: CUỘC CHIẾN SINH TỬ] - GỌI TÊN NHỮNG PHIM ĐIỆN ẢNH NỔI...</h4>
                      <p className="text-gray-600">
                        Cư dân nơi khác đang sắp “gato nổ mắt” với dân Sài Thành khi sắp tới đây thành phố HCM sẽ chào đón một rạp chiếu phim mang phong cách Artistic Urban Lifestyle đầu tiên tại Việt
                        Nam!
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="content-bottom">
              <div className="grid grid-cols-3 gap-4">
                <div className="content-1 w-[282px] h-[336px]">
                  <a href="#">
                    <img
                      className="w-[282px] h-[156px] object-cover rounded-md"
                      src="https://s3img.vcdn.vn/123phim/2021/03/promising-young-woman-bong-hong-nuoc-anh-carey-mulligan-va-man-tra-thu-dan-ong-de-doi-16166710855522.png"
                      alt="news-movie"
                    />
                    <div className="py-3">
                      <h4 className="text-lg font-bold">PROMISING YOUNG WOMAN | Bông hồng nước Anh Carey Mulligan và màn trả thù...</h4>
                      <p className="text-gray-600">Đề cử giải Oscar danh giá vừa gọi tên Carey Mulligan ở hạng mục nữ chính xuất sắc nhất cho vai diễn "đẫm máu" nhất sự nghiệp của cô trong phim</p>
                    </div>
                  </a>
                </div>
                <div className="content-2 w-[282px] h-[336px]">
                  <a href="https://tix.vn/goc-dien-anh/7962-vua-dep-lai-vua-tai-nang-dan-sao-nam-cua-phim-ban-tay-diet-quy-dam-bao-don-tim-hoi-chi-em">
                    <img
                      className="w-[282px] h-[156px] object-cover rounded-md"
                      src="https://s3img.vcdn.vn/123phim/2021/03/vua-dep-lai-vua-tai-nang-dan-sao-nam-cua-phim-ban-tay-diet-quy-dam-bao-don-tim-hoi-chi-em-16165783843676.png"
                      alt="news-movie"
                    />
                    <div className="py-3">
                      <h4 className="text-lg font-bold">VỪA ĐẸP LẠI VỪA TÀI NĂNG, DÀN SAO NAM CỦA PHIM “BÀN TAY DIỆT QUỶ”...</h4>
                      <p className="text-gray-600">
                        Quy tụ 3 nam tài tử vừa điển trai, vừa được đánh giá cao về năng lực diễn xuất là Park Seo Joon, Woo Do Hwan và Choi Woo Sik, tác phẩm kinh dị – hành
                      </p>
                    </div>
                  </a>
                </div>
                <div className="content-3 w-[282px] h-[336px]">
                  <a href="#">
                    <div className="flex items-center">
                      <img
                        className="w-[84px] h-[84px] object-cover rounded-md"
                        src="https://s3img.vcdn.vn/123phim/2021/01/khai-truong-rap-xin-gia-ngon-chuan-xi-tai-sai-gon-16115477671555.jpg"
                        alt="news-movie"
                      />
                      <div className="ml-3">
                        <h6 className="text-gray-600">Khai trương rạp xịn giá ngon, chuẩn xì-tai Sài Gòn</h6>
                      </div>
                    </div>
                  </a>
                  <a href="#">
                    <div className="flex items-center mt-2">
                      <img
                        className="w-[84px] h-[84px] object-cover rounded-md"
                        src="https://s3img.vcdn.vn/123phim/2020/11/boc-tem-to-hop-giai-tri-moi-toanh-cua-gioi-ha-thanh-16056939435004.png"
                        alt="news-movie"
                      />
                      <div className="ml-3">
                        <h6 className="text-gray-600">“Bóc tem” tổ hợp giải trí mới toanh của giới Hà Thành</h6>
                      </div>
                    </div>
                  </a>
                  <a href="#">
                    <div className="flex items-center mt-2">
                      <img
                        className="w-[84px] h-[84px] object-cover rounded-md"
                        src="https://s3img.vcdn.vn/123phim/2020/11/tiec-trang-mau-chinh-thuc-can-moc-100-ty-chi-sau-2-tuan-cong-chieu-16043751284117.png"
                        alt="news-movie"
                      />
                      <div className="ml-3">
                        <h6 className="text-gray-600">Tiệc Trăng Máu chính thức cán mốc 100 tỷ chỉ sau 2 tuần công</h6>
                      </div>
                    </div>
                  </a>
                  <a href="#">
                    <div className="flex items-center mt-2">
                      <img
                        className="w-[84px] h-[84px] object-cover rounded-md"
                        src="https://s3img.vcdn.vn/123phim/2020/10/ngo-thanh-van-chinh-thuc-khoi-dong-cuoc-thi-thiet-ke-trang-phuc-cho-sieu-anh-hung-dau-tien-cua-viet-nam-vinaman-16041584850247.jpg"
                        alt="news-movie"
                      />
                      <div className="ml-3">
                        <h6 className="text-gray-600">NGÔ THANH VÂN CHÍNH THỨC KHỞI ĐỘNG CUỘC THI THIẾT</h6>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: '3',
      label: <span className="text-2xl">Khuyến mãi</span>,
      children: (
        <div className="w-full max-w-6xl mx-auto px-4 py-6">
          <div className="grid grid-rows-2 gap-4">
            <div className="content-top">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-left w-[430px] h-[378px]">
                  <a href="#" className="rounded-lg shadow-lg overflow-hidden w-full h-full">
                    <img className="w-full h-[238.141px] object-cover rounded-md" src="https://s3img.vcdn.vn/123phim/2021/04/bhd-59k-ve-ca-tuan-16190002421777.jpg" alt="news-movie" />
                    <div className="p-4 flex-1">
                      <h4 className="text-lg font-bold mb-2">Ấn định chắc nịch ngày khởi chiếu 16.04, Lý Hải tung clip Lật Mặt: 48H đậm chất</h4>
                      <p className="text-gray-600">Trước thềm khởi chiếu 16.04 này, Lý Hải bất ngờ tung clip rượt đuổi gay cấn thót tim fans hâm mộ</p>
                    </div>
                  </a>
                </div>
                <div className="text-left w-[430px] h-[378px]">
                  <a href="#" className="rounded-lg shadow-lg overflow-hidden w-full h-full">
                    <img className="w-full h-[238.141px] object-cover rounded-md" src="https://s3img.vcdn.vn/123phim/2020/11/tix-1k-ve-ngai-chi-gia-ve-16045662877511.jpg" alt="news-movie" />
                    <div className="p-4 flex-1">
                      <h4 className="text-lg font-bold mb-2">[MORTAL KOMBAT: CUỘC CHIẾN SINH TỬ] - GỌI TÊN NHỮNG PHIM ĐIỆN ẢNH NỔI...</h4>
                      <p className="text-gray-600">
                        Cư dân nơi khác đang sắp “gato nổ mắt” với dân Sài Thành khi sắp tới đây thành phố HCM sẽ chào đón một rạp chiếu phim mang phong cách Artistic Urban Lifestyle đầu tiên tại Việt
                        Nam!
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="content-bottom">
              <div className="grid grid-cols-3 gap-4">
                <div className="content-1 w-[282px] h-[336px]">
                  <a href="#">
                    <img
                      className="w-[282px] h-[156px] object-cover rounded-md"
                      src="https://s3img.vcdn.vn/123phim/2021/03/promising-young-woman-bong-hong-nuoc-anh-carey-mulligan-va-man-tra-thu-dan-ong-de-doi-16166710855522.png"
                      alt="news-movie"
                    />
                    <div className="py-3">
                      <h4 className="text-lg font-bold">PROMISING YOUNG WOMAN | Bông hồng nước Anh Carey Mulligan và màn trả thù...</h4>
                      <p className="text-gray-600">Đề cử giải Oscar danh giá vừa gọi tên Carey Mulligan ở hạng mục nữ chính xuất sắc nhất cho vai diễn "đẫm máu" nhất sự nghiệp của cô trong phim</p>
                    </div>
                  </a>
                </div>
                <div className="content-2 w-[282px] h-[336px]">
                  <a href="https://tix.vn/goc-dien-anh/7962-vua-dep-lai-vua-tai-nang-dan-sao-nam-cua-phim-ban-tay-diet-quy-dam-bao-don-tim-hoi-chi-em">
                    <img
                      className="w-[282px] h-[156px] object-cover rounded-md"
                      src="https://s3img.vcdn.vn/123phim/2021/03/vua-dep-lai-vua-tai-nang-dan-sao-nam-cua-phim-ban-tay-diet-quy-dam-bao-don-tim-hoi-chi-em-16165783843676.png"
                      alt="news-movie"
                    />
                    <div className="py-3">
                      <h4 className="text-lg font-bold">VỪA ĐẸP LẠI VỪA TÀI NĂNG, DÀN SAO NAM CỦA PHIM “BÀN TAY DIỆT QUỶ”...</h4>
                      <p className="text-gray-600">
                        Quy tụ 3 nam tài tử vừa điển trai, vừa được đánh giá cao về năng lực diễn xuất là Park Seo Joon, Woo Do Hwan và Choi Woo Sik, tác phẩm kinh dị – hành
                      </p>
                    </div>
                  </a>
                </div>
                <div className="content-3 w-[282px] h-[336px]">
                  <a href="#">
                    <div className="flex items-center">
                      <img
                        className="w-[84px] h-[84px] object-cover rounded-md"
                        src="https://s3img.vcdn.vn/123phim/2021/01/khai-truong-rap-xin-gia-ngon-chuan-xi-tai-sai-gon-16115477671555.jpg"
                        alt="news-movie"
                      />
                      <div className="ml-3">
                        <h6 className="text-gray-600">Khai trương rạp xịn giá ngon, chuẩn xì-tai Sài Gòn</h6>
                      </div>
                    </div>
                  </a>
                  <a href="#">
                    <div className="flex items-center mt-2">
                      <img
                        className="w-[84px] h-[84px] object-cover rounded-md"
                        src="https://s3img.vcdn.vn/123phim/2020/11/boc-tem-to-hop-giai-tri-moi-toanh-cua-gioi-ha-thanh-16056939435004.png"
                        alt="news-movie"
                      />
                      <div className="ml-3">
                        <h6 className="text-gray-600">“Bóc tem” tổ hợp giải trí mới toanh của giới Hà Thành</h6>
                      </div>
                    </div>
                  </a>
                  <a href="#">
                    <div className="flex items-center mt-2">
                      <img
                        className="w-[84px] h-[84px] object-cover rounded-md"
                        src="https://s3img.vcdn.vn/123phim/2020/11/tiec-trang-mau-chinh-thuc-can-moc-100-ty-chi-sau-2-tuan-cong-chieu-16043751284117.png"
                        alt="news-movie"
                      />
                      <div className="ml-3">
                        <h6 className="text-gray-600">Tiệc Trăng Máu chính thức cán mốc 100 tỷ chỉ sau 2 tuần công</h6>
                      </div>
                    </div>
                  </a>
                  <a href="#">
                    <div className="flex items-center mt-2">
                      <img
                        className="w-[84px] h-[84px] object-cover rounded-md"
                        src="https://s3img.vcdn.vn/123phim/2020/10/ngo-thanh-van-chinh-thuc-khoi-dong-cuoc-thi-thiet-ke-trang-phuc-cho-sieu-anh-hung-dau-tien-cua-viet-nam-vinaman-16041584850247.jpg"
                        alt="news-movie"
                      />
                      <div className="ml-3">
                        <h6 className="text-gray-600">NGÔ THANH VÂN CHÍNH THỨC KHỞI ĐỘNG CUỘC THI THIẾT</h6>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="text-center mt-4 w-full mx-auto flex justify-center">
      <Tabs defaultActiveKey="1" items={items} tabBarGutter={50} tabBarStyle={{ width: '500px', margin: 'auto', marginLeft: '240px' }} />
    </div>
  )
}

export default News
