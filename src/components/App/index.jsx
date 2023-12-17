import { useRef } from "react";
import css from "./index.module.css";

export default function App() {
    const canvasRef = useRef(null);

    function handleMouseMove(e) {
        const block = document.createElement("div");

        block.classList.add(css.block);
        block.style.position = "absolute";
        block.style.left = `${e.pageX - 15}px`;
        block.style.top = `${e.pageY - 15}px`;
        block.style.backgroundColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;

        canvasRef.current.appendChild(block);

        setTimeout(() => {
            block.remove();
        }, 5000);
    }

    return <div className={css.wrapper} onMouseMove={handleMouseMove} ref={canvasRef}></div>;
}
