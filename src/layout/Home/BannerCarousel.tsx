import { Carousel } from 'antd'
import './index.css'
import { banner, bannerStatusAPI } from '../../interface/banner.interface'
// Update propTypes to match the TypeScript interface
const BannerCarousel = ({ banners }: any) => {
  const settings = {
    arrows: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: 'custom-carousel',
  }

  return (
    <div className="relative w-full h-[80vh]">
      <Carousel {...settings} className="w-full h-full">
        {banners.map((item: banner) => (
          <div key={item.maBanner} className="flex items-center justify-center w-full h-full">
            <img className="object-fill w-full h-[80vh]" src={item.hinhAnh} alt={`Banner ${item.maBanner}`} />
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default BannerCarousel
