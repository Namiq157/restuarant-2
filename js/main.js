"use strict";

let navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    let navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLink.forEach(function (n) {
    n.addEventListener('click', linkAction);
});

let sections = document.querySelectorAll('section[id]');

function scrollActive() {
    let scrollY = window.pageYOffset;

    sections.forEach(function (current) {
        let sectionHeight = current.offsetHeight;
        let sectionTop = current.offsetTop - 50;
        let sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);

function scrollHeader() {
    let nav = document.getElementById('header');
    if (this.scrollY >= 200) nav.classList.add('scroll-header');
    else nav.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

function scrollTop() {
    let scrollTop = document.getElementById('scroll-top');
    if (this.scrollY >= 560) scrollTop.classList.add('show-scroll');
    else scrollTop.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollTop);

let themeButton = document.getElementById('theme-button');
let darkTheme = 'dark-theme';
let iconTheme = 'bx-sun';

let selectedTheme = localStorage.getItem('selected-theme');
let selectedIcon = localStorage.getItem('selected-icon');

let getCurrentTheme = function () {
    return document.body.classList.contains(darkTheme) ? 'dark' : 'light';
};
let getCurrentIcon = function () {
    return themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun';
};

if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme);
}

themeButton.addEventListener('click', function () {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});

document.querySelector('.cart-container').addEventListener('click', function () {
    window.location.href = 'cart.html';
});

document.getElementById('contact-btn').addEventListener('click', function () {
    document.getElementById('popup-window').style.display = 'flex';
});

document.getElementById('popup-window').addEventListener('click', function (event) {
    if (event.target === document.getElementById('popup-window')) {
        document.getElementById('popup-window').style.display = 'none';
    }
});

document.getElementById('call-button').addEventListener('click', function () {
    window.location.href = 'tel:0513602767';
});

let cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
let cartProductsList = document.getElementById('cart-products-list');

function displayCartProducts() {
    for (let product in cartItems) {
        let item = document.createElement('li');
        item.innerText = product + ' - ' + cartItems[product] + ' dənə';
        cartProductsList.appendChild(item);
    }
}

displayCartProducts();

document.querySelectorAll('.menu__button').forEach(function (button) {
    button.addEventListener('click', function () {
        let menuItem = this.parentElement;
        let product = {
            name: menuItem.querySelector('.menu__name').innerText,
            price: menuItem.querySelector('.menu__preci').innerText,
        };

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        let existingProduct = cart.find(function (item) {
            return item.name === product.name;
        });

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            product.quantity = 1;
            cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        let cartCountElement = document.getElementById('cart-count');
        let currentCount = parseInt(cartCountElement.innerText) || 0;
        cartCountElement.innerText = currentCount + 1;
    });
});

let signUpBtn = document.getElementById('sign-up-btn');
let authPopup = document.getElementById('auth-popup');
let closePopup = document.getElementById('close-popup');
let signUpSelect = document.getElementById('sign-up-select');
let logInSelect = document.getElementById('log-in-select');
let signUpForm = document.getElementById('sign-up-form');
let logInForm = document.getElementById('log-in-form');
let signUpSubmit = signUpForm.querySelector('button[type="submit"]');
let logInSubmit = logInForm.querySelector('button[type="submit"]');

signUpBtn.addEventListener('click', function () {
    authPopup.style.display = 'flex';
    signUpBtn.style.display = 'none';
    signUpForm.style.display = 'block';
    logInForm.style.display = 'none';
});

closePopup.addEventListener('click', function () {
    authPopup.style.display = 'none';
    signUpBtn.style.display = 'block';
});

signUpSelect.addEventListener('click', function () {
    signUpForm.style.display = 'block';
    logInForm.style.display = 'none';
});

logInSelect.addEventListener('click', function () {
    signUpForm.style.display = 'none';
    logInForm.style.display = 'block';
});

signUpSubmit.addEventListener('click', function (event) {
    event.preventDefault();
    signUpBtn.style.display = 'none';
    authPopup.style.display = 'none';
});

logInSubmit.addEventListener('click', function (event) {
    event.preventDefault();
    signUpBtn.style.display = 'none';
    authPopup.style.display = 'none';
});

document.addEventListener("DOMContentLoaded", function () {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    let cartProductsList = document.getElementById('cart-products-list');
    let totalPriceElement = document.getElementById('total-price');

    let productPrices = {};
    document.querySelectorAll('.menu__content').forEach(function (menuItem) {
        let productName = menuItem.querySelector('.menu__name').innerText;
        let productPrice = parseFloat(menuItem.querySelector('.menu__preci').innerText.replace('$', ''));
        productPrices[productName] = productPrice;
    });

    function updateLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }

    function updateTotalPrice() {
        let total = 0;
        cartItems.forEach(function (item) {
            let itemPrice = productPrices[item.name];
            if (itemPrice) {
                total += itemPrice * item.quantity;
            }
        });
        totalPriceElement.innerText = 'Ümumi məbləğ: $' + total.toFixed(2);
    }

    function displayCartProducts() {
        cartProductsList.innerHTML = '';
        if (cartItems.length === 0) {
            let noItemsMessage = document.createElement('li');
            noItemsMessage.innerText = 'Səbətiniz boşdur';
            cartProductsList.appendChild(noItemsMessage);
        } else {
            cartItems.forEach(function (product, itemIndex) {
                let item = document.createElement('li');
                item.classList.add('cart-item');

                item.innerHTML =
                    '<span>' + product.name + ' - ' + product.quantity + '</span>' +
                    '<div class="quantity-controls">' +
                    '<button class="increase" data-index="' + itemIndex + '">+</button>' +
                    '<span>' + product.quantity + '</span>' +
                    '<button class="decrease" data-index="' + itemIndex + '">-</button>' +
                    '<button class="remove" data-index="' + itemIndex + '">x</button>' +
                    '</div>';
                cartProductsList.appendChild(item);
            });
        }
        updateTotalPrice();
    }

    function removeProduct(index) {
        cartItems.splice(index, 1);
        updateLocalStorage();
        displayCartProducts();
    }

    function decreaseQuantity(index) {
        if (cartItems[index].quantity > 1) {
            cartItems[index].quantity--;
        } else {
            removeProduct(index);
        }
        updateLocalStorage();
        displayCartProducts();
    }

    function increaseQuantity(index) {
        if (cartItems[index].quantity < 15) {
            cartItems[index].quantity++;
        }
        updateLocalStorage();
        displayCartProducts();
    }

    cartProductsList.addEventListener('click',  (event) => {
        if (event.target.classList.contains('remove')) {
            let itemIndex = event.target.getAttribute('data-index');
            removeProduct(itemIndex);
        } else if (event.target.classList.contains('decrease')) {
            let itemIndex = event.target.getAttribute('data-index');
            decreaseQuantity(itemIndex);
        } else if (event.target.classList.contains('increase')) {
            let itemIndex = event.target.getAttribute('data-index');
            increaseQuantity(itemIndex);
        }
    });

    displayCartProducts();
});

let navToggle = document.getElementById("nav-toggle");
let navMenu = document.getElementById("nav-menu");

function handleNavToggle() {
    if (navToggle && navMenu) {
        if (window.innerWidth < 768) {
            navToggle.style.display = "block";

            navToggle.addEventListener('click', function () {
                navMenu.classList.toggle('show-menu');
            });
        } else {
            navToggle.style.display = "none";
            navMenu.classList.remove('show-menu');
        }
    }
}

window.addEventListener('resize', handleNavToggle);

handleNavToggle();

let viewAllMenuButton = document.getElementById("view-all-menu");
let hideMenuButton = document.getElementById("hide-menu");
let hiddenMenuItems = document.querySelectorAll(".menu__content.hidden");

if (viewAllMenuButton && hideMenuButton) {
    viewAllMenuButton.addEventListener("click", function () {
        hiddenMenuItems.forEach(function (item) {
            item.classList.remove("hidden");
        });
        viewAllMenuButton.classList.add("hidden");
        hideMenuButton.classList.remove("hidden");
    });

    hideMenuButton.addEventListener("click", function () {
        hiddenMenuItems.forEach(function (item) {
            item.classList.add("hidden");
        });
        viewAllMenuButton.classList.remove("hidden");
        hideMenuButton.classList.add("hidden");
    });
}
