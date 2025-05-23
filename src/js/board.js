export class Board {
    board

    constructor() {
        this.board = []
        for (let i = 0; i < 8; i++) {
            this.board[i] = []
            for (let j = 0; j < 8; j++) {
                this.board[i][j] = 0
            }
        }
    }

    resetBoard() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                this.board[i][j] = 0
            }
        }
    }
}

export class GameBoard extends Board {

}

export class ShipBoard extends Board {

    placeShip(posX, posY, dir, length) {
        if (dir === 0) {
            for (let i = 0; i < length; i++) {
                this.board[posY][posX + i] = 3;
            }
        } else if (dir === 1) {
            for (let i = 0; i < length; i++) {
                this.board[posY + i][posX] = 3;
            }
        }
    }

    checkFullShip(posX, posY, dir, length) {
        if (dir === 0) {
            for (let i = 0; i < length; i++) {
                if (!this.checkCell(posX + i, posY)) return false;
            }
        } else if (dir === 1) {
            for (let i = 0; i < length; i++) {
                if (!this.checkCell(posX, posY + i)) return false;
            }
        }
    }

    checkCell(PosX, PosY) {
        const directions = [
        [-1, 0], // oben
        [1, 0],  // unten
        [0, -1], // links
        [0, 1]   // rechts
        ]

        if (PosX < 0 || PosX > 7 || PosY < 0 || PosY > 7) return false;
        if (this.board[PosY][PosX] !== 0) return false;
        for (let i = 0; i < 4; i++) {
            let posX = directions[i][1] + PosX
            let posY = directions[i][0] + PosY
            if (posX >= 0 && posX < 8 && posY >= 0 && posY < 8) {
                if (this.board[posY][posX] !== 0) return false;
            }
        }
    }
}

export class HeatBoard extends Board {

    shipPlaceable(posX, posY, dir, length, gameBoard) {
        if (dir === 0) {
            if (posX + length - 1 > 7) return false;
        } else if (dir === 1) {
            if (posY + length - 1 > 7) return false;
        }
            for (let i = 0; i < length; i++) {
            if (dir === 1) {
                if (gameBoard.board[posY + i][posX] !== 0) return false;
            } else if (dir === 0) {
                if (gameBoard.board[posY][posX + i] !== 0) return false;
            }
        }
        return true;
    }

    getShipCountByIndex(index, CountFourShips, CountThreeShips, CountTwoShips) {
        let count = 0;
        switch (index) {
            case (2): {
                count = CountTwoShips;
                break;
            }
            case (3): {
                count = CountThreeShips;
                break;
            }
            case (4): {
                count = CountFourShips;
                break;
            }
        }
        return count;
    }

    placeShip(posX, posY, dir, length, CountShip) {
        for (let i = 0; i < length; i++) {
            if (dir === 1) {
                this.board[posY + i][posX] += CountShip;
            } else if (dir === 0) {
                this.board[posY][posX + i] += CountShip;
            }
        }
    }

    updateHunt(gameBoard, CountFourShips, CountThreeShips, CountTwoShips) {
    for (let i = 0; i < 2; i++) {
        for (let j = 2; j < 5; j++) {
            if (this.getShipCountByIndex(j, CountFourShips, CountThreeShips, CountTwoShips) > 0) {
                for (let k = 0; k < 8; k++) {
                    for (let l = 0; l < 8; l++) {
                        if (this.shipPlaceable(l, k, i, j, gameBoard)) {
                            this.placeShip(l, k, i, j, this.getShipCountByIndex(j, CountFourShips, CountThreeShips, CountTwoShips));
                            }
                        }
                    }
                }
            }
        }
    }

    updateTarget(gameBoard, PosX, PosY) {
        let dir = -1;
        let posX, posY;

        const directions = [
        [-1, 0], // oben
        [1, 0],  // unten
        [0, -1], // links
        [0, 1]   // rechts
        ]

        for (let i = 0; i < 4; i++) {
            directions[i][0] = PosY + directions[i][0];
            directions[i][1] = PosX + directions[i][1];
        }

        for (let i = 0; i < 4; i++) {

            if (directions[i][1] < 0 || directions[i][1] > 7 || directions[i][0] < 0 || directions[i][0] > 7) continue;

            if (gameBoard.board[directions[i][0]][directions[i][1]] === 2) {
                if (i === 0 || i === 1) dir = 1;
                else if (i === 2 || i === 3) dir = 0;
            }
        }

        if (dir === 0) {
            for (let i = 0; i < 4; i++) {
                posX = PosX + i + 1;
                if (posX > 7) continue;
                if (gameBoard.board[PosY][posX] === 1) break;
                if (gameBoard.board[PosY][posX] === 0) {
                    Board[PosY][posX] = 100;
                    break;
                }
            }
            for (let i = 0; i < 4; i++) {
                posX = PosX - i - 1;
                if (posX< 0) continue;
                if (gameBoard.board[PosY][posX] === 1) break;
                if (gameBoard.board[PosY][posX] === 0) {
                    Board[PosY][posX] = 100;
                    break;
                }
            }
        }

        if (dir === 1) {
            for (let i = 0; i < 4; i++) {
                posY = PosY + i + 1;
                if (posY > 7) continue;
                if (gameBoard.board[posY][PosX] === 1) break;
                if (gameBoard.board[posY][PosX] === 0) {
                    Board[posY][PosX] = 100;
                    break;
                }
            }
            for (let i = 0; i < 4; i++) {
                posY = PosY - i - 1;
                if (posY < 0) continue;
                if (gameBoard.board[posY][PosX] === 1) break;
                if (gameBoard.board[posY][PosX] === 0) {
                    Board[posY][PosX] = 100;
                    break;
                }
            }
        }

        if (dir === -1) {
            for (let i = 0; i < 4; i++) {
                if (directions[i][1] < 0 || directions[i][1] > 7 || directions[i][0] < 0 || directions[i][0] > 7) continue;
                if (gameBoard.board[directions[i][0]][directions[i][1]] === 0) this.board[directions[i][0]][directions[i][1]] = 100;
            }
        }
    }
}