import { useEffect, useRef, useState } from "react";
import generateHeartStyle from "../../utils/generateHeartStyle";
import generateHeartSvg from "../../utils/generateHeartSvg";
import getRandomRGB from "../../utils/getRandomRGB";
import css from "./index.module.css";

export default function App() {
    const wrapperRef = useRef(null);
    const [stop, setStop] = useState(false);
    const [drawing, setDrawing] = useState(true);

    function toggleStop() {
        setStop((stop) => !stop);
    }

    function toggleDrawing() {
        setDrawing((drawing) => !drawing);
    }

    function stopHeart(heart) {
        const animations = heart.getAnimations();

        animations.forEach((animation) => animation.pause());
    }

    function resumeHeart(heart) {
        const animations = heart.getAnimations();

        if (animations.length === 0) animateHeart(heart);
        else
            animations.forEach((animation) => {
                const remainingTime = animation.effect.getTiming().duration - animation.currentTime;
                if (remainingTime <= 0) animation.finish(); // have to do this because the 'paused' state takes precedence over the 'finished' state

                if (remainingTime > 0) animation.play();
            });
    }

    function animateHeart(heart) {
        const randomDuration = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;

        const anim = heart.animate(
            [{ transform: "translatey(0px)" }, { transform: "translatey(-100vh)", opacity: 0 }],
            {
                duration: randomDuration,
                easing: "ease-in-out",
                fill: "forwards",
                iterations: 1,
            }
        );

        anim.onfinish = () => heart.remove();
    }

    useEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        if (drawing) wrapper.style.cursor = "default";
        else wrapper.style.cursor = "not-allowed";
    }, [wrapperRef, drawing]);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        const hearts = wrapper.querySelectorAll(`.${css.heart}`);

        if (stop) {
            wrapper.classList.add(css["wrapper-stop"]);
            hearts.forEach((heart) => stopHeart(heart));
        } else {
            wrapper.classList.remove(css["wrapper-stop"]);
            hearts.forEach((heart) => resumeHeart(heart));
        }
    }, [wrapperRef, stop]);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        function clearHearts() {
            const hearts = wrapper.querySelectorAll(`.${css.heart}`);

            hearts.forEach((heart) => heart.remove());
        }

        function spaceToggleStop(e) {
            if (e.code === "Space") toggleStop();
        }

        function leftClickToggleDrawing(e) {
            if (e.button === 0) toggleDrawing();
        }

        function rightClickClear(e) {
            e.preventDefault();
            clearHearts();
        }

        wrapper.addEventListener("mousedown", leftClickToggleDrawing);
        document.addEventListener("keydown", spaceToggleStop);
        wrapper.addEventListener("contextmenu", rightClickClear);

        return () => {
            wrapper.removeEventListener("contextmenu", rightClickClear);
            document.removeEventListener("keydown", spaceToggleStop);
            wrapper.removeEventListener("mousedown", leftClickToggleDrawing);
        };
    }, [wrapperRef]);

    function handleWrapperHover(e) {
        if (!drawing) return;

        if (e.touches) e = e.touches[0]; // for mobile

        const wrapper = wrapperRef.current;

        const width = wrapper.offsetWidth;

        const size = width / 40;

        const classList = [css.heart];

        const heart = generateHeartSvg(size, getRandomRGB(), generateHeartStyle(e.pageX, e.pageY, size), classList);

        if (!stop) animateHeart(heart);

        wrapper.appendChild(heart);
    }

    return (
        <div
            className={css.wrapper}
            onMouseMove={handleWrapperHover}
            onTouchMove={handleWrapperHover}
            ref={wrapperRef}
        ></div>
    );
}
