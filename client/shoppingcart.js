    function shoppingcartView(){
    $('.container').load('shoppingcart.html .shoppingCartCont', function(){
            var cartData = JSON.parse(sessionStorage.getItem('cart'));

            cartData.forEach(function(item) {
                if (item._id) {
                    console.log('ID:', item._id);
                } else {
                    console.log('Item does not have an _id property');
                }
            });
    createCartCards(cartData);
    });
        
    }

    function createCartCards(cartData) {
        var totQuantity = 0;
        var totPrice = 0;
        var cartCardHTML = '';
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

        if (cartData.length === 0) {
            cartCardHTML += '<p class = "cartEmptyText">Your shopping cart is empty for now, tap the arrow to start shopping!</p>';
        } else {

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
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="Images/Basket.png" id= "cartCardImg" class="img-fluid rounded-start">
                        </div>
                        <div class="col-md-8">
                            <div class="shoppingcartCard-body">
                                <h5 class="shoppingcartCard-title">${itemName}</h5>
                                <p class="shoppingcartCard-text">
                                    <span>Quantity: ${itemquantitiy}</span><br> <!-- Quantity on one row -->
                                    <span>Price: ${itemPrice}</span> <!-- Price on another row -->
                                </p>
                                <div class="removeItemBtn" type= button onclick="removeCartItem('${itemId}')">Remove item</div>                            </div>
                        </div>
                    </div>
                </div>`;
        
        });
    }
        $('.shoppingcartCards').html(cartCardHTML);
        loadRightCont(totPrice, totQuantity);
        console.log(totPrice);
    }

        function checkoutView() {

            var authData = JSON.parse(sessionStorage.getItem('auth'));

            if (authData && authData.token != null) {
                console.log("inloggad och går till checkout");
            } else {
                loadLogInContent();
            }
        }


function loadRightCont(totPrice, totQuantity) {
    var rightCardHTML = '';

    rightCardHTML += `
        <div class="shoppingcartR">
            <h1> Summary </h1>
            <p class = "paymentText">Payment Method:</p>
            <p class = "totalPrice">Total Price: ${totPrice} kr</p>
            <p class = totalQuantity>Number of dishes: ${totQuantity}</p>
                <div class = "checkoutBtn" type = button onclick="checkoutView()">Checkout</div>
            </div>
        </div>`;
        $('.shoppingcartRight').html(rightCardHTML);

}

function removeCartItem(itemId){
    var cartData = JSON.parse(sessionStorage.getItem('cart'));
    var index = cartData.findIndex(function(item) {
        return item._id === itemId;
    });

    if (index !== -1) {
        var item = cartData[index];
        item.quantity--;

        if (item.quantity <= 0) {
            cartData.splice(index, 1);
        }

        sessionStorage.setItem('cart', JSON.stringify(cartData));
        createCartCards(cartData);
    }
}


