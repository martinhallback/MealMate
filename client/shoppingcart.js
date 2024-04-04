function shoppingcartView(){



    }

function checkoutview() {

    if(sessionStorage = sessionStorage.getItem('auth') > 0) 
    {
        console.log("inloggad och går till checkout");

    } else{
        logInUser();
        checkoutview();
    }
    
}