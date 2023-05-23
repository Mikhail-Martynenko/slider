import React, {useState, useEffect, useCallback} from "react";
import SlideNumber from "../components/SlideNumber";
import {
    NextArrow,
    PaginationContainer,
    PaginationDot,
    PrevArrow,
    SliderContainer,
    SliderImage,
    SliderText
} from "./styles";
import PaginationDots from "../components/PaginationDots";
import NavButtons from "../components/NavButtons";

interface Slide {
    img: string;
    text: string;
}

interface SliderProps {
    slides: Slide[];
    loop: boolean;
    navs: boolean;
    pages: boolean;
    auto: boolean;
    stopMouseHover: boolean;
    delay: number;
}

const Slider: React.FC<SliderProps> = ({slides, loop, navs, pages, auto, stopMouseHover, delay}) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoEnabled, setIsAutoEnabled] = useState(auto);
    const [isMouseOver, setIsMouseOver] = useState(stopMouseHover);

    const totalSlides = slides.length;

    const handleSlideChange = useCallback(
        (delta: number) => {
            let nextIndex = currentIndex + delta;

            if (loop) {
                nextIndex = (nextIndex + totalSlides) % totalSlides;
            } else {
                nextIndex = Math.max(0, Math.min(nextIndex, totalSlides - 1));
            }

            setCurrentIndex(nextIndex);
        },
        [currentIndex, totalSlides, loop]
    );

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isAutoEnabled) {
            interval = setInterval(() => handleSlideChange(1), delay * 100);
        }

        return () => {
            clearInterval(interval);
        };
    }, [currentIndex, isAutoEnabled, delay, isMouseOver]);


    const handlePagination = useCallback((index: number) => {
        setCurrentIndex(index);
    }, [setCurrentIndex]);

    const handleMouseEnter = useCallback(() => {
        if (auto && stopMouseHover) {
            setIsMouseOver(true);
            setIsAutoEnabled(false);
        }
    }, [auto, setIsMouseOver, setIsAutoEnabled, stopMouseHover]);

    const handleMouseLeave = useCallback(() => {
        if (auto && stopMouseHover) {
            setIsMouseOver(false);
            setIsAutoEnabled(true);
        }
    }, [auto, setIsMouseOver, setIsAutoEnabled, stopMouseHover]);

    return (
        <SliderContainer onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {navs && <NavButtons handleSlideChange={handleSlideChange} />}

            {slides.map((slide, index) => (
                <div key={index} style={{display: index === currentIndex ? "block" : "none"}}>
                    <SliderImage src={slide.img} alt={`Slide ${index + 1}`} />
                    <SliderText>{slide.text}</SliderText>
                </div>
            ))}

            {pages && <PaginationDots
                slides={slides} currentIndex={currentIndex} loop={loop} totalSlides={totalSlides}
                handlePagination={handlePagination}
            />}

            <SlideNumber currentIndex={currentIndex} totalSlides={totalSlides} />
        </SliderContainer>
    );
};

export default Slider;


