document.getElementById("reloadBtn").addEventListener("click", () => {
    location.reload();
});

let userChoice;
let computerChoice;
let isWinner = false;

let counterUserChoice = 0;
let counterComputerChoice = 0;

while (true || false) {
    // получаем выбор пользователя
    userChoice = prompt(
        'Выбирите "камень", "ножницы" или "бумага" '
    ).toLowerCase();
    console.log("userChoice: ", userChoice);

    // получаем выбор компьютера
    let randomNum = Math.floor(Math.random() * 3);
    console.log("randomNum: ", randomNum);

    switch (randomNum) {
        case 0: {
            computerChoice = "камень";
            break;
        }

        case 1: {
            computerChoice = "ножницы";
            break;
        }

        case 2: {
            computerChoice = "бумага";
            break;
        }
    }

    console.log("computerChoce: ", computerChoice);

    // проверяем выбор пользователя
    if (
        userChoice === "камень" ||
        userChoice === "ножницы" ||
        userChoice === "бумага"
    ) {
        alert(`Компьютер выбрал: ${computerChoice}`); // отображаем выбор компьютера

        if (computerChoice === userChoice) {
            alert("Ничья, играем дальше!");
        } else {
            let isUserWinner =
                (computerChoice === "ножницы" && userChoice === "камень") ||
                (computerChoice === "бумага" && userChoice === "ножницы") ||
                (computerChoice === "камень" && userChoice === "бумага");

            // условие ? если условие true : если условие false
            let message = isUserWinner ? "Ты выиграл" : "Компьютер выиграл!";

            alert(message);

            isWinner = true;
        }
    } else {
        alert('Введите корректное значение: "камень", "ножницы" или "бумага"');
    }

    if (
        (computerChoice === "ножницы" && userChoice === "камень") ||
        (computerChoice === "бумага" && userChoice === "ножницы") ||
        (computerChoice === "камень" && userChoice === "бумага")
    ) {
        counterUserChoice += 1;
        console.log(counterUserChoice);
    }

    if (
        (computerChoice === "камень" && userChoice === "ножницы") ||
        (computerChoice === "ножницы" && userChoice === "бумага") ||
        (computerChoice === "бумага" && userChoice === "камень")
    ) {
        counterComputerChoice += 1;
        console.log(counterComputerChoice);
    }

    if (counterUserChoice === 3) {
        alert("Ты настоящий чемпион! Поздравляю с победой!");
    }

    if (counterComputerChoice === 3) {
        alert("Компьютер оказался сильнее на этот раз!");
    }

    if (counterUserChoice === 3 || counterComputerChoice === 3) {
        break;
    }
}
