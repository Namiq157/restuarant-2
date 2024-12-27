'use strict';

document.addEventListener("DOMContentLoaded", function() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartProductsList = document.getElementById('cart-products-list');
    
    function displayCartProducts() {
        cartProductsList.innerHTML = '';
        if (cartItems.length === 0) {
            const noItemsMessage = document.createElement('li');
            noItemsMessage.innerText = 'Səbətiniz boşdur';
            cartProductsList.appendChild(noItemsMessage);
        } else {
            cartItems.forEach(function(product, index) {
                const item = document.createElement('li');
                item.classList.add('cart-item');
                
                item.innerHTML = `
                    <span>${product.name} - ${product.quantity}</span>
                    <div class="quantity-controls">
                        <button class="increase" data-index="${index}">+</button>
                        <span>${product.quantity}</span>
                        <button class="decrease" data-index="${index}">-</button>
                        <button class="remove" data-index="${index}">x</button>
                    </div>
                `;
                cartProductsList.appendChild(item);
            });
        }
        updateTotalPrice();
    }

    function updateTotalPrice() {
        const totalPriceElement = document.getElementById('total-price');
        let total = 0;
        cartItems.forEach(function(item) {
            total += item.price * item.quantity;
        });
        if (totalPriceElement) {
            totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
        }
    }

    function removeProduct(index) {
        cartItems.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cartItems));
        displayCartProducts();
    }

    function decreaseQuantity(index) {
        if (cartItems[index].quantity > 1) {
            cartItems[index].quantity--;
        } else {
            removeProduct(index);
        }
        localStorage.setItem('cart', JSON.stringify(cartItems));
        displayCartProducts();
    }

    function increaseQuantity(index) {
        if (cartItems[index].quantity < 15) {
            cartItems[index].quantity++;
        }
        localStorage.setItem('cart', JSON.stringify(cartItems));
        displayCartProducts();
    }

    cartProductsList.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove')) {
            const index = event.target.getAttribute('data-index');
            removeProduct(index);
        } else if (event.target.classList.contains('decrease')) {
            const index = event.target.getAttribute('data-index');
            decreaseQuantity(index);
        } else if (event.target.classList.contains('increase')) {
            const index = event.target.getAttribute('data-index');
            increaseQuantity(index);
        }
    });

    const checkoutButton = document.getElementById('checkout-button');
    checkoutButton.addEventListener('click', function() {
        alert('Ödəniş prosesi başladıldı!');
    });

    displayCartProducts();
});
