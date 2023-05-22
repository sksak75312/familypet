// 從套間中引入工具
import { motion } from 'framer-motion';
import Slider from 'react-slick';
// 引入圖片
import HomeSlider1 from '../../img/homeSlider1.jpg';
import HomeSlider2 from '../../img/homeSlider2.jpg';
import HomeSlider3 from '../../img/homeSlider3.jpg';
import Park from '../../img/park.png';
import Serve from '../../img/serve.png';
import Cargo from '../../img/cargo.png';
import Info1 from '../../img/二不一要.jpg';
import Info2 from '../../img/1959動物保護專線.jpg';

function Home() {
  // react-slick Slider 功能設定
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    autoplay: true,
    arrows: false,
    speed: 2000,
    autoplaySpeed: 4000,
    cssEase: 'ease-out',
  };

  // 設置動畫顯示、隱藏 
  const serveVariants = {
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 2 },
    },
    hidden: { opacity: 0, scale: 0 },
  };

  // 設置動畫左邊顯示、右邊顯示
  const infoVariants = {
    leftVisible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.5 },
    },
    leftHidden: {
      opacity: 0,
      x: '-5%',
    },
    rightVisible: {
      opacity: 1,
      x: 0,
      transition: {duration: 1.5,},
    },
    rightHidden: {
      opacity: 0,
      x: '5%',
    }
  };

  return (
    <>
      <main className="front-main">
        {/* 輪播 section */}
        <section className="section-slider">
          <Slider {...settings}>
            <div className="section-slider__card">
              <img
                src={HomeSlider1}
                alt="輪播圖片"
                className="section-slider__card__img"
              />
            </div>
            <div className="section-slider__card">
              <img
                src={HomeSlider2}
                alt="輪播圖片"
                className="section-slider__card__img"
              />
            </div>
            <div className="section-slider__card">
              <img
                src={HomeSlider3}
                alt="輪播圖片"
                className="section-slider__card__img"
              />
            </div>
          </Slider>
        </section>

        {/* 服務時間 */}
        <section className="section-serve">
          <h2 className="section-serve__title">服務時間</h2>
          <motion.div
            className="section-serve__wrapper"
            initial="hidden"
            animate="visible"
            variants={serveVariants}
          >
            <div className="section-serve__wrapper__data">
              <img
                src={Park}
                alt="park"
                className="section-serve__wrapper__data__img"
              />
              <h2 className="section-serve__wrapper__data__title">園區時間</h2>
              <p className="section-serve__wrapper__data__content">
                周一至周六
                <br /> 9:00 ~ 17:00
              </p>
            </div>
            <div className="section-serve__wrapper__data">
              <img
                src={Serve}
                alt="serve"
                className="section-serve__wrapper__data__img"
              />
              <h3 className="section-serve__wrapper__data__title">客服時間</h3>
              <p className="section-serve__wrapper__data__content">
                周一至周五
                <br /> 9:00 ~ 20:00
              </p>
            </div>
            <div className="section-serve__wrapper__data">
              <img
                src={Cargo}
                alt="cargo"
                className="section-serve__wrapper__data__img"
              />
              <h3 className="section-serve__wrapper__data__title">好物寄出</h3>
              <p className="section-serve__wrapper__data__content">
                周一至周六
                <br /> 9:00 ~ 20:00
              </p>
            </div>
          </motion.div>
        </section>

        <section className="section-info">
          <h2 className="section-info__title">寵物資訊</h2>
          <div className="section-info__wrapper">
            <motion.div
              className="section-info__wrapper__card"
              initial= "leftHidden"
              whileInView="leftVisible"
              variants={infoVariants}
            >
              <div className="section-info__wrapper__card__text">
                <h2 className="section-info__wrapper__card__text__title">
                  預防狂犬病二不一要
                </h2>
                <p>
                  ➤不棄養犬貓寵物 <br />
                  ➤不接觸野生動物 <br />
                  ➤要定期帶犬貓動物施打狂犬病疫苗
                </p>
              </div>
              <img
                src={Info1}
                alt="預防狂犬病"
                className="section-info__wrapper__card__img"
              />
            </motion.div>
            <motion.div
              className="section-info__wrapper__card"
              initial= "rightHidden"
              whileInView= "rightVisible"
              variants={infoVariants}
            >
              <img
                src={Info2}
                alt="狂犬病症狀"
                className="section-info__wrapper__card__img"
              />
              <div className="section-info__wrapper__card__text">
                <h2 className="section-info__wrapper__card__text__title">
                  狂犬病症狀
                </h2>
                <p>
                  ➤引發肌肉麻痺 <br />
                  ➤心情狂躁不安 <br />
                  ➤身體發燒 <br />
                  ➤瞳孔擴張 <br />
                  ➤不愛喝水 <br />
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
