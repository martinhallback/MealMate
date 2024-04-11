function checkoutView(totalPrice, totalQuantity) {
    var authData = JSON.parse(sessionStorage.getItem('auth'));

    if (authData && authData.token != null) {
        startCheckout(totalPrice, totalQuantity);
    } else {
        loadLogInContent();
    }
}

function startCheckout(totalPrice, totalQuantity){
    
    console.log("calling stripe ajax")
    $.ajax({
        url: host + '/create-checkout-session',
        type: 'POST',
        async: true,
        contentType: 'application/json',
        data: JSON.stringify({
            price: totalPrice,
            quantity: totalQuantity,
        }),
        success: function(response) {
          console.log("checkout finished")
          console.log(response)
          window.open(response.url, '_blank');
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