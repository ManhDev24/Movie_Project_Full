import React, { useEffect, useState } from 'react'
import { Table, Tag, Alert } from 'antd'
import Navbar from './Navbar'
import { getLocalStorage } from '../../utils'
import moment from 'moment'
import { useQuery } from '@tanstack/react-query'
import { cinemaApi } from '../../apis/cinema.api'
import { LoadingPage } from '../../modules/Loading'

// Define the type for formatted data
interface FormattedData {
  key: number
  showtimeCode: number
  seats: string[]
  ticketPrices: string
  bookingTime: string
  cinemaName?: string
  cinemaAddress?: string
  movieTitle?: string
  movieImage?: string
  movieStartDate?: string
  movieStartHour?: string
  chairName?: string[]
  loaiGhe?: string[]
  maRap?: string
  taiKhoanNguoiDat?: string
}

const PurchaseHistory: React.FC = () => {
  const [formattedData, setFormattedData] = useState<FormattedData[]>([])
  console.log('formattedData: ', formattedData)
  const [showtimeCodes, setShowtimeCodes] = useState<number[]>([])
  const [showroomDetails, setShowroomDetails] = useState<{ [key: number]: any }>({})
  console.log('showroomDetails: ', showroomDetails)

  // Fetch room details for each showtimeCode
  const {
    data: roomDetailsData,
    error: roomDetailsError,
    isLoading: isRoomDetailsLoading,
  } = useQuery({
    queryKey: ['roomDetails', showtimeCodes],
    queryFn: async () => {
      const details = await Promise.all(showtimeCodes.map((code) => cinemaApi.getRoomDetails(code)))
      return details.reduce((acc: { [key: number]: any }, detail, index) => {
        acc[showtimeCodes[index]] = detail
        return acc
      }, {})
    },
    enabled: showtimeCodes.length > 0,
  })

  useEffect(() => {
    const bookingData = getLocalStorage<{ danhSachGhe: any[]; maLichChieu: number[]; bookingTime: string[] }>('bookingData') || { danhSachGhe: [], maLichChieu: [], bookingTime: [] }

    const data = bookingData.maLichChieu.map((maLichChieu, index) => {
      const danhSachGhe = bookingData.danhSachGhe
      const giaVe = danhSachGhe.map((item: any) => `${item.giaVe} VND`).join(', ')
      const seats = danhSachGhe.map((item: any) => item.maGhe)
      const bookingTime = bookingData.bookingTime[index] || 'N/A'

      const formattedBookingTime = bookingTime !== 'N/A' ? moment(bookingTime).format('dddd, DD MMMM YYYY') : 'N/A'

      return {
        key: index,
        showtimeCode: Number(maLichChieu),
        seats,
        ticketPrices: giaVe,
        bookingTime: formattedBookingTime,
      }
    })

    setFormattedData(data)
    setShowtimeCodes(data.map((item) => item.showtimeCode))
  }, [])

  useEffect(() => {
    if (roomDetailsData) {
      setShowroomDetails(roomDetailsData)

      const updatedData = formattedData.map((item) => {
        const chairs = roomDetailsData[item.showtimeCode]?.danhSachGhe || []
        const chairNames = item.seats.map((seatId) => {
          const chair = chairs.find((chair:any) => chair.maGhe === seatId)
          return chair ? chair.tenGhe : 'Không tìm thấy'
        })

        return {
          ...item,
          cinemaName: roomDetailsData[item.showtimeCode]?.thongTinPhim.tenCumRap,
          cinemaAddress: roomDetailsData[item.showtimeCode]?.thongTinPhim.diaChi,
          movieTitle: roomDetailsData[item.showtimeCode]?.thongTinPhim.tenPhim,
          movieImage: roomDetailsData[item.showtimeCode]?.thongTinPhim.hinhAnh,
          movieStartDate: roomDetailsData[item.showtimeCode]?.thongTinPhim.ngayChieu,
          movieStartHour: roomDetailsData[item.showtimeCode]?.thongTinPhim.gioChieu,
          chairName: chairNames,
        }
      })

      setFormattedData(updatedData)
    }
  }, [roomDetailsData])

  const columns = [
    {
      title: 'Showtime Code',
      dataIndex: 'showtimeCode',
      key: 'showtimeCode',
    },
    {
      title: 'Chair Name',
      dataIndex: 'chairName',
      key: 'chairName',
      render: (chairNames: string[] = []) => (
        <div>
          {chairNames.length > 0 ? (
            chairNames.map((name) => (
              <Tag key={name} color="blue">
                {name}
              </Tag>
            ))
          ) : (
            <Tag color="grey">No Chairs</Tag>
          )}
        </div>
      ),
    },
    {
      title: 'Ticket Prices',
      dataIndex: 'ticketPrices',
      key: 'ticketPrices',
      render: (text: string) => <span className="text-green-500">{text}</span>,
    },
    {
      title: 'Booking Time',
      dataIndex: 'bookingTime',
      key: 'bookingTime',
      render: (text: string) => <span className="text-blue-500">{text}</span>,
    },
    {
      title: 'Cinema Name',
      dataIndex: 'cinemaName',
      key: 'cinemaName',
    },
    {
      title: 'Cinema Address',
      dataIndex: 'cinemaAddress',
      key: 'cinemaAddress',
    },
    {
      title: 'Movie Title',
      dataIndex: 'movieTitle',
      key: 'movieTitle',
    },
    {
      title: 'Movie Image',
      dataIndex: 'movieImage',
      key: 'movieImage',
      render: (image: string) => <img src={image} alt="Movie" style={{ width: '100px', height: 'auto' }} />,
    },
  ]

  if (isRoomDetailsLoading) {
    return <LoadingPage />
  }

  if (roomDetailsError) {
    return (
      <div className="flex-1 mt-4">
        <Navbar />
        <Alert message="Error loading room details" description={roomDetailsError.message} type="error" showIcon />
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <div className="flex-1 mt-4">
        <h2 className="text-3xl text-red-500 text-center mb-4">Purchase History</h2>
        <div className="h-full">
          {formattedData.length === 0 ? <Alert message="No purchase history found" type="info" showIcon /> : <Table rowKey="key" columns={columns} dataSource={formattedData} pagination={false} />}
        </div>
      </div>
    </>
  )
}

export default PurchaseHistory
