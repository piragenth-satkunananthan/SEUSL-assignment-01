// Script for SEUSL Coffee Website

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Scroll Animation
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Menu Filtering
    const filterButtons = document.querySelectorAll('.menu-filters .btn');
    const menuItems = document.querySelectorAll('.menu-item');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => {
                    btn.classList.remove('btn-primary');
                    btn.classList.add('btn-outline');
                });

                // Add active class to clicked button
                button.classList.remove('btn-outline');
                button.classList.add('btn-primary');

                const filterValue = button.textContent.trim();

                menuItems.forEach(item => {
                    // For demo purposes, we'll use simple text matching or show all
                    // In a real app, items would have data-category attributes
                    // Here we will simulate it based on the button text

                    if (filterValue === 'All') {
                        item.style.display = 'block';
                    } else if (filterValue === 'Hot Coffee') {
                        // Show Espresso, Cappuccino, Latte, Mocha
                        const title = item.querySelector('.menu-title').textContent;
                        if (['Espresso', 'Cappuccino', 'Cafe Latte', 'Caffe Mocha'].includes(title)) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    } else if (filterValue === 'Cold Brews') {
                        // Show Iced Coffee, Frappe
                        const title = item.querySelector('.menu-title').textContent;
                        if (['Iced Coffee', 'Caramel Frappe'].includes(title)) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    } else if (filterValue === 'Pastries') {
                        // No pastries in the current HTML list, so hide all
                        item.style.display = 'none';
                    }
                });
                // Add to Cart Buttons
                const addToCartButtons = document.querySelectorAll('.add-to-cart');
                if (addToCartButtons.length > 0) {
                    addToCartButtons.forEach(button => {
                        button.addEventListener('click', () => {
                            const product = {
                                id: button.dataset.id,
                                name: button.dataset.name,
                                price: parseFloat(button.dataset.price)
                            };
                            Cart.addItem(product);
                        });
                    });
                }
            });
        });
    }
});
