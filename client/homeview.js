function homeview(){
  
    console.log("homeview");
    $('.container').empty();
    $('.container').append('<h2 class="foodNearMe">Food near me</h2>');
    $('.container').append('<div class="adcontainer">' + '</div>');
    
    $('.container').append('<div id="filter-container" class="filter-container"></div>'); 
    $('.container').append('<div id="content-container" class="content-container"></div>');

    // Load the filter HTML into #filter-container
   $('#filter-container').load('filter.html', function() {
       console.log('Filter content loaded successfully.');
        // Optionally, initialize any JavaScript needed for the filter after it's loaded
    });

getAds(function(cardData){
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
                            '<h5 class="card-title">' + card.dishName + '</h5>' +
                            '<p class="card-text">' + card.description + '</p>' +
                            '<p>Price: ' + card.portionPrice + ' kr/pc</p>' +
                            '<button type="button" class="btn btn-primary buy-btn" data-toggle="modal" data-target="#myModal_' + index + '">Buy</button>' +
                        '</div>' +
                    '</div>';
return cardHtml;
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
    '<p>Price: ' + card.portionPrice + ' kr/pc</p>' +
    '<p>Seller: ' + card.sellerID + '</p>' +
    '</div>' +
    '<div class="modal-footer">' +
    '<button type="button" class="btn btn-secondary close-btn" data-dismiss="modal">Close</button>' +
    '<button type="button" class="btn btn-primary add-to-cart-btn" onclick="addtocart(\'' + card._id + '\', ' + index + ')">Add to Shopping Cart</button>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>';

return modalHtml;
}

function addtocart(id, index){
console.log("add to cart")

getAd(id, function(ad){
  if(ad){
    var cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];
    var isCardInCart = cartItems.some(item => item._id === ad._id);
    if(!isCardInCart){
      cartItems.push(ad);
      sessionStorage.setItem('cart', JSON.stringify(cartItems)); 
    }
  }
});
$('#myModal_' + index).modal('hide');
}

host = window.location.protocol + '//' + location.host
function getAd(id, callback){
$.ajax({
  url: host + '/ad/' + id,
  type: 'GET',
  contentType: 'application/json',
  success: function(response){
    console.log("fetched a single ad");
    callback(response)
  },
  error: function(JQxhr, status, error){
    console.log(error);
    callback(null)
  }
});
}

function getAds(callback){
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
