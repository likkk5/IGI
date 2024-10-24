let currentSlideIndex = 0;
let totalSlides = document.querySelectorAll('.company-banner-slide').length;
let auto = true;
let stopMouseHover = true;
let delay = 5; // Default delay
let autoInterval;

// Инициализация первого слайда
document.addEventListener("DOMContentLoaded", function() {
    showSlide(currentSlideIndex);
    updatePagination();
    if (auto) startAutoSlide();
});

// Показ слайда
function showSlide(index) {
    const slides = document.querySelectorAll('.company-banner-slide');
    const slideWidth = slides[0].clientWidth;
    const slideContainer = document.querySelector('.company-banner-slides');
    
    if (index >= totalSlides) {
        currentSlideIndex = loop ? 0 : totalSlides - 1;
    } else if (index < 0) {
        currentSlideIndex = loop ? totalSlides - 1 : 0;
    } else {
        currentSlideIndex = index;
    }

    slideContainer.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`;
    updateSlideIndicator();
}

// Переключение слайдов
function changeSlide(n) {
    showSlide(currentSlideIndex + n);
}

// Обновление пагинации
function updatePagination() {
    const paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = '';

    for (let i = 0; i < totalSlides; i++) {
        const pageButton = document.createElement('span');
        pageButton.innerText = i + 1;
        pageButton.onclick = () => showSlide(i);
        paginationContainer.appendChild(pageButton);
    }
}

// Обновление индикатора слайдов
function updateSlideIndicator() {
    const indicator = document.querySelector('.slide-indicator');
    indicator.innerText = `${currentSlideIndex + 1} / ${totalSlides}`;
}

// Автопрокрутка
function startAutoSlide() {
    if (autoInterval) clearInterval(autoInterval);
    autoInterval = setInterval(() => {
        changeSlide(1);
    }, delay * 1000);
}

// Установка задержки
function setDelay() {
    const input = document.getElementById('delayInput');
    delay = parseInt(input.value) || 5; // Установить значение или 5 по умолчанию
    if (auto) startAutoSlide(); // Перезапуск автопрокрутки с новой задержкой
}

// Остановка автопрокрутки при наведении
if (stopMouseHover) {
    const slideshowContainer = document.querySelector('.company-banner-slideshow');
    slideshowContainer.addEventListener('mouseenter', () => {
        clearInterval(autoInterval);
    });
    slideshowContainer.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
}
