import React from "react";
import {NextArrow, PrevArrow} from "../Slider/styles";

interface NavButtonsProps {
    handleSlideChange: (delta: number) => void;
}

const NavButtons: React.FC<NavButtonsProps> = ({handleSlideChange}) => {
    const handlePrevClick = React.useCallback(() => {
        handleSlideChange(-1);
    }, [handleSlideChange]);

    const handleNextClick = React.useCallback(() => {
        handleSlideChange(1);
    }, [handleSlideChange]);

    return (
        <>
            <PrevArrow onClick={handlePrevClick}>&#x2190;</PrevArrow>
            <NextArrow onClick={handleNextClick}>&#x2192;</NextArrow>
        </>
    );
};

export default NavButtons;