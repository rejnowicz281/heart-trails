import { useEffect, useRef, useState } from "react";
import css from "./index.module.css";

export default function App() {
    const wrapperRef = useRef(null);
    const [stop, setStop] = useState(false);
    const [drawing, setDrawing] = useState(true);

    function toggleFloat() {
        setStop((stop) => !stop);
    }

    function toggleDrawing() {
        setDrawing((drawing) => !drawing);
    }

    function stopBlock(block) {
        block.style.top = `${block.getBoundingClientRect().top}px`;
        block.style.opacity = window.getComputedStyle(block).opacity;
        block.classList.remove(css["fly-up"]);
    }

    function makeBlockFlyUp(block) {
        block.classList.add(css["fly-up"]);
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

        const blocks = wrapper.querySelectorAll(".block");

        if (stop) {
            wrapper.classList.add(css["wrapper-stop"]);
            blocks.forEach((block) => stopBlock(block));
        } else {
            wrapper.classList.remove(css["wrapper-stop"]);
            blocks.forEach((block) => makeBlockFlyUp(block));
        }
    }, [wrapperRef, stop]);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        function clearBlocks() {
            const blocks = wrapper.querySelectorAll(".block");

            blocks.forEach((block) => block.remove());
        }

        function spaceToggleFloat(e) {
            if (e.code === "Space") toggleFloat();
        }

        function leftClickToggleDrawing(e) {
            if (e.button === 0) toggleDrawing();
        }

        function rightClickClear(e) {
            e.preventDefault();
            clearBlocks();
        }

        wrapper.addEventListener("mousedown", leftClickToggleDrawing);
        document.addEventListener("keydown", spaceToggleFloat);
        wrapper.addEventListener("contextmenu", rightClickClear);

        return () => {
            wrapper.removeEventListener("contextmenu", rightClickClear);
            document.removeEventListener("keydown", spaceToggleFloat);
            wrapper.removeEventListener("mousedown", leftClickToggleDrawing);
        };
    }, [wrapperRef]);

    function handleMouseMove(e) {
        if (!drawing) return;

        const width = wrapperRef.current.offsetWidth;

        const block = document.createElement("div");

        const size = width / 50;
        block.style.width = `${size}px`;
        block.style.height = `${size}px`;

        block.style.position = "absolute";
        block.style.left = `${e.pageX - size / 2}px`;
        block.style.top = `${e.pageY - size / 2}px`;
        block.style.backgroundColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;

        block.classList.add("block");
        if (!stop) block.classList.add(css["fly-up"]);

        block.addEventListener("animationend", (e) => {
            if (e.animationName === css["fly-up-anim"]) block.remove();
        });

        wrapperRef.current.appendChild(block);
    }

    return <div className={css.wrapper} onMouseMove={handleMouseMove} ref={wrapperRef}></div>;
}
