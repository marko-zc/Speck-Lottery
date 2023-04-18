import Player from "./player.js";

export default class Lottery {
    constructor(people) {
        this.people = people;
        this.players = [];
        this.winningCombination = [];
    }

    getLotteryNumbers() {
        let lotteryNumbers = [];
        
        while (lotteryNumbers.length < 4) {
            const number = Math.floor(Math.random() * 7) + 1;
            if(!lotteryNumbers.includes(number)) {
            lotteryNumbers.push(number);
            }
        }

        lotteryNumbers.sort();

        return lotteryNumbers;
    }

    generatePlayers() {
        this.people.map((person) => {
            const name = person.name;
            const surname = person.surname;
            const lotteryNumbers = this.getLotteryNumbers();
            const newPlayer = new Player(name, surname, lotteryNumbers);
            this.players.push(newPlayer);
        });
    }


    getWinningCombination() {
        this.winningCombination = this.getLotteryNumbers();
    }

    startDrawing() {
        this.generatePlayers();
        this.getWinningCombination();

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const winners = this.players.filter((player) => {
                    return player.lotteryNumbers.every(
                        (value, index) => value === this.winningCombination[index]
                    );
                });

                const result = {
                    winningCombination: this.winningCombination,
                    winners,
                };

                if (winners.length > 0) {
                    resolve(result);
                } else {
                    reject(result);
                }
            }, 2000);
        });
    }
}