// <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//     <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
//     <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
//     <g id="SVGRepo_iconCarrier">
//         <path d="M14 20.408c-.492.308-.903.546-1.192.709-.153.086-.308.17-.463.252h-.002a.75.75 0 01-.686 0 16.709 16.709 0 01-.465-.252 31.147 31.147 0 01-4.803-3.34C3.8 15.572 1 12.331 1 8.513 1 5.052 3.829 2.5 6.736 2.5 9.03 2.5 10.881 3.726 12 5.605 13.12 3.726 14.97 2.5 17.264 2.5 20.17 2.5 23 5.052 23 8.514c0 3.818-2.801 7.06-5.389 9.262A31.146 31.146 0 0114 20.408z"></path>
//     </g>
// </svg>;

export default function generateHeartSvg(size, fill, style, classList) {
    const svgNS = "http://www.w3.org/2000/svg";

    // Create the SVG element
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("width", `${size}px`);
    svg.setAttribute("height", `${size}px`);
    svg.setAttribute("fill", fill);
    svg.style.cssText = style;
    classList.forEach((className) => {
        svg.classList.add(className);
    });

    // Create the first group element
    const g1 = document.createElementNS(svgNS, "g");
    g1.setAttribute("id", "SVGRepo_bgCarrier");
    g1.setAttribute("strokeWidth", "0");

    // Create the second group element
    const g2 = document.createElementNS(svgNS, "g");
    g2.setAttribute("id", "SVGRepo_tracerCarrier");
    g2.setAttribute("strokeLinecap", "round");
    g2.setAttribute("strokeLinejoin", "round");

    // Create the third group element
    const g3 = document.createElementNS(svgNS, "g");
    g3.setAttribute("id", "SVGRepo_iconCarrier");

    // Create the path element
    const path = document.createElementNS(svgNS, "path");
    path.setAttribute(
        "d",
        "M14 20.408c-.492.308-.903.546-1.192.709-.153.086-.308.17-.463.252h-.002a.75.75 0 01-.686 0 16.709 16.709 0 01-.465-.252 31.147 31.147 0 01-4.803-3.34C3.8 15.572 1 12.331 1 8.513 1 5.052 3.829 2.5 6.736 2.5 9.03 2.5 10.881 3.726 12 5.605 13.12 3.726 14.97 2.5 17.264 2.5 20.17 2.5 23 5.052 23 8.514c0 3.818-2.801 7.06-5.389 9.262A31.146 31.146 0 0114 20.408z"
    );

    // Append the path element to the third group element
    g3.appendChild(path);

    // Append the group elements to the SVG element
    svg.appendChild(g1);
    svg.appendChild(g2);
    svg.appendChild(g3);

    // Return the SVG element
    return svg;
}
