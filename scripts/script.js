const next = document.querySelector(
    ".slider-parent .controlls span:nth-child(1)"
);
const prev = document.querySelector(
    ".slider-parent .controlls span:nth-child(2)"
);
const sliders = document.querySelectorAll(".slider-parent .slider");
const progressBar = document.querySelector(".slider-parent .progressBar");
const lis = document.querySelectorAll(".slider-parent .indicators ul li");

var index = 0;
let timer;
var timeDelay = 5000;
next.addEventListener("click", () => {
    handleSlider("next");
});
prev.addEventListener("click", () => {
    handleSlider("prev");
});
timer = setInterval(() => {
    handleSlider("next");
}, timeDelay);

for (let s = 0; s < lis.length; s++) {
    lis[s].addEventListener("click", () => {
        progressBar.querySelector("div").remove();
        clearInterval(timer);
        timer = setInterval(() => {
            handleSlider("next");
        }, timeDelay);
        progress();
        index = s;

        sliders.forEach((item) => {
            item.classList.remove("active");
        });
        sliders[index].classList.add("active");

        lis.forEach((item) => {
            item.classList.remove("active");
        });
        lis[index].classList.add("active");
    });
}

function handleSlider(action) {
    progressBar.querySelector("div").remove();
    progress();
    clearInterval(timer);
    timer = setInterval(() => {
        handleSlider("next");
    }, timeDelay);
    sliders.forEach((item) => {
        item.classList.remove("active");
    });
    switch (action) {
        case "next":
            if (index < sliders.length - 1) {
                index++;
            } else {
                index = 0;
            }
            sliders[index].classList.add("active");

            lis.forEach((item) => {
                item.classList.remove("active");
            });
            lis[index].classList.add("active");
            break;
        case "prev":
            if (index <= 0) {
                index = sliders.length - 1;
            } else {
                index--;
            }
            sliders[index].classList.add("active");
            lis.forEach((item) => {
                item.classList.remove("active");
            });
            lis[index].classList.add("active");
            break;
    }
}

function progress() {
    const progress = document.createElement("div");
    progress.style.width = "0";
    progress.style.height = "7px";
    progress.style.position = "absolute";
    progress.style.top = "0";
    progress.style.zIndex = "1";
    progress.style.backgroundColor = "#dc3545";
    progress.style.backgroundImage =
        "linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent";

    progress.style.backgroundSize = "1rem 1rem";
    progress.style.animation = `anim ${timeDelay / 1000}s infinite linear`;
    progressBar.appendChild(progress);
}
progress();