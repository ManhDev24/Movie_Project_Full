import { Tabs, Spin, Alert, Button } from 'antd'
import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { cinemaApi } from '../../apis/cinema.api'
import { Typography } from 'antd'
import { useNavigate } from 'react-router-dom'

const { Title, Paragraph } = Typography

interface Cinema {
  maHeThongRap: string
  logo: string
}

interface CinemaDetail {
  tenCumRap: string
  diaChi: string
  lstCumRap: {
    hinhAnh: string
    tenCumRap: string
    diaChi: string
    danhSachPhim: {
      maPhim: string
      hinhAnh: string
      tenPhim: string
      lstLichChieuTheoPhim: {
        ngayChieuGioChieu: string
      }[]
    }[]
  }[]
}

const ListOfCinema = () => {
  const [selectedTheaterSystem, setSelectedTheaterSystem] = useState<string | undefined>(undefined)
  const [selectedCinema, setSelectedCinema] = useState<string | undefined>(undefined)
  const navigate = useNavigate()
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const options = { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' }
    return new Intl.DateTimeFormat('vi-VN', options).format(date)
  }

  const {
    data: listOfCinema = [],
    isLoading: isListOfCinemaLoading,
    isError: isListOfCinemaError,
    error: errorTheaterSystems,
  } = useQuery({
    queryKey: ['list-theater'],
    queryFn: cinemaApi.getAllCinema,
  })

  useEffect(() => {
    if (listOfCinema.length > 0 && !selectedTheaterSystem) {
      setSelectedTheaterSystem(listOfCinema[0].maHeThongRap)
    }
  }, [listOfCinema, selectedTheaterSystem])

  const {
    data: cinemasDetails = [],
    isLoading: isLoadingCinemas,
    isError: isErrorCinemas,
    error: errorCinemas,
  } = useQuery({
    queryKey: ['list-cinema', selectedTheaterSystem],
    queryFn: () => {
      if (selectedTheaterSystem) {
        return cinemaApi.getSystemShowtimes({ maHeThongRap: selectedTheaterSystem })
      }
      return Promise.resolve([])
    },
    enabled: !!selectedTheaterSystem,
  })

  useEffect(() => {
    if (cinemasDetails.length > 0 && !selectedCinema) {
      setSelectedCinema(cinemasDetails[0].lstCumRap[0].tenCumRap)
    }
  }, [cinemasDetails, selectedCinema])

  const handleTheaterSystemChange = (key: string) => {
    setSelectedTheaterSystem(key)
    const selectedCinemas = cinemasDetails.find((detail: any) => detail.tenCumRap === selectedCinema)
    if (selectedCinemas && selectedCinemas.lstCumRap.length > 0) {
      setSelectedCinema(selectedCinemas.lstCumRap[0].tenCumRap)
    }
  }

  if (isListOfCinemaLoading || isLoadingCinemas) {
    return <Spin tip="Loading cinema data..." />
  }

  if (isListOfCinemaError || isErrorCinemas) {
    return <Alert message="Error loading cinema data" type="error" description={(isListOfCinemaError ? errorTheaterSystems?.message : '') || (isErrorCinemas ? errorCinemas?.message : '')} />
  }

  return (
    <div className="w-full flex justify-center p-4 bg-gray-100">
      <div className="flex w-full max-w-7xl bg-white shadow-lg rounded-lg overflow-hidden">
        <Tabs tabPosition="left" activeKey={selectedTheaterSystem} onChange={handleTheaterSystemChange} className="w-1/4 bg-gray-50">
          {listOfCinema.map((cinema: Cinema) => (
            <Tabs.TabPane tab={<img className="w-16 h-16 object-cover rounded-md" src={cinema.logo} alt="cinema logo" />} key={cinema.maHeThongRap}>
              <Tabs tabPosition="left" className="w-3/4">
                {cinemasDetails.map((detail: CinemaDetail, index: number) => (
                  <Tabs.TabPane
                    tab={
                      <div className="p-4">
                        {detail.lstCumRap.slice(0, 6).map((items, idx) => (
                          <div
                            className={`flex items-center mb-4 max-w-[500px] cursor-pointer rounded-md p-3 ${selectedCinema === items.tenCumRap ? 'bg-gray-200' : ''}`}
                            key={idx}
                            onClick={() => setSelectedCinema(items.tenCumRap)}
                          >
                            <img src={items.hinhAnh} alt={items.tenCumRap} className="w-16 h-16 object-cover rounded-full border border-gray-300" />
                            <div className="ml-3">
                              <Title level={4} className="text-green-700">
                                {items.tenCumRap}
                              </Title>
                              <div className="w-full max-w-[300px]">
                                <Paragraph className="text-gray-700 truncate text-left">{items.diaChi}</Paragraph>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    }
                    key={index}
                  >
                    {detail.lstCumRap
                      .find((cumRap) => cumRap.tenCumRap === selectedCinema)
                      ?.danhSachPhim.slice(0, 5)
                      .map((film, filmIdx) => (
                        <div className="mb-6 flex items-start ml-6" key={filmIdx}>
                          <div className="mt-4">
                            <img src={film.hinhAnh} alt={film.tenPhim} className="w-[100px] h-[100px] object-cover" style={{ display: 'block', maxWidth: 'none' }} />
                          </div>

                          <div className="ml-4 flex-1 flex flex-col justify-between">
                            <div className="w-[300px]">
                              <Title level={4} className="text-blue-700">
                                {film.tenPhim}
                              </Title>
                              <Paragraph className="text-gray-600 mb-2">{formatDate(film.lstLichChieuTheoPhim[0]?.ngayChieuGioChieu || '')}</Paragraph>
                            </div>
                            <Button onClick={() => navigate(`/movie-details/${film.maPhim}`)} type="primary" className="self-start mt-2 ">
                              More Details
                            </Button>
                          </div>
                        </div>
                      ))}
                  </Tabs.TabPane>
                ))}
              </Tabs>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </div>
    </div>
  )
}

export default ListOfCinema
