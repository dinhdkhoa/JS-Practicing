const tabItems = document.querySelectorAll(".tab-item");
const tabPanes = document.querySelectorAll(".tab-pane");
const line = document.querySelector(".line");
let activeItem = document.querySelector(".tab-item.active");
let activePane = document.querySelector(".tab-pane.active");

line.style.left = activeItem.offsetLeft + "px";
line.style.width = activeItem.offsetWidth + "px";

tabItems.forEach((tab, index) => {
  tab.onclick = () => {
    activeItem.classList.remove("active");
    activePane.classList.remove("active");

    activeItem = tabItems[index];
    activePane = tabPanes[index];

    line.style.left = activeItem.offsetLeft + "px";
    line.style.width = activeItem.offsetWidth + "px";

    activePane.classList.add("active");
    activeItem.classList.add("active");
  };
});
