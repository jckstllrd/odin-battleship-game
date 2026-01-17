import { Gameboard } from "../modules/gameboard"

class Player {
    constructor(type) {
        this.type = type;
        this.gameboard = new Gameboard()
    }
}

export { Player }