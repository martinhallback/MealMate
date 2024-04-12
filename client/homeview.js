function homeview() {
  $('.container').empty();
  $('.container').append('<div class="homeviewContainer">' + '</div>');
  var homeviewImageUrl = 'Images/homeviewImage.jpg'; //  image URL with your image
  $('.homeviewContainer').append('<img src="' + homeviewImageUrl + '" alt="homeview" class="homeviewImage">');
  $('.homeviewContainer').append('<h2 class="foodNearMeTitle">Food near me</h2>');
  // Embed Google Map
 var mapIframe = document.createElement('iframe');
 mapIframe.src = "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d16726.078168885902!2d15.57146175!3d58.3974506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1szh-TW!2sse!4v1712847287937!5m2!1szh-TW!2sse";
 mapIframe.classList.add('google-map'); // Add a class to the iframe element
 //mapIframe.width = "1920"; // Set your desired width
 mapIframe.height = "450"; // Set your desired height
 mapIframe.style.border = "0";
 mapIframe.allowfullscreen = true;
 mapIframe.loading = "lazy";
 mapIframe.referrerpolicy = "no-referrer-when-downgrade";
 $('.homeviewContainer').append(mapIframe);

  $('.homeviewContainer').append('<div class="adContainer">' + '</div>');

  $('.homeviewContainer').append('<div id="filter-container" class="filter-container"></div>');
  $('.homeviewContainer').append('<div id="content-container" class="content-container"></div>');

  $('#filter-container').load('filter.html', function () {
  });

  getAds(function (cardData) {
    if (cardData) {
      $.each(cardData, function (index, card) {
        var cardHtml = createCard(index, card);
        $('.adContainer').append(cardHtml);
        getUser(card.sellerID, function (seller) {
          console.log(seller);
          var modal = foodAdModal(card, index, seller);
          $('.homeviewContainer').append(modal);
        });
      });
    } else {
    }
  });
  handleclicks();
}

function handleclicks() {
  $('.homeviewContainer').on('click', '.buy-btn', function () {
    var modalIndex = $(this).data('target').split('_')[1];
    $('#foodadmodal_' + modalIndex).modal('show');
  });
  $('.homeviewContainer').on('click', '.close-btn', function () {
    $(this).closest('.modal').modal('hide');
  });
  $('.homeviewContainer').on('click', '.btn btn-secondary close-btn', function () {
    $(this).closest('.modal').modal('hide');
  });
}

function createCard(index, card) {
  var cardHtml = '<div class="cardAD">' +
    '<div class="card-body">' +
    '<img src="Images/TestFoodImage.jpg" class="card-img-top" alt="...">' +
    '<h5 class="ADcard-title">' + card.dishName + '</h5>' +
    '<p class="ADcard-text">' + card.description + '</p>' +
    '<p class="ADcard-price">Price: ' + card.portionPrice + ' kr/pc</p>' +
    '<button type="button" class="btn btn-primary buy-btn" data-toggle="modal" data-target="#myModal_' + index + '">View</button>' +
    '</div>' +
    '</div>';
  return cardHtml;
}
/*function foodAdModal(card, index, seller) {
  var modalHtml = '<div class="modal fade" id="foodadmodal_' + index + '" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
    '<div class="modal-dialog">' +
    '<div class="modal-content">' +
    '<div class="modal-header">' +
    '<h5 class="modal-title" id="exampleModalLabel">' + card.dishName + '</h5>' +
    '<button type="adbutton" class="close-btn" data-bs-dismiss="modal" aria-label="Close"></button>' +
    '</div>' +
    '<div class="modal-body">' +
    '<img src="Images/TestFoodImage.jpg" class="modal-img" alt="Food Image">' +
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
}*/
/*EDITED CODE TO FIT CSS */
function foodAdModal(card, index, seller) {
  var modalHtml = '<div class="modal fade" id="foodadmodal_' + index + '" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
    '<div class="modal-dialog">' +
    '<div class="modal-content">' +
    '<div class="modal-header">' +
    '<h5 class="modal-title" id="exampleModalLabel">' + card.dishName + '</h5>' +
    '<button type="adbutton" class="close-btn" data-bs-dismiss="modal" aria-label="Close"></button>' +
    '</div>' +
    '<div class="modal-body">' +
    '<img src="Images/TestFoodImage.jpg" class="modal-img" alt="Food Image">' +
    '<p>' + card.description + '</p>' +
    '<p><span class="modal-label">Quantity:</span> ' + card.quantity + '</p>' +
    '<p><span class="modal-label">Price:</span> ' + card.portionPrice + ' kr/pc</p>' +
    '<p><span class="modal-label">Seller:</span> ' + seller.name + '</p>' +
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


