

function createGrid(containerId) {
  const container = document.getElementById(containerId)
  container.classList.add("grid")
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const cell = document.createElement("div")
      cell.classList.add("cell")
      cell.dataset.x = i + 1
      cell.dataset.y = j + 1
      cell.addEventListener("click", () => {
        console.log("Klick:")
        console.log(cell.dataset.x)
        console.log(cell.dataset.y)
        
      })
      container.appendChild(cell)
    }
  }
}

    createGrid("spieler")
    createGrid("gegner")