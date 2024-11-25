// Функция для синтеза речи
function speakText(text) {
    let msg = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(msg);
}

// Функция для получения геолокации
function getGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            // Выводим координаты в консоль или показываем на странице
            console.log(`Широта: ${latitude}, Долгота: ${longitude}`);
            alert(`Ваши координаты: Широта: ${latitude}, Долгота: ${longitude}`);
        }, function(error) {
            alert("Ошибка получения местоположения: " + error.message);
        });
    } else {
        alert("Геолокация не поддерживается этим браузером.");
    }
}

// // Функция для получения информации о батарее с помощью синтеза речи
// function getBatteryStatus() {
//     if ("getBattery" in navigator) {
//         navigator.getBattery().then(function(battery) {
//             // Уровень заряда батареи
//             const batteryLevel = battery.level * 100;
//             // Статус зарядки
//             const chargingStatus = battery.charging ? "Зарядка идет" : "Не заряжается";
//             // Время до разрядки или зарядки
//             const timeLeft = battery.charging ? battery.chargingTime : battery.dischargingTime;

//             // Выводим информацию в консоль
//             console.log(`Уровень заряда батареи: ${batteryLevel}%`);
//             console.log(`Статус зарядки: ${chargingStatus}`);
//             console.log(`Оставшееся время: ${timeLeft} секунд`);

//             // Можно использовать синтез речи, чтобы озвучить информацию о батарее
//             speakText(`Уровень заряда батареи: ${batteryLevel} процентов.`);
//             speakText(`Статус зарядки: ${chargingStatus}.`);

//             // Выводим предупреждение, если батарея низкая
//             if (batteryLevel < 20 && !battery.charging) {
//                 alert("Уровень заряда батареи низкий, подключите устройство к зарядному устройству.");
//             }
//         });
//     } else {
//         console.log("API батареи не поддерживается этим браузером.");
//     }
// }
// Функция для получения информации о батарее
function getBatteryStatus() {
    if ("getBattery" in navigator) {
        navigator.getBattery().then(function(battery) {
            // Уровень заряда батареи
            const batteryLevel = battery.level * 100;
            // Статус зарядки
            const chargingStatus = battery.charging ? "Зарядка идет" : "Не заряжается";
            // Время до разрядки или зарядки
            const timeLeft = battery.charging ? battery.chargingTime : battery.dischargingTime;

            // Логируем информацию о батарее в консоль
            console.log(`Уровень заряда батареи: ${batteryLevel}% (${chargingStatus})`);
            console.log(`Время до ${chargingStatus === "Зарядка идет" ? "полного заряда" : "выключения"}: ${Math.floor(timeLeft / 60)} минут`);
            alert(`Уровень заряда батареи: ${batteryLevel}% (${chargingStatus})`);
            // alert(`Время до ${chargingStatus === "Зарядка идет" ? "полного заряда" : "выключения"}: ${Math.floor(timeLeft / 60)} минут`);
            // Выводим предупреждение, если батарея низкая
            if (batteryLevel < 20 && !battery.charging) {
                alert("Уровень заряда батареи низкий, подключите устройство к зарядному устройству.");
            }
        }).catch(function(error) {
            console.log("Ошибка получения информации о батарее: ", error);
        });
    } else {
        console.log("API батареи не поддерживается этим браузером.");
    }
}

window.addEventListener('load', function() {
    const companyTitle = document.querySelector('.company-title');
    const description = document.querySelector('.company-description');
    
    if (companyTitle && description) {
        // Озвучиваем название компании и описание
        speakText("Добро пожаловать в " + companyTitle.innerText);
        speakText(description.innerText);
    }
    
    // Получаем местоположение пользователя
    getGeolocation();

    // Получаем статус батареи
    getBatteryStatus();
});
