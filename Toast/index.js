const iconType = {
  success: "fas fa-check-circle",
  info: "fas fa-circle-info",
  danger: "fas fa-triangle-exclamation",
  error: "fas fa-check-exclamation",
};

const toast = ({ tille, msg, duration, type }) => {
  const main = document.getElementById("toast");
  const icon = iconType[type];
  if (main) {
    const toast = document.createElement("div");
    const autoRemove = setTimeout(function () {
      main.removeChild(toast);
    }, duration + 1000);
    toast.onclick = (e) => {
      if (e.target.closest(".toast__close")) {
        main.removeChild(toast);
        clearTimeout(autoRemove);
      }
    };
    const delay = (duration / 1000).toFixed(2);
    toast.classList.add("toast", `toast--${type}`);
    toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;
    toast.innerHTML = ` 
    <div class="toast__icon">
      <i class="fas fa-circle-info"></i>
    </div>
    <div class="toast__body">
      <h3 class="toast__title">${tille}</h3>
      <p class="toast__msg">${msg}</p>
    </div>
    <div class="toast__close">
      <i class="fas fa-times"></i>
    </div>`;
    main.appendChild(toast);
  }
};

const showSuccessToast = () =>
  toast({
    tille: "Success",
    msg: "acvbdkfgdfg",
    duration: 3000,
    type: "info",
  });
