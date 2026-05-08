document.addEventListener("DOMContentLoaded", () => {

    const cartContainer = document.getElementById("cartContainer");

    // Головна змінна кошика
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Функція відображення кошика
    function renderCart() {

        if (!cartContainer) return;

        cartContainer.innerHTML = "";

        if (cart.length === 0) {
            cartContainer.innerHTML = "<p>Ваш кошик порожній</p>";
            return;
        }

        cart.forEach(product => {

            const card = document.createElement("div");
            card.classList.add("cart-card");

            card.innerHTML = `
                <h3>${product.name}</h3>
                <p>Ціна: ${product.price} грн</p>
                <p>Кількість: ${product.quantity}</p>
            `;

            cartContainer.appendChild(card);
        });
    }
    
    // Функція додавання товару
    function addToCart(name, price) {

        const existing = cart.find(p => p.name === name);

        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({
                name: name,
                price: price,
                quantity: 1
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        // 🔄 перезавантажуємо сторінку
    location.reload();
    }

    // Кнопки "Додати до кошика"
    const buttons = document.querySelectorAll(".add-to-cart-btn");

    buttons.forEach(btn => {

        btn.addEventListener("click", () => {

            const name = btn.dataset.name;
            const price = Number(btn.dataset.price);

            if (!name || isNaN(price)) {
                console.error("Немає data-name або data-price");
                return;
            }

            addToCart(name, price);

        });

    });

    // Кнопка очистки кошика
    const clearButton = document.getElementById("clearCart");

    clearButton.addEventListener("click", () => {

        cart = [];

        localStorage.removeItem("cart");

        renderCart();

        alert("Кошик очищено!");
    });

    renderCart();

});


// Отримуємо кошик з LocalStorage
const cart = JSON.parse(localStorage.getItem("cart")) || [];

// Рахуємо кількість товарів
let totalQuantity = 0;

cart.forEach(product => {
    totalQuantity += product.quantity;
});

// Виводимо число у кружок
const cartCount = document.getElementById("cartCount");

if(cartCount){
    cartCount.textContent = totalQuantity;
}

// Функція оновлює число біля іконки кошика
function updateCartCount() {

    // Отримуємо кошик з LocalStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    let totalQuantity = 0;

    // Рахуємо кількість товарів
    cart.forEach(product => {
        totalQuantity += product.quantity;
    });

    // Знаходимо елемент кружечка
    const cartCount = document.getElementById("cartCount");

    // Оновлюємо число
    if (cartCount) {
        cartCount.textContent = totalQuantity;
    }
}
function goToCart(){
    window.location.href = "cart.html";
}
// всі слайди
const slides = document.querySelectorAll(".slide");

// кнопки
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

// поточний слайд
let currentSlide = 0;

// показ слайда
function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[index].classList.add("active");
}

// наступний
function nextSlide() {
    currentSlide++;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    showSlide(currentSlide);
}

// попередній
function prevSlide() {
    currentSlide--;

    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }

    showSlide(currentSlide);
}

// 🔘 кнопки
nextBtn.addEventListener("click", () => {
    nextSlide();
    resetAutoSlide(); // перезапуск таймера
});

prevBtn.addEventListener("click", () => {
    prevSlide();
    resetAutoSlide(); // перезапуск таймера
});

// ⏱ авто-переключення
let autoSlide = setInterval(nextSlide, 7000);

// 🔄 скидання таймера після кліку
function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextSlide, 7000);
}

// кнопка назад
document.querySelector(".prev").addEventListener("click", ()=>{

    currentSlide--;

    if(currentSlide < 0){
        currentSlide = slides.length - 1;
    }

    showSlide(currentSlide);

});


// modal
const modal = document.getElementById("productModal");

const closeModal = document.querySelector(".close-modal");

// всі товари
const productCards = document.querySelectorAll(".product-card");

// modal елементи
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const modalImage = document.getElementById("mainModalImage");

// відкриття товару
productCards.forEach(card => {

    card.addEventListener("click", () => {

        // назва
        const title = card.querySelector("h3").textContent;

        // ціна
        const price = card.querySelector(".product-price").textContent;

        // картинка
        const image = card.querySelector("img").src;

        // вставка в modal
        modalTitle.textContent = title;

        modalPrice.textContent = price;

        modalImage.src = image;

        // показуємо modal
        modal.style.display = "flex";
    });

});

// закриття
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

