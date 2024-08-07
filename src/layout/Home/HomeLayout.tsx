import { useQuery } from '@tanstack/react-query'
import { homePageAPI } from '../../apis/homePage.api'
import Navbar from './Navbar'
import BannerCarousel from './BannerCarousel'
import ListOfMovie from './ListOfMovie'
import { movieApi } from '../../apis/movie.api'
import { useState } from 'react'
import { DataListMovie } from '../../interface/movie.interface'
import { LoadingPage } from '../../modules/Loading'
import BookingTicket from './BookingTicket'
import News from './Profile/News'
import { App } from 'antd'
import Footer from '../UserLayout/Footer'
import ListOfCinema from './ListOfCinema'
import AppMobie from './AppMobie'

const HomeLayout: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const {
    data: banners,
    isLoading: loadingBanners,
    isError: errorBanners,
  } = useQuery({
    queryKey: ['list-banner'],
    queryFn: () => homePageAPI.getListBanner(),
  })

  const {
    data: movies,
    isLoading: loadingMovies,
    isError: errorMovies,
  } = useQuery({
    queryKey: ['list-movie', currentPage],
    queryFn: () => movieApi.listMovie<DataListMovie>({ page: currentPage, pageSize: 8 }),
  })

  if (loadingBanners || loadingMovies) {
    return <LoadingPage />
  }

  if (errorBanners || errorMovies) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">An error occurred. Please try again later.</div>
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <BannerCarousel banners={banners || []} />
      <BookingTicket />
      <div id="lich-chieu-section">
        {movies && movies.items && <ListOfMovie movies={movies.items} totalMovies={movies.totalCount} currentPage={currentPage} setCurrentPage={setCurrentPage} count={movies.count} />}
      </div>
      <div className="w-full mx-auto mt-20 flex justify-center" id="cum-rap">
        <ListOfCinema />
      </div>
      <div id="Tin-tuc">
        <News />
      </div>

      <Footer />
    </div>
  )
}

export default HomeLayout
