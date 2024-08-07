import React from 'react'
import Slider from 'react-slick'
import styles from './App.module.css'
import 'antd/dist/antd.css'

const App: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  }

  return (
    <div style={{ backgroundImage: `url(/img/background.jpg)` }}>
      <Slider>
        <div>
          <img src="./img/mobile.png" />
        </div>
      </Slider>
    </div>
  )
}

export default App
