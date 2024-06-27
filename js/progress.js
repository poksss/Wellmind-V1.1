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

// progress
new Vue({
  el: "#app",
  data: {
      habits: [
          {
              title: 'Example',
              initial: 3,
              complete: 0,
              finished: false
          }
      ],
      newHabit: '',
      newReps: '',
  },
  methods: {
      addHabit() {
          if (this.newHabit && this.newReps) {
              this.habits.push({
                  title: this.newHabit,
                  initial: parseInt(this.newReps),
                  complete: 0,
                  finished: false
              });
              this.newHabit = '';
              this.newReps = '';
          }
      },
      removeHabit(habit) {
          const index = this.habits.indexOf(habit);
          if (index > -1) {
              this.habits.splice(index, 1);
          }
      },
      completeReps(habit) {
          if (habit.complete < habit.initial) {
              habit.complete += 1;
          }
          if (habit.complete === habit.initial) {
              habit.finished = true;
          }
      }
  }
});
