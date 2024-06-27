const navItems = document.querySelectorAll(".nav-item");

navItems.forEach((navItem, i) => {
  navItem.addEventListener("click", () => {
    navItems.forEach((item, j) => {
      item.className = "nav-item";
    });
    navItem.className = "nav-item active";
  });
});

// chart
const chartData = {
  labels: ["Happy", "Sad", "Angry", "Bored", "Tired"],
  data: [28, 13, 2, 19, 3],
};

const chart = document.getElementById("doughnut");
const eventList = document.querySelector(".chart ul");

new Chart(chart, {
  type: "doughnut",
  data: {
    labels: ["Devestated", "Sad", "Neutral", "Happy", "Ecstatic"],
    datasets: [
      {
        label: "# of Events",
        data: [4, 10, 6, 17, 5],
        backgroundColor: ['#ea3d36', '#edbf98', '#dff4c7', '#72e3a6', '#2d6b5f'],
        offset: 10,
        hoverOffset: 8,
        hoverBorderColor: "#9a999b",
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#8b8a96",
          font: {
            size: 12,
            weight: 600,
          },
        },
      },
    },
    layout: {
      padding: {
        bottom: 10,
      },
    },
  },
});

// mood
const currentYear = 2024;
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
const colors = ['#ea3d36', '#edbf98', '#dff4c7', '#72e3a6', '#2d6b5f'];
const defaultColor = 'transparent';
let activeColor = defaultColor;

const calendar = document.getElementById('calendar');
const moods = document.querySelectorAll('.mood');
const clearButton = document.getElementById('mood-clear');

moods.forEach(mood => {
  mood.addEventListener('click', () => {
    if (mood.classList.contains('selected')) {
      mood.classList.remove('selected');
      activeColor = defaultColor;
    } else {
      moods.forEach(mood => {
        mood.classList.remove('selected');
      });

      mood.classList.add('selected');
      activeColor = getComputedStyle(mood).getPropertyValue('color');
    }
  });
});

clearButton.addEventListener('click', () => {
  activeColor = defaultColor;
  moods.forEach(mood => {
    mood.classList.remove('selected');
  });
});

const getAllDays = year => {
  const firstDay = new Date(`January 1 ${year}`);
  const lastDay = new Date(`December 31 ${year}`);

  const days = [firstDay];

  let lastDayInArray = firstDay;

  while (lastDayInArray.getTime() !== lastDay.getTime()) {
    days.push(addDays(lastDayInArray, 1));
    lastDayInArray = days[days.length - 1];
  }

  return days;
};

const dates = getAllDays(currentYear);

let monthsHTML = '';

months.forEach((month, idx) => {
  monthsHTML += `<div class="months month_${idx}">
      <h3>${month}</h3>
      <div class="week_days_container">
          ${weekDays.map(day => `<div class="week_days">${day}</div>`).join('')}
      </div>
      <div class="days_container"></div>
  </div>`;
});

calendar.innerHTML = monthsHTML;

dates.forEach(date => {
  const month = date.getMonth();
  const monthEl = document.querySelector(`.month_${month} .days_container`);

  if (date.getDate() === 1 && date.getDay() !== 0) {
    for (let i = 0; i < date.getDay(); i++) {
      const emptySpot = createEmptySpot();

      monthEl.appendChild(emptySpot);
    }
  }

  const dateEl = createDateEl(date);

  monthEl.appendChild(dateEl);
});

const circles = document.querySelectorAll('.circle');
circles.forEach(circle => {
  circle.addEventListener('click', () => {
    circle.style.backgroundColor = activeColor;
  });
});

function createDateEl(date) {
  const day = date.getDate();
  const dateEl = document.createElement('div');
  dateEl.classList.add('days');
  dateEl.innerHTML = `<span class="circle">${day}</span>`;

  return dateEl;
}

function createEmptySpot() {
  const emptyEl = document.createElement('div');
  emptyEl.classList.add('days');

  return emptyEl;
}

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}