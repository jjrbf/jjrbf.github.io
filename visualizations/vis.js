const svg = document.getElementById("art");
console.log(svg);

// 500 x 500 canvas

for (let i = 0; i < 100; i++) {
    let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("r", Math.floor(Math.random() * 41) + 10);
    circle.setAttribute("cx", Math.floor(Math.random() * 491) + 10);
    circle.setAttribute("cy", Math.floor(Math.random() * 491) + 10);
    circle.setAttribute("fill", `hsl(${Math.floor(Math.random() * 20) + 70}, ${Math.floor(Math.random() * 60) + 20}%, ${Math.floor(Math.random() * 50) + 30}%)`);
    
    svg.append(circle);
    console.log(i)
}