// Show mobile menu

const mobileBar = document.getElementById('bar');
const navbar = document.getElementById('navbar');
const closeButton = document.getElementById('close');

mobileBar.addEventListener('click', () => {
    navbar.classList.add('active');
})

closeButton.addEventListener('click', () => {
    navbar.classList.remove('active');
})

// Cart functionality
let cart = JSON.parse(localStorage.getItem('CART')) || [];
const items = document.getElementsByClassName('product');
const addButtons = Array.from(document.getElementsByClassName('add-btn'));

// Empty cart

const emptyCart = () => {
    document.getElementsByClassName('cart-row')[0].classList.add('hidden');
    document.getElementsByClassName('cart-total')[0].classList.add('hidden');
    document.getElementsByClassName('btn-purchase')[0].classList.add('hidden');
    document.querySelector('h4').classList.remove('hidden');
}

// Checking if item is already in cart
const updateItemsInCart = (itemToCart) => {
    existingItem = cart.find(item => item.id === itemToCart.id);
    if (existingItem) {
        existingItem.quantity += 1;
        console.log(existingItem.quantity);
        console.log('Item is already in the cart');
    } else {
        cart.push(itemToCart);
    }
    localStorage.setItem('CART', JSON.stringify(cart))
}


// Adding item to cart
addButtons.forEach(addButton => {
    addButton.addEventListener('click', (event) => {
        let shopItem = addButton.parentElement;
        let id = shopItem.id;
        let title = shopItem.querySelector('h5').innerText;
        let price = shopItem.querySelector('h4').innerText;
        let imageSrc = shopItem.querySelector('img').src;
        let quantity = 1;
        let itemToCart = {
            id,
            title,
            price,
            imageSrc,
            quantity
        }
        updateItemsInCart(itemToCart);
    })
})


if (window.location.href.indexOf('cart') > -1) {
    const parentElement = document.getElementsByClassName('cart-items')[0];
    const totalPrice = document.getElementsByClassName('cart-total-price')[0];

    // Updating Cart Page HTML
    const updateShoppingCartHTML = () => {
        if (cart.length > 0) {
            let result = cart.map(item => {
                return `
                <div class="cart-row" id=cart-${item.id}>
                <div class="cart-item cart-column">
        <img src="${item.imageSrc}" width="100" height="100">
        <span class="cart-item-title">${item.title}</span>
    </div>
    <span class="cart-price cart-column">${item.price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="${item.quantity}">
        <button type="button" class="btn-danger btn">REMOVE</button>
    </div>
    </div>
    `
            })
            parentElement.innerHTML = result.join('');
            document.getElementsByClassName('btn-purchase')[0].classList.remove('hidden');
            document.querySelector('h4').classList.add('hidden');
            document.getElementsByClassName('cart-row')[0].classList.remove('hidden');
            document.getElementsByClassName('cart-total')[0].classList.remove('hidden');
        }
        localStorage.setItem('CART', JSON.stringify(cart))
    }

    // Updating cart total
    const updateCartTotal = () => {
        let cartRows = Array.from(parentElement.getElementsByClassName('cart-row'));
        let total = 0;
        if (cartRows) {
            cartRows.forEach(cartRow => {
                let priceElement = cartRow.getElementsByClassName('cart-price')[0];
                let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
                let price = parseFloat(priceElement.innerText.replace('$', ''));
                let quantity = quantityElement.value;
                total = total + (price * quantity);
            })
            total = Math.round(total * 100) / 100;
            totalPrice.innerText = `$${total}`;
        }
    }

    // Removing item from cart
    parentElement.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-danger')) {
            let button = event.target;
            let cartRow = button.parentElement.parentElement;
            cartRow.remove();
            updateCartTotal();
            cart = cart.filter(item => item.id !== cartRow.id.charAt(5) + cartRow.id.charAt(6));
            localStorage.setItem('CART', JSON.stringify(cart));
            if (cart.length < 1) {
                emptyCart();
            }
        }
    })

    // Changing total after input change
    const inputChangeFunctionality = () => {
        let quantityInputs = Array.from(document.getElementsByClassName('cart-quantity-input'));
        quantityInputs.forEach(input => {
            input.addEventListener('change', (event) => {
                let selectedInput = event.target;
                let cartRow = selectedInput.parentElement.parentElement;
                let id = cartRow.id.charAt(5) + cartRow.id.charAt(6);
                if (isNaN(input.value) || input.value < 1) {
                    input.value = 1;
                }
                updateCartTotal();
                cart.forEach(item => {
                    if (item.id === id) {
                        item.quantity = Number(selectedInput.value);
                        localStorage.setItem('CART', JSON.stringify(cart));
                        return;
                    }
                })
            })
        })
    }

    updateShoppingCartHTML();
    inputChangeFunctionality();
    updateCartTotal();

    // Removing items after purchase buttom
    const purchaseClicked = () => {
        alert('Thank you for your purchase');
        let cartItems = document.getElementsByClassName('cart-items')[0];
        while (cartItems.hasChildNodes()) {
            cartItems.removeChild(cartItems.firstChild);
        }
        totalPrice.innerText = '$0';
        localStorage.removeItem('CART');
        emptyCart();
    }

    const purchaseButton = document.getElementsByClassName('btn-purchase')[0];
    if (purchaseButton) {
        purchaseButton.addEventListener('click', purchaseClicked)
    };
}
