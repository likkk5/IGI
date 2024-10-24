// Начальное время в секундах (1 час)
const initialTime = 3600;

// Получаем оставшееся время из localStorage
let remainingTime = localStorage.getItem('remainingTime');

// Если оставшееся время не сохранено, устанавливаем его в начальное
if (!remainingTime) {
    remainingTime = initialTime;
} else {
    // Если оставшееся время есть, конвертируем его в число
    remainingTime = parseInt(remainingTime, 10);
}

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
    countdownElement.textContent = formatTime(remainingTime);

    // Если время закончилось
    if (remainingTime <= 0) {
        countdownElement.textContent = "Время вышло!";
        clearInterval(interval); // Останавливаем интервал
        localStorage.removeItem('remainingTime'); // Удаляем сохраненное время
    } else {
        // Уменьшаем оставшееся время на 1 каждую секунду
        remainingTime--;
        localStorage.setItem('remainingTime', remainingTime); // Сохраняем оставшееся время
    }
}

// Обновляем время каждую секунду
const interval = setInterval(updateCountdown, 1000);

// Инициализируем начальное состояние
updateCountdown();
