const boxes = Array.from(document.querySelectorAll('.shop-section .box'));
const cartCountEl = document.querySelector('.cart-count');
const cartButton = document.querySelector('.nav-cart');
const searchInput = document.querySelector('.search-input');
const searchIcon = document.querySelector('.search-icon');
const backToTop = document.querySelector('.foot-panel1');
const toast = document.getElementById('toast');
const modal = document.getElementById('productModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const addToCartBtn = document.querySelector('.add-to-cart-btn');
const closeModalBtn = document.querySelector('.close-modal');

let cartItems = 0;
let activeProduct = null;
let toastTimeout = null;

const productData = boxes.map((box) => ({
    title: box.querySelector('h2').textContent.trim(),
    description: `Explore our ${box.querySelector('h2').textContent.trim()} collection and shop top-rated products right now.`,
    element: box,
    added: false,
}));

function showToast(message) {
    toast.textContent = message;
    toast.classList.remove('hidden');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.add('hidden'), 2600);
}

function updateCartCount() {
    cartCountEl.textContent = cartItems;
}

function addToCart(product) {
    if (product.added) {
        showToast(`${product.title} is already in cart`);
        return;
    }
    product.added = true;
    cartItems += 1;
    updateCartCount();
    product.element.classList.add('in-cart');
    showToast(`${product.title} added to cart`);
}

function openProductModal(product) {
    activeProduct = product;
    modalTitle.textContent = product.title;
    modalDescription.textContent = product.description;
    modal.classList.remove('hidden');
}

function closeModal() {
    modal.classList.add('hidden');
    activeProduct = null;
}

searchIcon.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (!query) {
        showToast('Please type something to search');
        return;
    }
    showToast(`Searching Amazon for "${query}"`);
});

searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        searchIcon.click();
    }
});

cartButton.addEventListener('click', () => {
    const message = cartItems === 0 ? 'Your cart is empty' : `You have ${cartItems} item${cartItems > 1 ? 's' : ''} in your cart`;
    showToast(message);
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Scrolling back to top');
});

addToCartBtn.addEventListener('click', () => {
    if (activeProduct) {
        addToCart(activeProduct);
    }
});

closeModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

boxes.forEach((box, index) => {
    const product = productData[index];
    box.classList.add('clickable');
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Add to cart';
    button.className = 'box-add-button';
    const actionWrapper = document.createElement('div');
    actionWrapper.className = 'box-action';
    actionWrapper.appendChild(button);
    box.querySelector('.box-content').appendChild(actionWrapper);

    box.addEventListener('click', () => openProductModal(product));
    button.addEventListener('click', (event) => {
        event.stopPropagation();
        addToCart(product);
    });
});
