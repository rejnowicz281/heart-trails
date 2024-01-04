export default function generateHeartStyle(wrapperX, wrapperY, size) {
    return `
        position:absolute;
        left:${wrapperX - size / 2}px;
        top:${wrapperY - size / 2}px;
    `;
}
