function homeview(){
    $('.container').empty();
    $('.container').append('<h2 class="foodNearMe">Food near me</h2>');
    $('.container').append('<div class="adcontainer">' + '</div>');
  
    var cardData = [ // remove when list from backend is finished
      { 
          imgSrc: 'Images/TestFoodImage.jpg',
          title: 'Card Title 1',
          text: 'Some quick example text for card 1.',
          extraInfo: 'Some extra info for card 1',
          seller: {
            name: 'Seller 1',
            rating: '4',
            reviews: '14'
        }
      },
      { 
          imgSrc: 'Images/TestFoodImage.jpg',
          title: 'Card Title 2',
          text: 'Some quick example text for card 2.',
          extraInfo: 'Some extra info for card 2',
          seller: {
            name: 'Seller 2',
            rating: '3',
            reviews: '1'
        }
      },
      { 
        imgSrc: 'Images/TestFoodImage.jpg',
        title: 'last card',
        text: 'Some quick example text for last card',
        extraInfo: 'Some extra info for last card',
        seller: {
          name: 'Seller 2',
          rating: '3',
          reviews: '1'
        }
      },
    ];
    
    $.each(cardData, function(index, card) {
      var cardHtml = '<div class="card">' +
                          '<div class="card-body">' +
                              '<img src="' + card.imgSrc + '" class="card-img-top" alt="...">' +
                              '<h5 class="card-title">' + card.title + '</h5>' +
                              '<p class="card-text">' + card.text + '</p>' +
                              '<button type="button" class="btn btn-primary buy-btn" data-toggle="modal" data-target="#myModal_' + index + '">Buy</button>' +
                          '</div>' +
                      '</div>';
  
      $('.adcontainer').append(cardHtml);
      var modal = foodAdModal(card, index);
      $('.container').append(modal);
        
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
  
  
function foodAdModal(card, index){
    var starsHtml = '';
    for (var i = 0; i < card.seller.rating; i++) {
        starsHtml += '<span class="star filled">&#9733;</span>';
    }
    for (var j = card.seller.rating; j < 5; j++) {
        starsHtml += '<span class="star">&#9734;</span>';
    }

    var modalHtml = '<div class="modal fade" id="myModal_' + index + '" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
        '<div class="modal-dialog">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<h5 class="modal-title" id="exampleModalLabel">' + card.title + '</h5>' +
        '<button type="button" class="close-btn" data-bs-dismiss="modal" aria-label="Close"></button>' +
        '</div>' +
        '<div class="modal-body">' +
        '<img src="' + card.imgSrc + '" class="modal-img" alt="Food Image">' +
        '<p>' + card.text + '</p>' +
        '<p>Seller: ' + card.seller.name + '</p>' +
        '<p>Rating: ' + starsHtml + ' ' + card.seller.reviews + ' Reviews' + '</p>' +
        '<p>' + card.extraInfo + '</p>' +
        '</div>' +
        '<div class="modal-footer">' +
        '<button type="button" class="btn btn-secondary close-btn" data-dismiss="modal">Close</button>' +
        '<button type="button" class="btn btn-primary add-to-cart-btn">Add to Shopping Cart</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    
    return modalHtml;
}

function showModal(modal){
    //show the modal when button is pressed
}