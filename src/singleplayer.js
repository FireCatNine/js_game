import {createGrid} from "./util.js"
import {createToggle} from "./util.js"
import {setDisable} from "./util.js"
import {showPopup} from "./util.js"
import {createIconToggle} from "./util.js"

function prepare() {
    setDisable("spieler", true)
    setDisable("gegner", true)
    const startButton = document.getElementById("startButton")
    startButton.addEventListener("click", prepareGame)
}


function prepareGame() {
    const twoShips = document.getElementById("ships2")
    const threeShips = document.getElementById("ships3")
    const fourShips = document.getElementById("ships4")
    if (twoShips.checkValidity() && threeShips.checkValidity() && fourShips.checkValidity()) {
        const diffToggle = document.getElementById("diffToggle")
        let diff // 0 = Einfach 1 = Normal
        if (diffToggle.innerText === "Schwierigkeit: Einfach") diff = 0
        if (diffToggle.innerText === "Schwierigkeit: Normal") diff = 1
        startGame(parseInt(twoShips.value), parseInt(threeShips.value), parseInt(fourShips.value), diff)
        setDisable("spieler", false)
        setDisable("gegner", false)
        setDisable("settings", true)
        setDisable("diff", true)
    } else showPopup("Fehler, bitte fülle alle Felder aus")
}

function startGame(CountTwoShips, CountThreeShips, CountFourShips, Difficulty) {

}

createGrid("spieler")
createGrid("gegner")
createToggle("diffToggle", "Schwierigkeit: Normal", "Schwierigkeit: Einfach")
createIconToggle("themeToggle", "themeIcon")
prepare()