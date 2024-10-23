const colors = ['#ff0000', '#ffff00', '#008000'];
let currentIndex = 0;

function changeCircleColors() {
    const circles = document.querySelectorAll('.circle');
    circles.forEach(circle => {
        circle.style.backgroundColor = colors[currentIndex];
    });
    currentIndex = (currentIndex + 1) % colors.length;
}

setInterval(changeCircleColors, 1000);
