import React, { useState, useRef, useEffect } from 'react'
import { Card, Pagination, Typography, Button, Modal } from 'antd'
import { Movie } from '../../interface/movie.interface'
import Meta from 'antd/es/card/Meta'
import { PlayCircleOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

interface ListOfFilmProps {
  movies: Movie[]
  totalMovies: number
  currentPage: number
  count: number
  setCurrentPage: (page: number) => void
}

const ListOfMovie: React.FC<ListOfFilmProps> = ({ movies, totalMovies, currentPage, setCurrentPage, count }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [videoKey, setVideoKey] = useState<number>(0)
  const [hoveredMovieId, setHoveredMovieId] = useState<number | null>(null)

  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const navigate = useNavigate()

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const showModal = (trailerUrl: string) => {
    const embedUrl = trailerUrl.includes('youtu.be/') ? trailerUrl.replace('youtu.be/', 'www.youtube.com/embed/') : trailerUrl
    setVideoUrl(embedUrl)
    setIsModalVisible(true)
    setVideoKey((prevKey) => prevKey + 1)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setVideoUrl(null)
    if (iframeRef.current) {
      iframeRef.current.src = ''
    }
    setVideoKey((prevKey) => prevKey + 1)
  }

  return (
    <div className="text-center mt-4">
      <div className="text-2xl mb-4 text-red-500 font-bold">List of Movies</div>
      <div className="mt-4 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-screen-lg">
          {movies.map((movie) => (
            <div key={movie.maPhim} className="relative group" onMouseEnter={() => setHoveredMovieId(movie.maPhim)} onMouseLeave={() => setHoveredMovieId(null)}>
              <Card
                className="my-3"
                hoverable
                cover={
                  <div className="relative">
                    <div className={`absolute top-0 left-0 p-2 text-white font-semibold text-sm rounded-br-lg ${movie.dangChieu ? 'bg-green-500' : 'bg-yellow-500'}`}>
                      {movie.dangChieu ? 'Đang Chiếu' : 'Sắp Chiếu'}
                    </div>
                    <img className="w-full h-[320px] object-cover" alt={movie.tenPhim} src={movie.hinhAnh} />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-60">
                      <div className="flex flex-col items-center">
                        <Button type="primary" shape="circle" icon={<PlayCircleOutlined />} size="large" onClick={() => showModal(movie.trailer)} className="mb-2" />
                      </div>
                    </div>
                  </div>
                }
              >
                {hoveredMovieId === movie.maPhim ? (
                  <Button type="default" shape="round" icon={<ShoppingCartOutlined />} size="large" className="text-white bg-red-500 hover:bg-red-600 w-full">
                    Mua Vé
                  </Button>
                ) : (
                  <Meta
                    className="text-2xl"
                    title={movie.tenPhim}
                    description={
                      <Typography.Paragraph ellipsis={{ rows: 1 }} className="flex-1 text-left text-sm font-medium text-gray-600 capitalize">
                        {movie.moTa}
                      </Typography.Paragraph>
                    }
                  />
                )}
                <Button className="seeMore-btn my-2" onClick={() => navigate(`/movie-details/${movie.maPhim}`)}>
                  See More
                </Button>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <Pagination current={currentPage} pageSize={count} total={totalMovies} onChange={handlePageChange} />
      </div>
      <Modal title="Video" visible={isModalVisible} onCancel={handleCancel} footer={null} width={800}>
        {videoUrl && (
          <div className="video-container">
            <iframe
              ref={iframeRef}
              key={videoKey}
              width="100%"
              height="450"
              src={videoUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </Modal>
    </div>
  )
}

export default ListOfMovie
