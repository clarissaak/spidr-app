import React, {useEffect} from "react";
import Particles, {initParticlesEngine} from "@tsparticles/react";
import {loadFull} from "tsparticles";
import particlesOptions from "./particles.json";

// using memoization stop particles from re-rendering
const Background = React.memo(() => {
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadFull(engine);
        });
    }, []);

    return (
        <Particles options={particlesOptions} />
    );
});

export default Background;