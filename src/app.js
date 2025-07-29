// ========== 1. Header Slider (✅ Good)
const images = [
  "src/images/3-circles.jpg",
  "src/images/robo.jpg",
  "src/images/sky.jpg",
  "src/images/panda.jpg",
];
let imageIndex = 0;
const sliderImage = document.getElementById("slider-image");

function changeImage() {
  imageIndex = (imageIndex + 1) % images.length;
  sliderImage.src = images[imageIndex];
}
setInterval(changeImage, 5000);

// ========== 2. Skill Bars with Scroll Animation (✅ Good)
const skills = document.querySelectorAll(".skill");
let skillAnimationPlayed = false;

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top <= window.innerHeight && rect.bottom >= 0;
}

function animateSkills() {
  const skillsSection = document.querySelector(".profile-skills-social");
  if (!skillsSection || skillAnimationPlayed) return;

  if (isElementInViewport(skillsSection)) {
    skills.forEach((skill) => {
      const subject = skill.dataset.subject;
      const competency = skill.dataset.competency;

      skill.innerHTML = `
        <div class="skill-label">
          <span class="skill-name">${subject}</span>
          <span class="skill-value">${competency}</span>
        </div>
        <div class="bar">
          <div class="bar-fill" data-fill="${competency}"></div>
        </div>
      `;
    });

    setTimeout(() => {
      document.querySelectorAll(".bar-fill").forEach((bar) => {
        bar.style.width = bar.dataset.fill;
      });
    }, 100);

    skillAnimationPlayed = true;
  }
}
window.addEventListener("scroll", animateSkills);
window.addEventListener("load", animateSkills);

// ========== 3. Testimonials (✅ Good)
const testimonials = [
  {
    text: "lorem",
    photo: "src/images/d4.svg",
    role: "Graphic Designer",
    name: "Mau Thomas",
  },
  {
    text: "Consectetur adipisicing elit. Nostrum voluptas molestias.",
    photo: "src/images/d3.svg",
    role: "UX Expert",
    name: "Emily Johnson",
  },
  {
    text: "Tempor incididunt ut labore et dolore magna aliqua.",
    photo: "src/images/d5.svg",
    role: "UI Designer",
    name: "John Smith",
  },
];

const textEl = document.getElementById("t-slide-text");
const photoEl = document.getElementById("t-slide-photo");
const roleEl = document.getElementById("t-slide-role");
const nameEl = document.getElementById("t-slide-name");
const dots = document.querySelectorAll(".t-dot");

let testimonialIndex = 0;

function updateTestimonial(index) {
  const testimonial = testimonials[index];
  textEl.textContent = `"${testimonial.text}"`;
  photoEl.src = testimonial.photo;
  roleEl.textContent = testimonial.role;
  nameEl.textContent = testimonial.name;

  dots.forEach((d) => d.classList.remove("active"));
  dots[index].classList.add("active");
}

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    testimonialIndex = i;
    updateTestimonial(testimonialIndex);
    resetTestimonialInterval();
  });
});

function renderNextTestimonial() {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  updateTestimonial(testimonialIndex);
}

function resetTestimonialInterval() {
  clearInterval(testimonialInterval);
  testimonialInterval = setInterval(renderNextTestimonial, 10000);
}

let testimonialInterval = setInterval(renderNextTestimonial, 10000);
updateTestimonial(testimonialIndex);

// ========== 4. Latest Projects + Red Line ==========

const filterItems = document.querySelectorAll(".p_filter li");
const projectItems = document.querySelectorAll(".project");
const filterList = document.querySelector(".p_filter ul");

// Create red line once
const highlightLine = document.createElement("div");
highlightLine.classList.add("filter-highlight");
filterList.appendChild(highlightLine);

// Move red line under initial active
const initActive = document.querySelector(".p_filter li.active");
if (initActive) moveHighlight(initActive);

filterItems.forEach((item) => {
  item.addEventListener("click", () => {
    // Update active class
    filterItems.forEach((el) => el.classList.remove("active"));
    item.classList.add("active");

    // Filter projects
    const selected = item.getAttribute("data-filter");
    projectItems.forEach((proj) => {
      proj.style.display =
        selected === "all" || proj.dataset.category === selected
          ? "block"
          : "none";
    });

    moveHighlight(item);
  });
});

// Move red line next to text
function moveHighlight(item) {
  const span = item.querySelector("span");
  const spanRect = span.getBoundingClientRect();
  const listRect = filterList.getBoundingClientRect();

  const offsetLeft = spanRect.right - listRect.left + 8;

  const offsetTop = spanRect.top - listRect.top + spanRect.height / 2;

  highlightLine.style.width = "100%";
  highlightLine.style.height = "2px";
  highlightLine.style.left = offsetLeft + "px";
  highlightLine.style.top = offsetTop + "px";
}

// 📱 Ensure red line repositions on resize
window.addEventListener("resize", () => {
  const current = document.querySelector(".p_filter li.active");
  if (current) moveHighlight(current);
});
