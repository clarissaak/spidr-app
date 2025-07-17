import React, {useEffect} from "react";
import Particles, {initParticlesEngine} from "@tsparticles/react";
import {loadFull} from "tsparticles";
import particlesOptions from "./particles.json";
import Overlay from "./Overlay";
import "./Background.css";

// using memoization stop particles from re-rendering
const Background = React.memo(() => {
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadFull(engine);
        });
    }, []);

    return (
        <div className="Background">
            <Particles options={particlesOptions} />
            <Overlay />
        </div>
    );
});

export default Background;