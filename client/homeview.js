function homeview(){
  console.log("homeview")
    $('.container').empty();
    $('.container').append('<h2 class="foodNearMe">Food near me</h2>');
    $('.container').append('<div class="adcontainer">' + '</div>');
    
    $('.container').append('<div id="filter-container" class="filter-container"></div>'); 
    $('.container').append('<div id="content-container" class="content-container"></div>');

   $('#filter-container').load('filter.html', function() {
       console.log('Filter content loaded successfully.');
        // Optionally, initialize any JavaScript needed for the filter after it's loaded
    });

getAds(function(cardData){
      if(cardData){
        $.each(cardData, function(index, card) {
          var cardHtml = createCard(index, card);
          $('.adcontainer').append(cardHtml);
          getUser(card.sellerID, function(seller){
            console.log(seller);
            var modal = foodAdModal(card, index, seller);
            $('.container').append(modal);
          });
        });
      }else{
        console.log("no ads exist")
      }
    });
    handleclicks();
}

function handleclicks(){
  $('.container').on('click', '.buy-btn', function() {
    var modalIndex = $(this).data('target').split('_')[1];
    $('#foodadmodal_' + modalIndex).modal('show');
  });
  $('.container').on('click', '.close-btn', function() {
    $(this).closest('.modal').modal('hide');
  });
  $('.container').on('click', '.btn btn-secondary close-btn', function() {
    $(this).closest('.modal').modal('hide');
  });
}

function createCard(index, card){
var cardHtml = '<div class="cardAD">' +
                        '<div class="card-body">' +
                            //'<img src="' + card.imgPath + '" class="card-img-top" alt="...">' +
                            '<h5 class="ADcard-title">' + card.dishName + '</h5>' +
                            '<p class="ADcard-text">' + card.description + '</p>' +
                            '<p>Price: ' + card.portionPrice + ' kr/pc</p>' +
                            '<button type="button" class="btn btn-primary buy-btn" data-toggle="modal" data-target="#myModal_' + index + '">Buy</button>' +
                        '</div>' +
                    '</div>';
return cardHtml;
}
function foodAdModal(card, index, seller){
  var modalHtml = '<div class="modal fade" id="foodadmodal_' + index + '" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
      '<div class="modal-dialog">' +
      '<div class="modal-content">' +
      '<div class="modal-header">' +
      '<h5 class="modal-title" id="exampleModalLabel">' + card.dishName + '</h5>' +
      '<button type="adbutton" class="close-btn" data-bs-dismiss="modal" aria-label="Close"></button>' +
      '</div>' +
      '<div class="modal-body">' +
      //'<img src="' + card.imagePath + '" class="modal-img" alt="Food Image">' +
      '<p>' + card.description + '</p>' +
      '<p>Cook Date: ' + card.cookDate + '</p>' +
      '<p>Quantity: ' + card.quantity + '</p>' +
      '<p>Price: ' + card.portionPrice + ' kr/pc</p>' +
      '<p>Seller: ' + seller.name + '</p>' +
      '</div>' +
      '<div class="modal-footer">' +
      '<button type="adbutton" class="btn btn-secondary close-btn" data-dismiss="modal">Close</button>' +
      '<button type="adbutton" class="btn btn-primary add-to-cart-btn" onclick="addtocart(\'' + card._id + '\', ' + index + ')">Add to Shopping Cart</button>' +
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
  $('#foodadmodal_' + index).modal('hide');
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

function getUser(sellerID, callback){
  console.log("get seller: " + sellerID)
  console.log(host+ "/user/" + sellerID )
  $.ajax({
    url: host + '/user/' + sellerID,
    type: 'GET',
    contentType: 'application/json',
    success: function(response){
      console.log("fetched user");
      callback(response);
    },
    error: function(JQxhr, status, error){
      console.log("Error fetching user: " + error);
      callback(null);
    }
  });
}