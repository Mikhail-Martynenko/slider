import React from 'react';
import './App.css';
import Slider from "./Slider/Slider";
import slides from './Slider/slides.json'

function App() {
    return (
        <div className="App">
            <Slider
                slides={slides}
                loop
                navs
                pages
                auto
                stopMouseHover
                delay={3}
            />
        </div>
    );
}

export default App;
