let dayStart = window.localStorage.getItem("date")
  ? new Date(window.localStorage.date)
  : new Date("Dec 31 2025");

// window.localStorage.clear();

const circleOne = document.querySelector(".parent .circle svg .circle-one");

const circleTwo = document.querySelector(".parent .circle svg .circle-two");

const svg = document.querySelector(".parent .circle svg");

let countOfTrips = window.localStorage.countOfTrips || 0;

let countOfDays = Math.trunc((new Date() - dayStart) / 1000 / 60 / 60 / 24);

let day = document.querySelector(".parent .info .day span");

let trip = document.querySelector(".parent .info .trip span");

let spanOfCircle = document.querySelector(".parent .circle span");

let percentage;

day.textContent = countOfDays;

trip.textContent = countOfTrips;

let btnAdd = document.querySelector("button.add");

let btnReset = document.querySelector("button.reset");

let popup = document.querySelector(".popup");

let back = document.querySelector(".back");

let btnYes = document.querySelector(".yes");

let btnNo = document.querySelector(".no");

function windowSize() {
  let width = (30 * window.visualViewport.width) / 100;

  if (width <= 220) width = 220;
  if (width >= 260) width = 260;

  return Math.PI * (width - 40);
}

let circumference = windowSize();

btnAdd.addEventListener("click", function () {
  window.localStorage.countOfTrips = ++countOfTrips;
  trip.textContent = countOfTrips;
  calculate();
});

btnReset.addEventListener("click", function () {
  back.style.zIndex = "100";
  popup.style.visibility = "visible";
  back.style.backgroundColor = "#00000087";
  btnNo.addEventListener("click", close);
  btnYes.addEventListener("click", function () {
    close();
    circleTwo.style.transition = "stroke-dashoffset 1.2s ease";
    window.localStorage.clear();
    const dateNow = new Date();
    const newDate = `${
      dateNow.getMonth() + 1
    } ${dateNow.getDate()} ${dateNow.getFullYear()}`;
    window.localStorage.date = newDate;
    dayStart = new Date(newDate);
    countOfDays = 0;
    day.textContent = countOfDays;
    countOfTrips = 0;
    trip.textContent = countOfTrips;
    circleTwo.style["stroke-dashoffset"] = circumference;
    let count = parseInt(spanOfCircle.textContent);
    let number = setInterval(function () {
      if (count == 0) {
        clearInterval(number);
        spanOfCircle.style.color = "#2ecc71";
      }
      spanOfCircle.textContent = `${count--}%`;
    }, 15 / Math.ceil(percentage / 100));
  });
});

setTimeout(calculate, 400);

function calculate() {
  circleTwo.style.transition = "stroke-dashoffset 1.2s ease";
  correction();
  // Conversion The Color {
  let color = spanOfCircle.style.color;

  if (parseInt(percentage) > 14) color = "#f1c40f";
  if (parseInt(percentage) > 28) color = "#e78a3c";
  if (parseInt(percentage) >= 50) color = "#e74c3c";

  circleTwo.style.stroke = color;
  spanOfCircle.style.color = color;
  // }

  let count = parseInt(spanOfCircle.textContent);
  let number = setInterval(() => {
    if (count == parseInt(percentage)) clearInterval(number);
    spanOfCircle.textContent = `${count++}%`;
  }, 15 / Math.ceil(percentage / 100));
}

function correction() {
  circleTwo.style["stroke-dasharray"] = circumference;
  percentage = (countOfTrips * 100) / (countOfDays || countOfTrips) || 0;
  let newCircumference = circumference - (circumference * percentage) / 100;
  newCircumference = newCircumference > 0 ? newCircumference : 0;
  circleTwo.style["stroke-dashoffset"] = newCircumference;
}

window.onresize = function () {
  circleTwo.style.transition = "none";
  circumference = windowSize();
  correction();
};

function close() {
  back.style.zIndex = "-1";
  popup.style.visibility = "";
  back.style.backgroundColor = "";
}
