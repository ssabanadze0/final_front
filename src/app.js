//Heade
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

// Skill Bars
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

//Testimonia
const testimonials = [
  {
    text: "Consectetur adipisicing elit. Nostrum voluptas molestias",
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
    text: "Consectetur adipisicing elit. Nostrum voluptas molestias",
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

// ===Latest Projects

const filterItems = document.querySelectorAll(".p_filter li");
const projectItems = document.querySelectorAll(".project");
const filterList = document.querySelector(".p_filter ul");

const highlightLine = document.createElement("div");
highlightLine.classList.add("filter-highlight");
filterList.appendChild(highlightLine);

// Move red line
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

window.addEventListener("resize", () => {
  const current = document.querySelector(".p_filter li.active");
  if (current) moveHighlight(current);
});
//// bolo funthion
//    element
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const websiteInput = document.getElementById("website");
const messageInput = document.getElementById("message");

const nameHint = document.getElementById("nameHint");
const mailHint = document.getElementById("mailHint");
const siteHint = document.getElementById("siteHint");
const textHint = document.getElementById("textHint");

const successModal = document.getElementById("success-modal");
const errorModal = document.getElementById("error-modal");
const form = document.getElementById("contact-form");
const submitButton = form.querySelector("button");

//  funciebi
function showModal(id, duration = 4000) {
  const modal = document.getElementById(id);
  modal.style.display = "flex";
  setTimeout(() => {
    modal.style.display = "none";
  }, duration);
}

function attachValidator(inputEl, hintEl, validatorFn, messageFn) {
  inputEl.addEventListener("input", () => {
    const value = inputEl.value.trim();

    if (value === "") {
      hintEl.textContent = "";
      hintEl.className = "hint";
      return;
    }

    const isValid = validatorFn(value);
    setHint(hintEl, messageFn(isValid), isValid);
  });
}

function setHint(element, message, isValid) {
  element.textContent = message;
  element.className = isValid ? "hint valid" : "hint invalid";
}

//   Rules
const isValidName = (val) => /^[a-zA-Z]{4,}$/.test(val);
const isValidEmail = (val) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) &&
  (val.match(/@/g) || []).length === 1;
const isValidWebsite = (val) => /\./.test(val);
const isValidMessage = (val) => val.length >= 25;

//   Validators
attachValidator(nameInput, nameHint, isValidName, (ok) =>
  ok ? "✓ Valid name." : "Name must be at least 4 letters (A-Z only)."
);

attachValidator(emailInput, mailHint, isValidEmail, (ok) =>
  ok
    ? "✓ Valid email address."
    : "Email must contain one '@' and a valid domain."
);

attachValidator(websiteInput, siteHint, isValidWebsite, (ok) =>
  ok ? "✓ Website format looks good." : "Website must include at least one dot."
);

attachValidator(messageInput, textHint, isValidMessage, (ok) =>
  ok ? "✓ Message is long enough." : "Message must be at least 25 characters."
);

// Handler
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nameValid = isValidName(nameInput.value.trim());
  const emailValid = isValidEmail(emailInput.value.trim());
  const websiteValid = isValidWebsite(websiteInput.value.trim());
  const messageValid = isValidMessage(messageInput.value.trim());

  if (!nameValid || !emailValid || !websiteValid || !messageValid) {
    showModal("error-modal");
    return;
  }

  submitButton.disabled = true;

  fetch("https://borjomi.loremipsum.ge/api/send-message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      website: websiteInput.value.trim(),
      message: messageInput.value.trim(),
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data?.status === 1) {
        showModal("success-modal");
        form.reset();
        document.querySelectorAll(".hint").forEach((hint) => {
          hint.textContent = "";
          hint.className = "hint";
        });
      } else {
        showModal("error-modal");
      }
    })
    .catch((err) => {
      console.error("Failed to send:", err);
      showModal("error-modal");
    })
    .finally(() => {
      submitButton.disabled = false;
    });
});
