function checkoutView(totalPrice, totalQuantity) {
    var authData = JSON.parse(sessionStorage.getItem('auth'));

    if (authData && authData.token != null) {
        console.log("inloggad och går till checkout");
        startCheckout(totalPrice, totalQuantity);
    } else {
        loadLogInContent();
    }
}

function startCheckout(totalPrice, totalQuantity){
    console.log(totalPrice, totalQuantity);

    $.ajax({
        url: host + '/create-checkout-session/' + totalPrice + '/' + totalQuantity,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            price: totalPrice,
            quantity: totalQuantity,
        }),
        success: function() {
          console.log("checkout finished")
        },
        error: function(JQxhr, status, error){
          console.log('Error when paying: ' + error)
        },
    });
    


    //ta bort från homeview om köpt
    //spara köp information i user
}