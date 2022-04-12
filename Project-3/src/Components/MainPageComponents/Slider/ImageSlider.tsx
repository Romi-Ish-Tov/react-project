import React from 'react';
import Slider from "react-slick";
import mockVacationsArray from '../../../mocks/MockVacations/MockVacation';
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slider.css"

function Arrow(props: any) {
  let className = props.type === "next" ? "nextArrow" : "prevArrow";
  className += " arrow";
  const char = props.type === "next" ? <IoIosArrowDropright size={40}/> : <IoIosArrowDropleft size={40}/>;
  return (
    <span className={className} onClick={props.onClick}>
      {char}
    </span>
  );
}

function ImageSlider() {
  return (
    <div className='container mt-5 carousel'>
      <Slider
        nextArrow={<Arrow type="next" />}
        prevArrow={<Arrow type="prev" />}
        dots={false}
        speed={500}
        slidesToShow={1}
        autoplay={true}
        autoplaySpeed={3000}
        pauseOnDotsHover={true}
      >

        {mockVacationsArray.map((item, index) => {
          return (
            <div key={index} className='card-wrapper'>
              <div className='card'>
                <div className='card-image'>
                  <img src={item.image}></img>
                </div>
                <div className='details'>
                  <h2>{item.destination}</h2>
                </div>
              </div>
            </div>
          )
        })}
      </Slider>
    </div>
  )
}

export default ImageSlider;