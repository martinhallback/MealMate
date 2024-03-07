function homeview(){
    $('.container').empty();
    $('.container').append('<h2 class="foodNearMe">Food near me</h2>');
    $('.container').append('<div class="adcontainer">' + '</div>');
  
    var cardData = [ // remove when list from backend is finished
      { 
          imgSrc: 'Images/TestFoodImage.jpg',
          title: 'Card Title 1',
          text: 'Some quick example text for card 1.',
          extraInfo: 'Some extra info for card 1'
      },
      { 
          imgSrc: 'Images/TestFoodImage.jpg',
          title: 'Card Title 2',
          text: 'Some quick example text for card 2.',
          extraInfo: 'Some extra info for card 2'
      },
    ];
  
    $.each(cardData, function(index, card) {
      var cardHtml = '<div class="card">' +
                          '<div class="card-body">' +
                              '<img src="' + card.imgSrc + '" class="card-img-top" alt="...">' +
                              '<h5 class="card-title">' + card.title + '</h5>' +
                              '<p class="card-text">' + card.text + '</p>' +
                              '<button type="button" class="btn">Buy</button>' +
                          '</div>' +
                      '</div>';
  
      $('.adcontainer').append(cardHtml);
  
      //add button handler for Buy button and call foodAdModal() when pressed
    });
}
  
  
function foodAdModal(card){
    var modalHtml = '<div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
                                  '<div class="modal-dialog">' +
                                      '<div class="modal-content">' +
                                          '<div class="modal-header">' +
                                              '<h5 class="modal-title" id="exampleModalLabel">'+ card.title +'</h5>' +
                                              '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
                                          '</div>' +
                                          '<div class="modal-body">' +
                                              '<p>' + card.extraInfo + '</p>' + 
                                          '</div>' +
                                      '</div>' +
                                  '</div>' +
                              '</div>';
}