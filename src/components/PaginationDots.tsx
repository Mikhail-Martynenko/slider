import React from "react";
import {PaginationContainer, PaginationDot} from "../Slider/styles";

interface Slide {
    img: string;
    text: string;
}

interface PaginationDotsProps {
    slides: Slide[];
    currentIndex: number;
    loop: boolean;
    totalSlides: number;
    handlePagination: (index: number) => void;
}

const PaginationDots: React.FC<PaginationDotsProps> = ({slides, currentIndex, loop, totalSlides, handlePagination}) => {
    return (
        <>
            <PaginationContainer>
                {slides.map((_, index) => (
                    <PaginationDot
                        key={index}
                        active={loop ? index === currentIndex : index === currentIndex % totalSlides}
                        onClick={() => handlePagination(index)}
                    />
                ))}
            </PaginationContainer>
        </>
    );
};

export default PaginationDots;
