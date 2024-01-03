import { useEffect, useRef, useState } from "react";
import generateHeartSvg from "../../utils/generateHeartSvg";
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
        heart.style.top = `${heart.getBoundingClientRect().top}px`;
        heart.style.opacity = window.getComputedStyle(heart).opacity;
        heart.classList.remove(css["fly-up"]);
    }

    function makeHeartFlyUp(heart) {
        heart.classList.add(css["fly-up"]);
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

        const hearts = wrapper.querySelectorAll(".heart");

        if (stop) {
            wrapper.classList.add(css["wrapper-stop"]);
            hearts.forEach((heart) => stopHeart(heart));
        } else {
            wrapper.classList.remove(css["wrapper-stop"]);
            hearts.forEach((heart) => makeHeartFlyUp(heart));
        }
    }, [wrapperRef, stop]);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        function clearHearts() {
            const hearts = wrapper.querySelectorAll(".heart");

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

    function handleMouseMove(e) {
        if (!drawing) return;

        const width = wrapperRef.current.offsetWidth;

        const heart = generateHeartSvg();

        const size = width / 40;
        heart.setAttribute("width", `${size}px`);
        heart.setAttribute("height", `${size}px`);
        heart.setAttribute("fill", `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`);

        heart.style.position = "absolute";
        heart.style.left = `${e.pageX - size / 2}px`;
        heart.style.top = `${e.pageY - size / 2}px`;

        heart.classList.add("heart");
        if (!stop) heart.classList.add(css["fly-up"]);

        heart.addEventListener("animationend", (e) => {
            if (e.animationName === css["fly-up-anim"]) heart.remove();
        });

        wrapperRef.current.appendChild(heart);
    }

    return <div className={css.wrapper} onMouseMove={handleMouseMove} ref={wrapperRef}></div>;
}
