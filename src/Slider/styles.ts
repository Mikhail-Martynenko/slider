import styled from "styled-components";

export const SliderContainer = styled.div`
  position: relative;
  max-width: 600px;
  margin: 0 auto;
`;

export const SliderImage = styled.img`
  width: 100%;
  height: auto;
`;

export const SliderText = styled.div`
  position: absolute;
  bottom: 3em;
  left: 14em;
  font-size: 18px;
  color: white;
\`             ;
`;


export const ArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 45%;
  font-size: 40px;
  color: white;
`;

export const PrevArrow = styled(ArrowButton)`
  left: 10px;
`;

export const NextArrow = styled(ArrowButton)`
  right: 10px;
`;


export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

export const PaginationDot = styled.button<{ active: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  margin: 0 5px;
  background-color: ${(props) => (props.active ? "black" : "gray")};
  cursor: pointer;
`;
export const NumberImage = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 20px;
  color: white;
\`             ;
`;
