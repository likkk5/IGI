//  // Показать модальное окно при загрузке страницы
//  window.onload = function() {
//   document.getElementById("ageModal").style.display = "block";
// }

// // Закрытие модального окна
// document.getElementsByClassName("close")[0].onclick = function() {
//   document.getElementById("ageModal").style.display = "none";
// }

// // Закрытие модального окна при нажатии вне его
// window.onclick = function(event) {
//   if (event.target == document.getElementById("ageModal")) {
//       document.getElementById("ageModal").style.display = "none";
//   }
// }
document.getElementById("checkAgeButton").onclick = function() {
  const birthDateInput = document.getElementById("birthDate").value;

  if (!birthDateInput) {
      alert("Пожалуйста, введите дату рождения.");
      return;
  }

  const birthDate = new Date(birthDateInput);
  const today = new Date();
  
  // Расчет возраста
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  
  // Корректировка возраста в зависимости от месяца и дня
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }

  // Получение дня недели из даты рождения
  const daysOfWeek = ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"];
  const dayOfWeek = daysOfWeek[birthDate.getDay()];

  // Проверка возраста и отображение соответствующего сообщения
  if (age >= 18) {
      alert(`Добро пожаловать! Вы совершеннолетний. Ваш возраст: ${age} лет. Ваша дата рождения выпала на ${dayOfWeek}.`);
      document.getElementById("ageModal").style.display = "none"; // Закрыть модал
  } else {
      alert(`Вам ${age} лет. Требуется разрешение родителей для использования сайта.`);
  }
};
