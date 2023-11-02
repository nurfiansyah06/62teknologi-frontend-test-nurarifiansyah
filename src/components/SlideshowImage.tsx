import React, { Component } from 'react';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

interface SimpleSliderState {
  settings: {
    dots: boolean;
    infinite: boolean;
    speed: number;
    slidesToShow: number;
    slidesToScroll: number;
  };
}

interface SimpleSliderProps {
    photos: string[];
}

class SimpleSlider extends Component<SimpleSliderProps, SimpleSliderState> {
  constructor(props: SimpleSliderProps) {
    super(props);
    this.state = {
      settings: {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      }
    };
  }

  render() {
    const { photos } = this.props;

    return (
      <div>
        <Slider {...this.state.settings}>
            {photos.map((photo, index) => (
                <div key={index} className='img-carousel'>
                    <img src={photo} className='img' alt="" />
                </div>
            ))}
        </Slider>
      </div>
    );
  }
}

export default SimpleSlider;
