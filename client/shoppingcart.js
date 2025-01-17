function shoppingcartView() {
    $('.container').load('shoppingcart.html .shoppingCartCont', function() {
        var cartData = JSON.parse(sessionStorage.getItem('cart'));
        createCartCards(cartData);
    });
}

function createCartCards(cartData) {
    var totQuantity = 0;
    var totPrice = 0;
    var cartCardHTML = '';


    if (!cartData || cartData.length === 0) {
        cartCardHTML += `
            <h1>Shopping Cart</h1>
            <div class="col-lg-7">
                <h5 class="mb-3">
                    <button class="btn btn-outline-primary continue-shopping" onclick="homeview()">
                        <span class="arrow-left">&#8592;</span> Start Shopping
                    </button>
                    <p class="cartEmptyText">Your shopping cart is empty for now, tap the arrow to start shopping!</p>
                </h5>
            </div>
        `;
    } else {
        cartCardHTML += `
            <h1>Shopping Cart</h1>
            <div class="col-lg-7">
                <h5 class="mb-3">
                    <button class="btn btn-outline-primary continue-shopping" onclick="homeview()">
                        <span class="arrow-left">&#8592;</span> Continue Shopping
                    </button>
                </h5>
            </div>
        `;

        cartData.forEach(function(item) {
            var itemName = item.dishName;
            var itemPrice = item.portionPrice;
            var itemImage = item.imagePath;
            var itemquantitiy = item.quantity;
            var itemId = item._id;
            totPrice = (item.portionPrice * itemquantitiy) + totPrice;
            totQuantity = item.quantity + totQuantity;


            cartCardHTML += `
                <div class="shoppingcartCard mb-3" id="shoppingcartCard" style="max-width: 540px;">
                <button class="removeCartItemBtn" type="button" onclick="editCartQuantity('${itemId}', 'removeAll')">X</button>
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="data:image/png;base64,${itemImage}" class="shoppingcart-img" alt="Food Image">
                        </div>
                        <div class="col-md-8">
                            <div class="shoppingcartCard-body">
                                <h5 class="shoppingcartCard-title">${itemName}</h5>
                                <div class="quantity-price-container">
                                    <div class="changeQuantityBtns">
                                        <span class="quantity-label">Quantity: </span>
                                        <div class="removeItemBtn" type="button" onclick="editCartQuantity('${itemId}', 'remove')">-</div> 
                                        <span class="quantity-number">${itemquantitiy}</span>
                                        <div class="addItemBtn" type="button" onclick="editCartQuantity('${itemId}', 'add')">+</div>
                                        <p id="quantityError" style="color: black; display: none;">Already max quantity</p>  
                                    </div>
                                    <span class="price-label">Price per dish: ${itemPrice} kr</span>
                                    <br>
                                    <span class="price-label">Total price: ${itemPrice * itemquantitiy} kr</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
        });
    }

    $('.shoppingcartCards').html(cartCardHTML);
    loadRightCont(totPrice, totQuantity, cartData);
}

function loadRightCont(totPrice, totQuantity, cartData) {
    var rightCardHTML = '';

    rightCardHTML += `
        <div class="shoppingcartR">
            <h1> Summary </h1>
            <p class="paymentText">Payment Methods:</p>
            <img src="Images/Visa.png" id="cartPaymentImg" class="img-fluid rounded-start">
            <img src="Images/MasterCard.png" id="cartPaymentImg" class="img-fluid rounded-start">
            <img src="Images/AmEx.png" id="cartPaymentImg" class="img-fluid rounded-start">
            <img src="Images/Link.png" id="cartPaymentImg" class="img-fluid rounded-start">
            <p class="totalPrice">Total Price: ${totPrice} kr</p>
            <p class="totalQuantity">Number of dishes: ${totQuantity}</p>
            <button class="checkoutBtn" onclick="checkoutView('${totPrice}', '${totQuantity}')" ${!cartData || cartData.length === 0 ? 'disabled' : ''}>Checkout</button>
        </div>
    </div>`;

    $('.shoppingcartRight').html(rightCardHTML);
}

function editCartQuantity(itemId, action) {
    getAd(itemId, function(ad) {
        var maxItemQuant = ad.quantity;

        var cartData = JSON.parse(sessionStorage.getItem('cart'));
        var index = cartData.findIndex(function(item) {
            return item._id === itemId;
        });

        if (index !== -1) {
            var item = cartData[index];
            if (action === 'remove') {
                item.quantity--;
                if (item.quantity <= 0) {
                    cartData.splice(index, 1);
                }
            } else if (action === 'add' && item.quantity < maxItemQuant) {
                item.quantity++;
            } else if (action === 'removeAll') {
                cartData.splice(index, 1);
            } else if (action === 'removeAll') {
                cartData.splice(index, 1);
            }
            sessionStorage.setItem('cart', JSON.stringify(cartData));
            createCartCards(cartData);
        }
    });
}


