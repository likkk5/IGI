// Начальное время в секундах (1 час)
const initialTime = 3600;

// Получаем текущее время
const currentTime = Date.now();

// Получаем сохраненное время начала отсчета из localStorage
let startTime = localStorage.getItem('startTime');

// Если время старта не сохранено, устанавливаем его как текущее время
if (!startTime) {
    startTime = currentTime;
    localStorage.setItem('startTime', startTime);
} else {
    startTime = parseInt(startTime, 10);
}

// Вычисляем, сколько времени прошло с начала отсчета
let elapsedTime = Math.floor((currentTime - startTime) / 1000);

// Вычисляем оставшееся время
let remainingTime = initialTime - elapsedTime;

// Функция для форматирования времени в ЧЧ:ММ:СС
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Обновляем отображение времени
function updateCountdown() {
    const countdownElement = document.getElementById('countdown');
    
    // Если оставшееся время меньше или равно нулю
    if (remainingTime <= 0) {
        countdownElement.textContent = "Время вышло!";
        clearInterval(interval); // Останавливаем интервал
        localStorage.removeItem('startTime'); // Удаляем сохраненное время
    } else {
        countdownElement.textContent = formatTime(remainingTime);
        remainingTime--;
    }
}
// Переменная для хранения интервала
let interval;

// Функция для запуска таймера
function startTimer() {
    interval = setInterval(updateCountdown, 1000);
}

// Функция для остановки таймера
function stopTimer() {
    clearInterval(interval);
}

// Отслеживаем активность пользователя на странице
document.addEventListener("visibilitychange", function() {
    if (document.visibilityState === "visible") {
        // Если пользователь вернулся на страницу, запускаем таймер
        startTimer();
    } else {
        // Останавливаем таймер, если пользователь покидает страницу
        stopTimer();
    }
});

// Инициализируем начальное состояние и запускаем таймер
updateCountdown();
if (document.visibilityState === "visible") {
    startTimer();
}
// // Обновляем время каждую секунду
// const interval = setInterval(updateCountdown, 1000);

// // Инициализируем начальное состояние
// updateCountdown();
