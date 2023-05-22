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

interface Slide {
    img: string;
    text: string;
}

interface SliderProps {
    slides: Slide[];
    loop?: boolean;
    navs?: boolean;
    pages?: boolean;
    auto?: boolean;
    stopMouseHover?: boolean;
    delay?: number;
}

const Slider: React.FC<SliderProps> = ({
                                           slides,
                                           loop = false,
                                           navs = false,
                                           pages = false,
                                           auto = false,
                                           stopMouseHover = false,
                                           delay = 3,
                                       }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoEnabled, setIsAutoEnabled] = useState(auto);

    const totalSlides = slides.length;

    const handleSlideChange = (delta: number) => {
        const nextIndex = (currentIndex + delta + totalSlides) % totalSlides;
        setCurrentIndex(nextIndex);
    };

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isAutoEnabled) {
            interval = setInterval(() => handleSlideChange(1), delay * 100);
        }

        return () => {
            clearInterval(interval);
        };
    }, [currentIndex, isAutoEnabled, delay]);


    const handlePagination = useCallback((index: number) => {
        setCurrentIndex(index);
    }, [setCurrentIndex]);

    const handleMouseEnter = useCallback(() => {
        if (auto) {
            setIsAutoEnabled(false);
        }
    }, [auto, setIsAutoEnabled]);


    const handleMouseLeave = useCallback(() => {
        if (auto && !stopMouseHover) {
            setIsAutoEnabled(true);
        }
    }, [auto, stopMouseHover, setIsAutoEnabled]);

    const renderNavButtons = () => {
        return (
            <>
                <PrevArrow onClick={() => handleSlideChange(-1)}>&#x2190;</PrevArrow>
                <NextArrow onClick={() => handleSlideChange(1)}>&#x2192;</NextArrow>
            </>
        );
    };

    const renderPaginationDots = () => {
        return (
            <PaginationContainer>
                {slides.map((_, index) => (
                    <PaginationDot
                        key={index}
                        active={index === currentIndex}
                        onClick={() => handlePagination(index)}
                    />
                ))}
            </PaginationContainer>
        );
    };

    return (
        <SliderContainer onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {navs && renderNavButtons()}
            {slides.map((slide, index) => (
                <div key={index} style={{display: index === currentIndex ? "block" : "none"}}>
                    <SliderImage src={slide.img} alt={`Slide ${index + 1}`} />
                    <SliderText>{slide.text}</SliderText>
                </div>
            ))}

            {pages && renderPaginationDots()}

            <SlideNumber currentIndex={currentIndex} totalSlides={totalSlides} />
        </SliderContainer>
    );
};

export default Slider;


