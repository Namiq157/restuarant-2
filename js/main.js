'use strict';

var showMenu = function (toggleId, navId) {
    var toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId);

    if (toggle && nav) {
        toggle.addEventListener('click', function () {
            nav.classList.toggle('show-menu');
        });
    }
};
showMenu('nav-toggle', 'nav-menu');

var navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    var navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLink.forEach(function (n) {
    n.addEventListener('click', linkAction);
});

var sections = document.querySelectorAll('section[id]');

function scrollActive() {
    var scrollY = window.pageYOffset;

    sections.forEach(function (current) {
        var sectionHeight = current.offsetHeight;
        var sectionTop = current.offsetTop - 50;
        var sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);

function scrollHeader() {
    var nav = document.getElementById('header');
    if (this.scrollY >= 200) nav.classList.add('scroll-header');
    else nav.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

function scrollTop() {
    var scrollTop = document.getElementById('scroll-top');
    if (this.scrollY >= 560) scrollTop.classList.add('show-scroll');
    else scrollTop.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollTop);

var themeButton = document.getElementById('theme-button');
var darkTheme = 'dark-theme';
var iconTheme = 'bx-sun';

var selectedTheme = localStorage.getItem('selected-theme');
var selectedIcon = localStorage.getItem('selected-icon');

var getCurrentTheme = function () {
    return document.body.classList.contains(darkTheme) ? 'dark' : 'light';
};
var getCurrentIcon = function () {
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

var cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
var cartProductsList = document.getElementById('cart-products-list');

function displayCartProducts() {
    for (var product in cartItems) {
        var item = document.createElement('li');
        item.innerText = product + ' - ' + cartItems[product] + ' dənə';
        cartProductsList.appendChild(item);
    }
}

displayCartProducts();

document.querySelectorAll('.menu__button').forEach(function (button) {
    button.addEventListener('click', function () {
        var menuItem = this.parentElement;
        var product = {
            name: menuItem.querySelector('.menu__name').innerText,
            price: menuItem.querySelector('.menu__preci').innerText,
        };

        var cart = JSON.parse(localStorage.getItem('cart')) || [];

        var existingProduct = cart.find(function (item) {
            return item.name === product.name;
        });

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            product.quantity = 1;
            cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        var cartCountElement = document.getElementById('cart-count');
        var currentCount = parseInt(cartCountElement.innerText) || 0;
        cartCountElement.innerText = currentCount + 1;
    });
});

var signUpBtn = document.getElementById('sign-up-btn');
var authPopup = document.getElementById('auth-popup');
var closePopup = document.getElementById('close-popup');
var signUpSelect = document.getElementById('sign-up-select');
var logInSelect = document.getElementById('log-in-select');
var signUpForm = document.getElementById('sign-up-form');
var logInForm = document.getElementById('log-in-form');
var signUpSubmit = signUpForm.querySelector('button[type="submit"]');
var logInSubmit = logInForm.querySelector('button[type="submit"]');

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
    var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    var cartProductsList = document.getElementById('cart-products-list');
    var totalPriceElement = document.getElementById('total-price');

    var productPrices = {};
    document.querySelectorAll('.menu__content').forEach(function (menuItem) {
        var productName = menuItem.querySelector('.menu__name').innerText;
        var productPrice = parseFloat(menuItem.querySelector('.menu__preci').innerText.replace('$', ''));
        productPrices[productName] = productPrice;
    });

    function updateLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }

    function updateTotalPrice() {
        var total = 0;
        cartItems.forEach(function (item) {
            var itemPrice = productPrices[item.name];
            if (itemPrice) {
                total += itemPrice * item.quantity;
            }
        });
        totalPriceElement.innerText = 'Ümumi məbləğ: $' + total.toFixed(2);
    }

    function displayCartProducts() {
        cartProductsList.innerHTML = '';
        if (cartItems.length === 0) {
            var noItemsMessage = document.createElement('li');
            noItemsMessage.innerText = 'Səbətiniz boşdur';
            cartProductsList.appendChild(noItemsMessage);
        } else {
            cartItems.forEach(function (product, itemIndex) {
                var item = document.createElement('li');
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
});

var navToggle = document.getElementById("nav-toggle");
var navMenu = document.getElementById("nav-menu");

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

var viewAllMenuButton = document.getElementById("view-all-menu");
var hideMenuButton = document.getElementById("hide-menu");
var hiddenMenuItems = document.querySelectorAll(".menu__content.hidden");

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
