import React, {useState, useEffect} from "react";

const Overlay = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    
    useEffect(() => {
        const handleMouseMove = (event) => {
            setMousePosition({ x: event.clientX, y: event.clientY });
        };
      
        document.addEventListener('mousemove', handleMouseMove);
      
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className="overlay" 
            style={{
                background: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, rgba(51, 51, 51, 0) 0%, rgba(51, 51, 51, 1) 100%)`,
            }} 
        />
    );
};

export default Overlay;