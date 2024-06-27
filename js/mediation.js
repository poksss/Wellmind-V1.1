// Active Navbar Item
const navItems = document.querySelectorAll(".nav-item");

navItems.forEach((navItem) => {
  navItem.addEventListener("click", () => {
    navItems.forEach((item) => {
      item.className = "nav-item";
    });
    navItem.classList.add("active");
  });
});

// Chart
const chartData = {
  labels: ["Happy", "Sad", "Angry", "Bored", "Tired"],
  data: [28, 13, 2, 19, 3],
};

const chart = document.getElementById("doughnut");
const eventList = document.querySelector(".chart ul");

new Chart(chart, {
  type: "doughnut",
  data: {
    labels: ["Devastated", "Sad", "Neutral", "Happy", "Ecstatic"],
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

// Share Button Popup
const sharebtns = document.querySelectorAll(".share-btn");

sharebtns.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    const popup = btn.closest(".event-footer").querySelector(".popup");

    btn.classList.toggle("active");
    popup.classList.toggle("active");

    event.stopPropagation();
  });
});

document.addEventListener("click", (event) => {
  const popups = document.querySelectorAll(".popup");

  popups.forEach((popup) => {
    if (popup.classList.contains("active") && !popup.contains(event.target)) {
      popup.classList.remove("active");

      const shareBtn = popup
        .closest(".event-footer")
        .querySelector(".share-btn");
      shareBtn.classList.remove("active");
    }
  });
});

// Filter sections
const filterButtons = document.querySelectorAll(".filters button");
const filterableCards = document.querySelectorAll(".event-container .card");

// Define the filter cards function
const filterCards = (e) => {
  document.querySelector(".filters .active").classList.remove("active");
  e.target.classList.add("active");

  // Iterate over each filterable card
  filterableCards.forEach((card) => {
    // Add hide class to hide the card initially
    card.classList.add("hide");
    // Check if card matches the selected filter or "all" is selected
    if (card.dataset.name === e.target.dataset.name || e.target.dataset.name === "all") {
      card.classList.remove("hide");
    }
  });
};

// Add click event listener to filter button
filterButtons.forEach((button) => button.addEventListener("click", filterCards));
