const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');

const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');
const newGameButton = document.querySelector('.newGame');

const minNumberInput = document.querySelector('.minNumber');
const maxNumberInput = document.querySelector('.maxNumber');

//инициализация переменных максимального и минимального числа, попыток угадывания и случайный выбор числа для угадывания
let guessCount = 0;
let failedAttempts = 0;
let minNumber = 1;
let maxNumber = 100;
let randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;

//Обработка изменений минимального и максимального чисел с проверкой на их адекватность
minNumberInput.addEventListener('change', () => {
    minNumber = parseInt(minNumberInput.value);
    if (minNumber >= maxNumber) {
        minNumber = maxNumber - 1;
        minNumberInput.value = minNumber;
    }
});

maxNumberInput.addEventListener('change', () => {
    maxNumber = parseInt(maxNumberInput.value);
    if (maxNumber <= minNumber) {
        maxNumber = minNumber + 1;
        maxNumberInput.value = maxNumber;
    }
});


//Проверяем угадал ли пользователь число
function checkGuess() {
    const userGuess = Number(guessField.value);

    //Если пользователь ввел некорректное число то просим ввести заново
    if (userGuess < minNumber || userGuess > maxNumber) {
        alert('Пожалуйста, введите число в пределах диапазона от ' + minNumber + ' до ' + maxNumber);
        guessField.value = '';
        return;
    }
    //И записываем введенный результат в список неудачных попыток
    guessCount++;
    guesses.textContent += `${userGuess} `;

    //Если пользователь угадал то поздравляем его и завершаем игру
    if (userGuess === randomNumber) {
        lastResult.textContent = 'Поздравляем! Вы угадали число!';
        lastResult.style.backgroundColor = 'rgb(12, 190, 12)';
        lowOrHi.textContent = '';
        setGameOver();
    } 
    else {
        //Если проиграл то уведомляем его об этом и даем информацию о последнем предположении
        lastResult.textContent = 'Неправильно!';
        lastResult.style.backgroundColor = 'red';
        if (userGuess < randomNumber) {
            lowOrHi.textContent = 'Последнее предположение было слишком маленьким!';
        } else if (userGuess > randomNumber) {
            lowOrHi.textContent = 'Последнее предположение было слишком большим!';
        }
        //Каждые три неудачные попытки даем пользователю подсказку о том, является ли число четным или нечетным
        if (guessCount % 3 === 0) {
            failedAttempts++;
            if (randomNumber % 2 === 0) {
                lowOrHi.textContent += ` Загаданное число четное. Это ${failedAttempts} подсказка.`;
            } else {
                lowOrHi.textContent += ` Загаданное число нечетное. Это ${failedAttempts} подсказка.`;
            }
        }
    }

    guessField.value = '';
    guessField.focus();
}

//Проверку производим по клику на кнопку "отправить предположение"
guessSubmit.addEventListener('click', checkGuess);

//При окончании игры дисейблим поле ввода и кнопку проверки числа
function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
}

//При начале новой игры 
newGameButton.addEventListener('click', () => {
    //Сбрасываем попытки, отчищаем поля с прошлой игры
    guessCount = 0;
    const resetParas = document.querySelectorAll('.resultParas p');
    for (let i = 0; i < resetParas.length; i++) {
        resetParas[i].textContent = '';
    }
    //Даем доступ к взаимодействию
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();
    
    lastResult.style.backgroundColor = 'inherit';
    //Загадываем новое число
    randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
});



