class Slider {
    constructor({
        containerSelector,
        slideSelector,
        auto = true,
        stopMouseHover = true,
        delay = 5,
        loop = true,
        navs = true,
        pags = true
    }) {
        this.currentSlideIndex = 0;
        this.auto = auto;
        this.stopMouseHover = stopMouseHover;
        this.delay = delay;
        this.loop = loop;
        this.navs = navs;
        this.pags = pags;

        this.container = document.querySelector(containerSelector);
        this.slides = document.querySelectorAll(slideSelector);
        this.totalSlides = this.slides.length;
        this.slideWidth = this.slides[0].clientWidth;
        this.slideContainer = this.container.querySelector('.company-banner-slides');
        this.paginationContainer = this.container.querySelector('.pagination');
        this.autoInterval = null;

        this.init();
    }

    init() {
        this.showSlide(this.currentSlideIndex);
        this.updatePagination();

        if (this.auto) this.startAutoSlide();
        if (this.stopMouseHover) this.addHoverPause();
        if (!this.navs) this.hideNavButtons();
        if (!this.pags) this.paginationContainer.style.display = 'none';
    }

    showSlide(index) {
        if (index >= this.totalSlides) {
            this.currentSlideIndex = this.loop ? 0 : this.totalSlides - 1;
        } else if (index < 0) {
            this.currentSlideIndex = this.loop ? this.totalSlides - 1 : 0;
        } else {
            this.currentSlideIndex = index;
        }

        this.slideContainer.style.transform = `translateX(-${this.currentSlideIndex * this.slideWidth}px)`;
        this.updateSlideIndicator();
        this.updatePagination();
    }

    changeSlide(n) {
        this.showSlide(this.currentSlideIndex + n);
    }

    updatePagination() {
        this.paginationContainer.innerHTML = '';

        for (let i = 0; i < this.totalSlides; i++) {
            const pageButton = document.createElement('span');
            pageButton.classList.add('pagination-button');
            if (i === this.currentSlideIndex) pageButton.classList.add('active');
            pageButton.onclick = () => this.showSlide(i);
            this.paginationContainer.appendChild(pageButton);
        }
    }

    updateSlideIndicator() {
        const indicator = this.container.querySelector('.slide-indicator');
        indicator.innerText = `${this.currentSlideIndex + 1} / ${this.totalSlides}`;
    }

    startAutoSlide() {
        if (this.autoInterval) clearInterval(this.autoInterval);
        this.autoInterval = setInterval(() => this.changeSlide(1), this.delay * 1000);
    }

    addHoverPause() {
        this.container.addEventListener('mouseenter', () => clearInterval(this.autoInterval));
        this.container.addEventListener('mouseleave', () => this.startAutoSlide());
    }

    hideNavButtons() {
        const prevButton = this.container.querySelector('.prev');
        const nextButton = this.container.querySelector('.next');
        if (prevButton) prevButton.style.display = 'none';
        if (nextButton) nextButton.style.display = 'none';
    }

    updateDelay(newDelay) {
        this.delay = newDelay;
        this.startAutoSlide(); // Перезапуск с новым интервалом
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const slider = new Slider({
        containerSelector: '.company-banner-slideshow',
        slideSelector: '.company-banner-slide',
        auto: true,
        stopMouseHover: true,
        delay: 5,
        loop: true,
        navs: true,
        pags: true
    });

    // Навигация по стрелкам
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    prevButton.addEventListener('click', () => slider.changeSlide(-1));
    nextButton.addEventListener('click', () => slider.changeSlide(1));

    // Обновление интервала через форму
    const intervalInput = document.getElementById("rotation-interval");
    const updateButton = document.getElementById("update-interval");

    updateButton.addEventListener("click", () => {
        const newDelay = parseInt(intervalInput.value, 10);
        if (!isNaN(newDelay) && newDelay > 0) {
            slider.updateDelay(newDelay);
            alert(`Интервал обновлен: ${newDelay} секунд`);
        } else {
            alert("Введите корректное значение интервала.");
        }
    });
});
