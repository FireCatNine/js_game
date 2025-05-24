export function createGrid(containerId) {
  const container = document.getElementById(containerId)
  container.classList.add("grid")
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const cell = document.createElement("div")
      cell.classList.add("cell")
      cell.dataset.x = i + 1
      cell.dataset.y = j + 1
      cell.addEventListener("click", () => {
        //Stuff
      })
      container.appendChild(cell)
    }
  }
}

export function createToggle(buttonId, firstButtonValue, secondButtonValue) {
  const button = document.getElementById(buttonId)
  button.innerText = firstButtonValue
  let buttonValue = button.innerText
  button.addEventListener("click", () => {
      if (buttonValue === firstButtonValue) {
          buttonValue = secondButtonValue
      } else if (buttonValue === secondButtonValue) buttonValue = firstButtonValue
      button.innerText = buttonValue
  })
}

export function setDisable(id, value) {
  const object = document.getElementById(id)
  if (value) object.classList.add("disabled")
  if (!value) object.classList.remove("disabled")
}

export function showPopup(message) {
  const popup = document.getElementById("popup")
  var popupTimeout
  popup.textContent = message;
  popup.classList.add("popup-shown") 
  if (popupTimeout !== null) {
    clearTimeout(popupTimeout);
  }   
  popupTimeout = setTimeout(() => {
    popup.classList.remove("popup-shown")
    popupTimeout = null;
  }, 3000);
}

export function createIconToggle(buttonId, iconId) {
  const savedTheme = localStorage.getItem("theme")
  const initTheme = savedTheme || document.body.getAttribute("data-theme") || "dark"
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  document.body.setAttribute("data-theme", initTheme);
  document.body.classList.remove("light", "dark");
  document.body.classList.add(initTheme);
  if (initTheme === "light") {
    themeIcon.src = "./assets/icons/sun.svg";
  }
  if (initTheme === "dark") {
    themeIcon.src = "./assets/icons/moon.svg";
  }
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.body.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    document.body.setAttribute("data-theme", newTheme);
    if (newTheme === "light") {
      themeIcon.src = "./assets/icons/sun.svg";
      document.body.classList.replace("dark", "light")
    }
    if (newTheme === "dark") {
      themeIcon.src = "./assets/icons/moon.svg";
      document.body.classList.replace("light", "dark")
    }
    localStorage.setItem("theme", newTheme)
  })
}