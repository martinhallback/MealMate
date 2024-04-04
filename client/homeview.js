function homeview(){
  
  console.log("homeview")
    $('.container').empty();
    $('.container').append('<h2 class="foodNearMe">Food near me</h2>');
    $('.container').append('<div class="adcontainer">' + '</div>');
    
    getAds(function(cardData){
      console.log(cardData);
      if(cardData){
        $.each(cardData, function(index, card) {
          var cardHtml = createCard(index, card);
          $('.adcontainer').append(cardHtml);
          var modal = foodAdModal(card, index);
          $('.container').append(modal);
        });
      }else{
        console.log("no ads exist")
      }
      
    });

    $('.container').on('click', '.buy-btn', function() {
        var modalIndex = $(this).data('target').split('_')[1];
        $('#myModal_' + modalIndex).modal('show');
    });
    $('.container').on('click', '.close-btn', function() {
        $(this).closest('.modal').modal('hide');
    });
    $('.container').on('click', '.btn btn-secondary close-btn', function() {
        $(this).closest('.modal').modal('hide');
    });
}
function createCard(index, card){
  var cardHtml = '<div class="card">' +
                          '<div class="card-body">' +
                              //'<img src="' + card.imgPath + '" class="card-img-top" alt="...">' +
                              '<h5 class="card-title">' + card.title + '</h5>' +
                              '<p class="card-text">' + card.description + '</p>' +
                              '<p>Price: ' + card.portionPrice + '</p>' +
                              '<button type="button" class="btn btn-primary buy-btn" data-toggle="modal" data-target="#myModal_' + index + '">Buy</button>' +
                          '</div>' +
                      '</div>';
}
function foodAdModal(card, index){
  var modalHtml = '<div class="modal fade" id="myModal_' + index + '" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
      '<div class="modal-dialog">' +
      '<div class="modal-content">' +
      '<div class="modal-header">' +
      '<h5 class="modal-title" id="exampleModalLabel">' + card.dishName + '</h5>' +
      '<button type="button" class="close-btn" data-bs-dismiss="modal" aria-label="Close"></button>' +
      '</div>' +
      '<div class="modal-body">' +
      //'<img src="' + card.imagePath + '" class="modal-img" alt="Food Image">' +
      '<p>' + card.description + '</p>' +
      '<p>Cook Date: ' + card.cookDate + '</p>' +
      '<p>Quantity: ' + card.quantity + '</p>' +
      '<p>Price: ' + card.portionPrice + '</p>' +
      '<p>Seller: ' + card.sellerID + '</p>' +
      '</div>' +
      '<div class="modal-footer">' +
      '<button type="button" class="btn btn-secondary close-btn" data-dismiss="modal">Close</button>' +
      '<button type="button" class="btn btn-primary add-to-cart-btn" onclick="addtocart('+ index +')">Add to Shopping Cart</button>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>';
  
  return modalHtml;
}

function addtocart(index){
  console.log("add to cart")

  //ajax call for specific add?
  var cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];

  var isCardInCart = cartItems.some(item => item === index);
  if(!isCardInCart){
    cartItems.push(index);
    sessionStorage.setItem('cart', JSON.stringify(cartItems)); 
  }
 
  $('#myModal_' + index).modal('hide');
}

function getAds(callback){
  var host = window.location.protocol + '//' + location.host
  $.ajax({
    url: host + '/ads',
    type: 'GET',
    contentType: 'application/json',
    success: function(response){
      console.log("fetched all the ads");
      callback(response);
    },
    error: function(JQxhr, status, error){
      console.log(error);
      callback(null);
    }
  });
}