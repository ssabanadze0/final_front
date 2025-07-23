// 1slider
const images = [
  "src/images/3-circles.jpg",
  "src/images/robo.jpg",
  "src/images/sky.jpg",
  "src/images/panda.jpg",
];

let currentIndex = 0;
const sliderImage = document.getElementById("slider-image");

function changeImage() {
  currentIndex = (currentIndex + 1) % images.length;
  sliderImage.src = images[currentIndex];
}

setInterval(changeImage, 5000);
///skills
document.querySelectorAll(".skill").forEach((skill) => {
  const subject = skill.dataset.subject;
  const competency = skill.dataset.competency;

  skill.innerHTML = `
    <div class="skill-label">
      <span class="skill-name">${subject}</span>
      <span class="skill-value">${competency}</span>
    </div>
    <div class="bar" style="--percent: ${competency}"></div>
  `;
});
