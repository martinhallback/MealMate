function homeview(ads) {
  $('.container').empty();
  $('.container').append('<div class="homeviewContainer">' + '</div>');
  var homeviewImageUrl = 'Images/homeviewImage.jpg'; //  image URL with your image
  $('.homeviewContainer').append('<img src="' + homeviewImageUrl + '" alt="homeview" class="homeviewImage">');
  $('.homeviewContainer').append('<h2 class="foodNearMeTitle">Food near me</h2>');
  // Embed Google Map
  var mapIframe = document.createElement('iframe');
  
  mapIframe.src = "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d16726.078168885902!2d15.57146175!3d58.3974506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ssv!2sse!4v1713448415102!5m2!1ssv!2sse"
  mapIframe.classList.add('google-map'); // Add a class to the iframe element
  mapIframe.height = "450";
  mapIframe.style.border = "0";
  mapIframe.allowfullscreen = true;
  mapIframe.loading = "lazy";
  mapIframe.referrerpolicy = "no-referrer-when-downgrade";
  $('.homeviewContainer').append(mapIframe);
  /*End of Google Map */
  $('.homeviewContainer').append('<div class="adContainer">' + '</div>');
  /*Filter content*/
  $('.homeviewContainer').append('<div id="filter-container" class="filter-container"></div>');
  $('.homeviewContainer').append('<div id="content-container" class="content-container"></div>');
  $('#filter-container').load('filter.html', function () {
  });

  if(!ads){
    getAds(function(cardData){
      handleCardData(cardData)
    });
  }else{
    handleCardData(ads)
  }
      handleclicks();
  }
  
  function handleCardData(cardData){
    if(cardData){
      $.each(cardData, function(index, card) {
        var cardHtml = createCard(index, card);
        $('.adContainer').append(cardHtml);
        getUser(card.sellerID, function(seller){
          console.log(seller);
          var modal = foodAdModal(card, index, seller);
          
        });
      });
    }else{
      console.log("no ads exist")
    }
  }
  
  function handleclicks(){
    $('.homeviewContainer').on('click', '.buy-btn', function() {
      var modalIndex = $(this).data('target').split('_')[1];
      $('#foodadmodal_' + modalIndex).modal('show');
    });
    $('.homeviewContainer').on('click', '.close-btn', function() {
      $(this).closest('.modal').modal('hide');
    });
    $('.homeviewContainer').on('click', '.btn btn-secondary close-btn', function() {
      $(this).closest('.modal').modal('hide');
    });
  }  

function createCard(index, card) {
  var cardHtml = '<div class="cardAD">' +
    '<div class="card-body">' +
    '<img src="data:image/png;base64,' + card.imagePath + '" class="card-img-top" alt="...">' +
    '<h5 class="ADcard-title">' + card.dishName + '</h5>' +
    '<p class="ADcard-text">' + card.description + '</p>' +
    '<p class="ADcard-price">Price: ' + card.portionPrice + ' kr/pc</p>' +
    '<button type="button" class="btn btn-primary buy-btn" data-toggle="modal" data-target="#homeviewmodal_' + index + '">View</button>' +
    '</div>' +
    '</div>';
  return cardHtml;
}

async function foodAdModal(card, index, seller){
  calculateAvgRating(seller, function(rating){
    if (isNaN(rating)) {
      rating = "unrated seller";
    }else{
      rating = rating + '/5';
    }
    var modalHtml = '<div class="modal fade" id="foodadmodal_' + index + '" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
      '<div class="modal-dialog">' +
      '<div class="modal-content">' +
      '<div class="modal-header">' +
      '<h5 class="cardAd-modal-title" id="exampleModalLabel">' + card.dishName + '</h5>' +
      '<button type="adbutton" class="close-btn" data-bs-dismiss="modal" aria-label="Close"></button>' +
      '</div>' +
      '<div class="cardAd-modal-body">' +
      '<img src="data:image/png;base64,' + card.imagePath + '" class="modal-img" alt="Food Image">' +
      '<p class="cardAd-description-text">' + card.description + '</p>' +
      '<p><span class="cookDate-modal-label">Cook Date:</span> ' + card.cookDate + '</p>' +
      '<p><span class="quantity-modal-label">Quantity:</span> ' + card.quantity + '</p>' +
      '<p><span class="price-modal-label">Price:</span> ' + card.portionPrice + ' kr/pc</p>' +
      '<p><span class="seller-modal-label">Seller:</span> ' + seller.name + '</p>' +
      '<p>Rating: ' + rating + '</p>' +
      '</div>' +
      '<div class="modal-footer">' +
      '<button type="adbutton" class="btn btn-secondary close-btn" data-dismiss="modal">Close</button>' +
      '<button type="adbutton" class="btn btn-primary add-to-cart-btn" onclick="addtocart(\'' + card._id + '\', ' + index + ')">Add to Shopping Cart</button>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>';
  $('.homeviewContainer').append(modalHtml);
  })
}

function calculateAvgRating(seller, callback) {
  getPurchases(seller._id, "seller", function (purchases) {
      if (purchases) {
          var totRating = 0;
          var ratingCount = 0;
          purchases.forEach(pur => {
              if (pur.sellerRating !== null) {
                  totRating += pur.sellerRating;
                  ratingCount++;
              }
          });
          if (ratingCount === 0) {
              callback(0);
          } else {
              callback(totRating / ratingCount);
          }
      } else {
          callback(0);
      }
  });
}

function addtocart(id, index) {
  getAd(id, function (ad) {
    if (ad) {
      var cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];
      var isCardInCart = cartItems.some(item => item._id === ad._id);
      if (!isCardInCart) {
        cartItems.push(ad);
        sessionStorage.setItem('cart', JSON.stringify(cartItems));
      }
    }
  });
  $('#foodadmodal_' + index).modal('hide');
}