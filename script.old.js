import Lottery from "./modules/lottery.js";
import { politicians, folk } from "./data/data.js";

const buttonStartLottery = document.querySelector(".button-start-lottery");
const lotteryResult = document.querySelector(".lottery-result");
const winningCombination = document.querySelector(".winning-combination");
const winnersMessage = document.querySelector(".winners-message");
const winners = document.querySelector(".winners");

buttonStartLottery.addEventListener("click", () => {
    lotteryResult.style.display = "none";
    buttonStartLottery.disabled = true;
    buttonStartLottery.innerHTML = "Lottery drawing in progress...";

    const lottery = new Lottery(politicians);
    lottery
        .startDrawing()
        .then((result) => {
            winningCombination.innerHTML = `Winning combination is: ${result.winningCombination}`;
            winnersMessage.innerHTML = "Winners";
            let winnersList = "";
            result.winners.forEach(winner => winnersList += `<li>${winner.getPlayerDetails()}}</li>`);
            winners.innerHTML = winnersList;
            lotteryResult.style.display = "block";
        })
        .catch((err) => {
            lotteryResult.style.display = "block";
            winningCombination.innerHTML = `Winning combination is: ${result.winningCombination}`;
            winnersMessage.innerHTML = "There are no winners.";
            console.log(err);
        })
        .finally(() => {
            buttonStartLottery.innerHTML = "Start lottery drawing";
            buttonStartLottery.disabled = false;
        });
});