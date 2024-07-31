import { useQuery } from '@tanstack/react-query'
import { Button, Dropdown, Menu, Typography } from 'antd'
import { useEffect, useState } from 'react'
import moment from 'moment'
import { movieApi } from '../../apis/movie.api'
import { DataListMovie, Movie } from '../../interface/movie.interface'

const BookingTicket = () => {
  const [tickets, setTickets] = useState<DataListMovie>([])
  const [selectedMovie, setSelectedMovie] = useState<string>('Chọn Phim')
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null)
  const [cinemas, setCinemas] = useState<any[]>([])
  const [selectedCinema, setSelectedCinema] = useState<string>('Chọn Rạp')
  const [showtimes, setShowtimes] = useState<any[]>([])
  const [selectedShowtime, setSelectedShowtime] = useState<string>('Chọn Ngày')

  const { data, isLoading, isError } = useQuery({
    queryKey: ['movie'],
    queryFn: () => movieApi.getAllMovie<DataListMovie>(),
  })

  const { data: movieDetails } = useQuery({
    queryKey: ['movieDetails', selectedMovieId],
    queryFn: () => (selectedMovieId ? movieApi.getInfoMovie({ maPhim: selectedMovieId }) : Promise.resolve(null)),
    enabled: !!selectedMovieId,
  })

  useEffect(() => {
    if (data) {
      setTickets(data)
    }
  }, [data])

  useEffect(() => {
    if (movieDetails) {
      const cinemaList = movieDetails.heThongRapChieu.map((cinema: any) => ({
        key: cinema.maHeThongRap,
        label: cinema.tenHeThongRap,
      }))
      setCinemas(cinemaList)
      const selectedCinemaDetails = movieDetails.heThongRapChieu.find((cinema: any) => cinema.maHeThongRap === selectedCinema)
      if (selectedCinemaDetails) {
        const showtimeList = selectedCinemaDetails.cumRapChieu.flatMap((cumRap: any) =>
          cumRap.lichChieuPhim.map((showtime: any) => ({
            key: showtime.maLichChieu,
            label: moment(showtime.ngayChieuGioChieu).format('DD/MM/YYYY HH:mm'),
          }))
        )
        setShowtimes(showtimeList)
      }
    }
  }, [movieDetails, selectedCinema])

  const movieMenu = (
    <Menu
      items={tickets.map((movie) => ({
        key: movie.maPhim,
        label: movie.tenPhim,
        onClick: () => {
          setSelectedMovie(movie.tenPhim)
          setSelectedMovieId(movie.maPhim)
        },
      }))}
    />
  )

  const cinemaMenu = (
    <Menu
      items={cinemas.map((cinema) => ({
        key: cinema.key,
        label: cinema.label,
        onClick: () => {
          setSelectedCinema(cinema.key)
          const selectedCinemaDetails = movieDetails?.heThongRapChieu.find((c: any) => c.maHeThongRap === cinema.key)
          if (selectedCinemaDetails) {
            const showtimeList = selectedCinemaDetails.cumRapChieu.flatMap((cumRap: any) =>
              cumRap.lichChieuPhim.map((showtime: any) => ({
                key: showtime.maLichChieu,
                label: moment(showtime.ngayChieuGioChieu).format('DD/MM/YYYY HH:mm'),
              }))
            )
            setShowtimes(showtimeList)
          }
        },
      }))}
    />
  )

  const showtimeMenu = (
    <Menu
      items={showtimes.map((showtime) => ({
        key: showtime.key,
        label: showtime.label,
        onClick: () => {
          setSelectedShowtime(showtime.label) // Update the selected showtime
        },
      }))}
    />
  )

  return (
    <div className="flex justify-center items-center space-x-4 mt-4">
      <Dropdown overlay={movieMenu} placement="bottomLeft" arrow>
        <Button className="w-[300px] h-[50px] text-left">
          <Typography.Text ellipsis>{selectedMovie}</Typography.Text>
        </Button>
      </Dropdown>
      <Dropdown overlay={cinemaMenu} placement="bottomLeft" arrow>
        <Button className="w-[300px] h-[50px] text-left">
          <Typography.Text ellipsis>{selectedCinema || 'Chọn Rạp'}</Typography.Text>
        </Button>
      </Dropdown>
      <Dropdown overlay={showtimeMenu} placement="bottomLeft" arrow>
        <Button className="w-[300px] h-[50px] text-left">
          <Typography.Text ellipsis>{selectedShowtime || 'Chọn Ngày'}</Typography.Text>
        </Button>
      </Dropdown>
      <Button className="bg-red-500 text-white w-[150px] h-[50px]">MUA VÉ NGAY</Button>
    </div>
  )
}

export default BookingTicket
