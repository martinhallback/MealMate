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
    
    //ta bort från homeview om köpt
    //ta bort från session storage
    //spara köp information i user
}