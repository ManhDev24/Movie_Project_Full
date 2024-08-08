import { useQuery } from "@tanstack/react-query";
import { Button, Dropdown, Menu, Typography } from "antd";
import { useEffect, useState } from "react";
import moment from "moment";
import { movieApi } from "../../apis/movie.api";
import { DataListMovie } from "../../interface/movie.interface";
import { LoadingPage } from "../../modules/Loading";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

const BookingTicket = () => {
  const [tickets, setTickets] = useState<DataListMovie>([]);
  const [selectedMovie, setSelectedMovie] = useState<string>("Chọn Phim");
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [cinemas, setCinemas] = useState<any[]>([]);
  const [selectedCinema, setSelectedCinema] = useState<string>("Chọn Rạp");
  const [showtimes, setShowtimes] = useState<any[]>([]);
  const [selectedShowtime, setSelectedShowtime] = useState<string>("Chọn Ngày");
  const [dataById, setDataById] = useState({});
  const [maLichChieuList, setMaLichChieuList] = useState([]);
  const { currentUser } = useAppSelector((state) => state.user);
  const { data, isLoading } = useQuery({
    queryKey: ["movie"],
    queryFn: () => movieApi.getAllMovie<DataListMovie>(),
  });
  const navigate = useNavigate();
  const { data: movieDetails } = useQuery({
    queryKey: ["movieDetails", selectedMovieId],
    queryFn: () =>
      selectedMovieId
        ? movieApi.getInfoMovie({ maPhim: selectedMovieId })
        : Promise.resolve(null),
    enabled: !!selectedMovieId,
  });

  useEffect(() => {
    if (data) {
      setTickets(data);
    }
  }, [data]);

  useEffect(() => {
    if (movieDetails) {
      const cinemaList = movieDetails.heThongRapChieu.map((cinema: any) => ({
        key: cinema.maHeThongRap,
        label: cinema.tenHeThongRap,
      }));
      setCinemas(cinemaList);
      const selectedCinemaDetails = movieDetails.heThongRapChieu.find(
        (cinema: any) => cinema.maHeThongRap === selectedCinema
      );
      if (selectedCinemaDetails) {
        const showtimeList = selectedCinemaDetails.cumRapChieu.flatMap(
          (cumRap: any) =>
            cumRap.lichChieuPhim.map((showtime: any) => ({
              key: showtime.maLichChieu,
              label: moment(showtime.ngayChieuGioChieu).format(
                "DD/MM/YYYY HH:mm"
              ),
            }))
        );
        setShowtimes(showtimeList);
      }
    }
  }, [movieDetails, selectedCinema]);

  const handleMovieSelect = (movie: any) => {
    setSelectedMovie(movie.tenPhim);
    setSelectedMovieId(movie.maPhim);
    setSelectedCinema("Chọn Rạp");
    setSelectedShowtime("Chọn Ngày");
    setCinemas([]);
    setShowtimes([]);
  };
  
    // const fetchMovieTheater = async () => {
    //   if(selectedMovieId){
    //     const resultTheater = await movieApi.getTheaterByMovieShow(selectedMovieId);
    //     setDataById(resultTheater);
    //   }
    //   else{
    //     console.log("");
    //   }
      
    // };
    
  
 
 
  // if (dataById && dataById.heThongRapChieu) {
    
  //   const maLichChieuList = dataById.heThongRapChieu.flatMap(heThongRap =>
  //     heThongRap.cumRapChieu.flatMap(cumRap =>
  //       cumRap.lichChieuPhim.map(lichChieu => lichChieu.maLichChieu)
  //     )
  //   );
  //   setMaLichChieuList(maLichChieuList);
  // } else {
  //   console.error('Dữ liệu không hợp lệ hoặc thiếu thuộc tính heThongRapChieu');
  // }


  const movieMenu = (
    <Menu
      items={
        tickets.length > 0
          ? tickets.map((movie) => ({
            key: movie.maPhim,
            label: movie.tenPhim,
            onClick: () => handleMovieSelect(movie),
          }))
          : [{ key: "empty", label: "Vui lòng chọn phim", disabled: true }]
      }
    />
  );

  const cinemaMenu = (
    <Menu
      items={
        cinemas.length > 0
          ? cinemas.map((cinema) => ({
            key: cinema.key,
            label: cinema.label,
            onClick: () => {
              setSelectedCinema(cinema.key);
              const selectedCinemaDetails =
                movieDetails?.heThongRapChieu.find(
                  (c: any) => c.maHeThongRap === cinema.key
                );
              if (selectedCinemaDetails) {
                const showtimeList =
                  selectedCinemaDetails.cumRapChieu.flatMap((cumRap: any) =>
                    cumRap.lichChieuPhim.map((showtime: any) => ({
                      key: showtime.maLichChieu,
                      label: moment(showtime.ngayChieuGioChieu).format(
                        "DD/MM/YYYY HH:mm"
                      ),
                    }))
                  );
                setShowtimes(showtimeList);
              }
            },
          }))
          : [{ key: "empty", label: "Trống", disabled: true }]
      }
    />
  );


  const showtimeMenu = (
    <Menu
      items={
        showtimes.length > 0
          ? showtimes.map((showtime) => ({
            key: showtime.key,
            label: showtime.label,
            onClick: () => {
              setSelectedShowtime(showtime.label);
            },
          }))
          : [{ key: "empty", label: "Trống", disabled: true }]
      }
    />
  );

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="flex flex-col items-center space-y-6 mt-6">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <Dropdown overlay={movieMenu} placement="bottomLeft" arrow>
          <Button className="w-[300px] h-[50px] text-left bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-100 transition">
            <Typography.Text ellipsis>{selectedMovie}</Typography.Text>
          </Button>
        </Dropdown>
        <Dropdown overlay={cinemaMenu} placement="bottomLeft" arrow>
          <Button className="w-[300px] h-[50px] text-left bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-100 transition">
            <Typography.Text ellipsis>
              {selectedCinema || "Chọn Rạp"}
            </Typography.Text>
          </Button>
        </Dropdown>
        <Dropdown overlay={showtimeMenu} placement="bottomLeft" arrow>
          <Button className="w-[300px] h-[50px] text-left bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-100 transition">
            <Typography.Text ellipsis>
              {selectedShowtime || "Chọn Ngày"}
            </Typography.Text>
          </Button>
        </Dropdown>
      </div>
      <Button
        
        className="bg-red-500 text-white w-[200px] h-[50px] rounded-md shadow-md hover:bg-red-600 transition"
        onClick={() => navigate(`/movie-details/${selectedMovieId}`)}
      >
        MUA VÉ NGAY
      </Button>
    </div>
  );
};

export default BookingTicket;
