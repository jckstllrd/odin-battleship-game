import "./styles.css"
import { gameController } from "./modules/gameController"

gameController.runGame()
let doc = document.querySelector("h1")

doc.addEventListener("click", () => {
    console.log('hovering')
})

