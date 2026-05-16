
document.addEventListener("DOMContentLoaded", () => {
    // ================= КОШИК =================
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    function formatPrice(price) {
    return Number(price).toLocaleString("uk-UA") + " грн";
}

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
        showToast(`${name} додано у кошик`);
        updateCartCount();
    }

    function updateCartCount() {
        const cartCount = document.getElementById("cartCount");
        if (!cartCount) return;

        let totalQuantity = 0;
        cart.forEach(product => {
            totalQuantity += product.quantity;
        });

        cartCount.textContent = totalQuantity;
    }

    function addToCart(name, price, image = "cart.png", oldPrice = null) {

    const existing = cart.find(p => p.name === name);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: Number(price),
            oldPrice: oldPrice ? Number(oldPrice) : null,
            quantity: 1,
            image: image
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    showToast(name + " додано у кошик");
}             

    // ================= TOAST =================

function showToast(text) {

    const container = document.getElementById("toastContainer");

    if (!container) return;

    const toast = document.createElement("div");

    toast.classList.add("toast");

    toast.textContent = text;

    // додаємо на сторінку
    container.appendChild(toast);

    // видаляємо через 4 секунди
    setTimeout(() => {

        toast.remove();

    }, 4000);
}

    function renderCart() {
    const cartContainer = document.getElementById("cartContainer");
    if (!cartContainer) return;

    const itemsCount = document.getElementById("itemsCount");
    const subtotalElement = document.getElementById("subtotal");
    const discountElement = document.getElementById("discount");
    const totalPriceElement = document.getElementById("totalPrice");

    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <h3>Ваш кошик порожній</h3>
                <p>Додайте товари з каталогу, щоб оформити замовлення.</p>
                <a href="index.html">Перейти до покупок</a>
            </div>
        `;

        if (itemsCount) itemsCount.textContent = "0";
        if (subtotalElement) subtotalElement.textContent = "0 грн";
        if (discountElement) discountElement.textContent = "0 грн";
        if (totalPriceElement) totalPriceElement.textContent = "0 грн";

        return;
    }

    let subtotal = 0;
    let totalItems = 0;

    cart.forEach((product, index) => {
        subtotal += product.price * product.quantity;
        totalItems += product.quantity;

        const card = document.createElement("div");
        card.classList.add("cart-card");

        card.innerHTML = `
            <img src="${product.image || "cart.png"}" alt="${product.name}">

            <div class="cart-info">
                <h3>${product.name}</h3>
                <p>Кількість: ${product.quantity}</p>
                ${
    product.oldPrice && product.oldPrice > product.price
    ? `
        <p class="cart-old-price">
            ${formatPrice(product.oldPrice * product.quantity)}
        </p>

        <p class="cart-price">
            ${formatPrice(product.price * product.quantity)}
        </p>

        <span class="cart-discount-badge">
            Знижка ${formatPrice((product.oldPrice - product.price) * product.quantity)}
        </span>
    `
    : `
        <p class="cart-price">
            ${formatPrice(product.price * product.quantity)}
        </p>
    `
}
            </div>

            <div class="cart-actions">
                <div class="quantity-control">
                    <button class="qty-btn minus-btn" data-index="${index}">−</button>
                    <span>${product.quantity}</span>
                    <button class="qty-btn plus-btn" data-index="${index}">+</button>
                </div>

                <button class="remove-btn" data-index="${index}">
                    Видалити
                </button>
            </div>
        `;

        cartContainer.appendChild(card);
    });

    let discount = 0;

cart.forEach(product => {
    if (product.oldPrice && product.oldPrice > product.price) {
        discount += (product.oldPrice - product.price) * product.quantity;
    }
});

const total = subtotal;

    if (itemsCount) itemsCount.textContent = totalItems;
    if (subtotalElement) subtotalElement.textContent = formatPrice(subtotal);
    if (discountElement) discountElement.textContent = formatPrice(discount);
    if (totalPriceElement) totalPriceElement.textContent = formatPrice(total);

    document.querySelectorAll(".plus-btn").forEach(button => {
        button.addEventListener("click", () => {
            const index = button.dataset.index;
            cart[index].quantity += 1;

            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
            updateCartCount();
        });
    });

    document.querySelectorAll(".minus-btn").forEach(button => {
        button.addEventListener("click", () => {
            const index = button.dataset.index;

            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            } else {
                cart.splice(index, 1);
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
            updateCartCount();
        });
    });

    document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", () => {
            const index = button.dataset.index;

            cart.splice(index, 1);

            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
            updateCartCount();
        });
    });
}
renderCart();
updateCartCount();
const clearButton = document.getElementById("clearCart");

if (clearButton) {
    clearButton.addEventListener("click", () => {
        cart = [];

        localStorage.setItem("cart", JSON.stringify(cart));

        renderCart();
        updateCartCount();
    });
}

    // Перехід у кошик
    window.goToCart = function () {
        window.location.href = "cart.html";
    };

    // ================= СЛАЙДЕР БАНЕРА =================
    const slides = document.querySelectorAll(".slide");
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");

    let currentSlide = 0;
    let autoSlide;

    function showSlide(index) {
        if (slides.length === 0) return;

        slides.forEach(slide => slide.classList.remove("active"));
        slides[index].classList.add("active");
    }

    function nextSlide() {
        if (slides.length === 0) return;

        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        showSlide(currentSlide);
    }

    function prevSlide() {
        if (slides.length === 0) return;

        currentSlide--;

        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }

        showSlide(currentSlide);
    }

    function resetAutoSlide() {
        clearInterval(autoSlide);
        autoSlide = setInterval(nextSlide, 7000);
    }

    if (nextBtn && prevBtn && slides.length > 0) {
        nextBtn.addEventListener("click", () => {
            nextSlide();
            resetAutoSlide();
        });

        prevBtn.addEventListener("click", () => {
            prevSlide();
            resetAutoSlide();
        });

        autoSlide = setInterval(nextSlide, 7000);
    }

    // ================= POPUP ТОВАРУ =================
    const modal = document.getElementById("productModal");
    const closeModal = document.querySelector(".close-modal");
    const modalTitle = document.getElementById("modalTitle");
    const modalPrice = document.getElementById("modalPrice");
    const modalDescription = document.getElementById("modalDescription");
    const mainModalImage = document.getElementById("mainModalImage");
    const modalSmallImages = document.getElementById("modalSmallImages");
    const modalCartButton = document.querySelector(".modal-cart-btn");
    const productCards = document.querySelectorAll(".product-card");

    document.querySelectorAll(".product-price").forEach(priceElement => {

    const price = parseInt(priceElement.textContent);

    priceElement.textContent = formatPrice(price);

});

    function getImagesFromCard(card) {
        // Якщо в HTML є data-images — беремо картинки звідти
        if (card.dataset.images) {
            return card.dataset.images.split(",").map(image => image.trim());
        }

        // Якщо data-images немає — беремо головну картинку товару
        const image = card.querySelector("img");
        return image ? [image.getAttribute("src")] : [];
    }

    function openProductModal(card) {
        if (!modal) return;

        const title = card.querySelector("h3")?.textContent || "Товар";
        const priceText = card.querySelector(".product-price")?.textContent || "Ціна не вказана";
        const price = card.querySelector(".add-to-cart-btn")?.dataset.price || "0";
        const description = card.dataset.description || `Детальна інформація про товар: ${title}.`;
        const images = getImagesFromCard(card);

        modalTitle.textContent = title;
        modalPrice.textContent = priceText;
        modalDescription.textContent = description;

        modalCartButton.dataset.name = title;
        modalCartButton.dataset.price = price;
        modalCartButton.dataset.image = images[0];

        const oldPrice = card.querySelector(".product-price")?.dataset.oldPrice || "";

        modalCartButton.dataset.oldPrice = oldPrice;

        mainModalImage.src = images[0];
        mainModalImage.alt = title;
        modalSmallImages.innerHTML = "";

        images.forEach((image, index) => {
            const smallImage = document.createElement("img");
            smallImage.src = image;
            smallImage.alt = `${title} ${index + 1}`;

            if (index === 0) {
                smallImage.classList.add("active-small-image");
            }

            smallImage.addEventListener("click", event => {
                event.stopPropagation();

                mainModalImage.src = image;

                document.querySelectorAll(".modal-small-images img").forEach(img => {
                    img.classList.remove("active-small-image");
                });

                smallImage.classList.add("active-small-image");
            });

            modalSmallImages.appendChild(smallImage);
        });

        modal.style.display = "flex";
    }

    productCards.forEach(card => {
        card.addEventListener("click", () => {
            openProductModal(card);
        });
    });
    /* ================= КНОПКИ ДОДАТИ В КОШИК ================= */

const addButtons = document.querySelectorAll(".add-to-cart-btn");

addButtons.forEach(button => {

    button.addEventListener("click", event => {

        // НЕ відкривати popup
        event.stopPropagation();

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const productCard = button.closest(".product-card");

        const image = productCard
            ? productCard.querySelector("img").src
            : "cart.png";

        const oldPrice = productCard
    ? productCard.querySelector(".product-price")?.dataset.oldPrice
    : null;

addToCart(name, price, image, oldPrice);

    });

});

    if (closeModal) {
        closeModal.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    if (modal) {
        /* ================= POPUP КНОПКА ================= */

if (modalCartButton) {

    modalCartButton.addEventListener("click", event => {

        event.stopPropagation();

        const name = modalCartButton.dataset.name;
        const price = Number(modalCartButton.dataset.price);
        const image = modalCartButton.dataset.image || "cart.png";

        const oldPrice = modalCartButton.dataset.oldPrice || null;

addToCart(name, price, image, oldPrice);

    });

}
        modal.addEventListener("click", event => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    }
});



const themeToggle = document.getElementById("themeToggle");

function applyTheme() {

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {

        document.body.classList.add("light-theme");

        if (themeToggle) {
            themeToggle.textContent = "🌙";
        }

    } else {

        document.body.classList.remove("light-theme");

        if (themeToggle) {
            themeToggle.textContent = "☀️";
        }
    }

    // зміна картинки кошика
    const cartImage = document.getElementById("cartImage");

    if (cartImage) {

        if (savedTheme === "light") {
            cartImage.src = "cart-dark.png";
        } else {
            cartImage.src = "cart.png";
        }

    }
}

applyTheme();

if (themeToggle) {

    themeToggle.addEventListener("click", (event) => {

        event.stopPropagation();

        if (document.body.classList.contains("light-theme")) {

            localStorage.setItem("theme", "dark");

        } else {

            localStorage.setItem("theme", "light");
        }

        applyTheme();

    });

}