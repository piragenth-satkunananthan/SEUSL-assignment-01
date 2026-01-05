// Shopping Cart Logic

const Cart = {
    items: [],

    init() {
        this.loadCart();
        this.updateCartCount();
    },

    loadCart() {
        const storedCart = localStorage.getItem('seusl_cart');
        if (storedCart) {
            this.items = JSON.parse(storedCart);
        }
    },

    saveCart() {
        localStorage.setItem('seusl_cart', JSON.stringify(this.items));
        this.updateCartCount();
    },

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({ ...product, quantity: 1 });
        }
        this.saveCart();
        alert(`${product.name} added to cart!`);
    },

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
    },

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = parseInt(quantity);
            if (item.quantity <= 0) {
                this.removeItem(productId);
            } else {
                this.saveCart();
            }
        }
    },

    getCartTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    getCartCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    },

    updateCartCount() {
        const badge = document.querySelector('.cart-count');
        if (badge) {
            badge.textContent = this.getCartCount();
            badge.style.display = this.getCartCount() > 0 ? 'flex' : 'none';
        }
    },

    clearCart() {
        this.items = [];
        this.saveCart();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    Cart.init();
});
