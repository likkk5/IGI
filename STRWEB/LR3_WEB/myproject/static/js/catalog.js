document.addEventListener('DOMContentLoaded', () => {
    const itemsPerPage = 3;
    let currentPage = 1;
    const productItems = Array.from(document.querySelectorAll('.product-item'));

    function displayProducts() {
        productItems.forEach((item, index) => {
            item.style.display = (index >= (currentPage - 1) * itemsPerPage && index < currentPage * itemsPerPage) ? 'block' : 'none';
        });
        updatePagination();
    }

    function updatePagination() {
        const totalPages = Math.ceil(productItems.length / itemsPerPage);
        const paginationContainer = document.querySelector('.pagination');
        paginationContainer.innerHTML = '';

        // Кнопка "Назад"
        const prevButton = document.createElement('button');
        prevButton.classList.add('pagination-arrow');
        prevButton.textContent = '←';
        prevButton.disabled = currentPage === 1;
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                displayProducts();
            }
        });
        paginationContainer.appendChild(prevButton);

        // Кнопки страниц
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.classList.add('page-button');
            pageButton.textContent = i;
            if (i === currentPage) pageButton.classList.add('active');
            pageButton.addEventListener('click', () => {
                currentPage = i;
                displayProducts();
            });
            paginationContainer.appendChild(pageButton);
        }

        // Кнопка "Вперед"
        const nextButton = document.createElement('button');
        nextButton.classList.add('pagination-arrow');
        nextButton.textContent = '→';
        nextButton.disabled = currentPage === totalPages;
        nextButton.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                displayProducts();
            }
        });
        paginationContainer.appendChild(nextButton);
    }

    displayProducts();
});
