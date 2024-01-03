import { useRef } from "react";
import css from "./index.module.css";

export default function App() {
    const wrapperRef = useRef(null);

    function handleMouseMove(e) {
        const width = wrapperRef.current.offsetWidth;

        const block = document.createElement("div");

        const size = width / 50;
        block.style.width = `${size}px`;
        block.style.height = `${size}px`;

        block.style.position = "absolute";
        block.style.left = `${e.pageX - size / 2}px`;
        block.style.top = `${e.pageY - size / 2}px`;
        block.style.backgroundColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;

        block.classList.add(css["fly-up"]);

        block.addEventListener("animationend", (e) => {
            if (e.animationName === css["fly-up-anim"]) block.remove();
        });

        wrapperRef.current.appendChild(block);
    }

    return <div className={css.wrapper} onMouseMove={handleMouseMove} ref={wrapperRef}></div>;
}
