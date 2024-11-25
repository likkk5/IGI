window.addEventListener('scroll', () => {
    const car = document.getElementById('car-front');
    const buyer = document.querySelector('.buyer');
    const seller = document.querySelector('.seller');
    const scrollY = window.scrollY;

    // Увеличиваем масштаб автомобиля и смещаем его вверх по мере прокрутки вниз
    if (scrollY > 50) {
        // Масштабируем и поднимаем машину
        car.style.transform = `scale(${0.5 + scrollY / 1000}) translateY(-${scrollY / 10}px)`;

        // Сдвигаем покупателя и продавца к центру по мере прокрутки
        buyer.style.transform = `translateX(${scrollY / 10}px)`; // Сдвиг покупателя вправо
        seller.style.transform = `translateX(-${scrollY / 10}px)`; // Сдвиг продавца влево
    } else {
        // Возвращаем исходное положение, когда прокрутка ниже 50px
        car.style.transform = 'scale(0.5) translateY(0)';
        buyer.style.transform = 'translateX(0)';
        seller.style.transform = 'translateX(0)';
    }
});
