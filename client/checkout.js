function checkoutView(totalPrice, totalQuantity) {
    var authData = JSON.parse(sessionStorage.getItem('auth'));

    if (authData && authData.token != null) {
        startCheckout(totalPrice, totalQuantity);
    } else {
        loadLogInContent();
    }
}

function startCheckout(totalPrice, totalQuantity){
    var avg_price = totalPrice/totalQuantity;
    $.ajax({
        url: host + '/create-checkout-session',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            price: avg_price,
            quantity: totalQuantity,
        }),
        success: function(response) {
            window.location.href = response.url;
        },
        error: function(JQxhr, status, error){
          console.log('Error when paying: ' + error)
          console.log(JQxhr)
          console.log(status)
        },
    });
    
}

function handleSuccess(){
    console.log("handle success")
    var cartData =  sessionStorage.getItem('cart')
    var buyerID = JSON.parse(sessionStorage.getItem('auth')).user
    cartData = JSON.parse(cartData);

    addPurchaceHistory(cartData, buyerID)
    removeBoughtFromDb(cartData, buyerID)
    sessionStorage.removeItem('cart')
}

function addPurchaceHistory(cartData, buyerID){
    cartData.forEach(function(item){
        addDetailsToHTML(item)
        var totalPrice = item.portionPrice * item.quantity
        postPurchase(totalPrice, item.quantity, buyerID, item.sellerID, item._id, item.dishName, function(response){
            if(!response){
                console.error("Purchase history not stored correctely")
            }
        });
    });
}

function addDetailsToHTML(item){
    getSeller(item.sellerID, function(response){
        var sellerEmail = response.email;
        var sellerName = response.name;
        var sellerNumber = response.phoneNumber;
        $('.contact-card-name').html('<strong>Name:</strong> ' + sellerName);
        $('.contact-card-number').html('<strong>Phone:</strong> ' + sellerNumber);
        $('.contact-card-email').html('<strong>Email:</strong> ' + sellerEmail);
        

    });
    
}

function removeBoughtFromDb(cartData, buyerID){
    cartData.forEach(function(item){
        getAd(item._id, function(response){
            if(item.quantity === response.quantity){
                deleteAd(item._id, buyerID);
            }else{
                var changedQuan = response.quantity - item.quantity
                putAd(item._id, changedQuan);
            }
        });
    });
}

