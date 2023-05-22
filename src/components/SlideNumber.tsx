import React from 'react';
import {NumberImage} from "../Slider/styles";

interface SlideNumberProps {
    currentIndex: number,
    totalSlides: number
}

const SlideNumber: React.FC<SlideNumberProps> = ({currentIndex, totalSlides}) => {
    return (
        <NumberImage>
            {currentIndex + 1}/{totalSlides}
        </NumberImage>
    );
};

export default SlideNumber;