function homeview(ads) {
  $('.container').empty();
  $('.container').append('<div class="homeviewContainer">' + '</div>');
  var homeviewImageUrl = 'Images/homeviewImage.jpg'; //  image URL with your image
  $('.homeviewContainer').append('<img src="' + homeviewImageUrl + '" alt="homeview" class="homeviewImage">');
  $('.homeviewContainer').append('<h2 class="foodNearMeTitle">Food near me</h2>');
  // Embed Google Map
  var mapIframe = document.createElement('iframe');
  mapIframe.src = "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d16726.078168885902!2d15.57146175!3d58.3974506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1szh-TW!2sse!4v1712847287937!5m2!1szh-TW!2sse";
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
          var modal = foodAdModal(card, index, seller);
          $('.homeviewContainer').append(modal);
        });
      });
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

function foodAdModal(card, index, seller){
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

function foodAdModal(card, index, seller){
  getAverageRating(seller._id, function(averageRating, numberOfRatings) {
      var rating;
      if (numberOfRatings == 0) {
          rating = "unrated seller";
      } else {
          rating = averageRating.toFixed(1) + '/5';
      }
      // Continue with your code here, using the rating variable
      // For example:
      //console.log("Rating: " + rating);
  
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
  });
}

function calculateAvgRating(seller, callback) {
  getPurchases(seller._id, "seller", function (purchases) {
      if (purchases) {
          var totRating = 0;
          var ratingCount = 0;
          purchases.forEach(pur => {
            if (typeof pur.sellerRating === 'number' && !isNaN(pur.sellerRating)) {
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

//ad to cart
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




var filterHtmlContent = ` <div id="CicularFilterContainer" class="cicularfilter-container">
<div class="circle-background"></div>
<img src="images/funnel-32.png"> 
</div>

<div id="PillFilterContainer" class="pillfilter-container">
<div class="pill-background"></div>
<img src="images/funnel-32.png"> 
</div>

<div id="RectangularFilterContainer" class="rectangularfilter-container">
<div id="FilterHeader" class="filter-header">
   
</div>
<div id="FilterOptions" class="filter-options">
   <label class="DietPref"> Dietary preference </label>
   <label><input type="checkbox" name="Pescitarian" data-type="dietPref" id="PescitarianSelected"> Pescitarian</label>
   <br>
   <label><input type="checkbox" name="Vegetarian" data-type="dietPref" id="VegetarianSelected"> Vegetarian</label>
   <br>
   <label><input type="checkbox" name="Vegan" data-type="dietPref" id="VeganSelected"> Vegan</label>
   <br>
   <label class="ProteinPref"> Protein source </label>
  <!-- <div id="proteinTagsContainer"></div>-->
  <div class="select-protein-container">
   <div class="select-poultry-box", id="select-poultry-box" style="color: white; font-size: 14px;"> ⊗Poultry  </div>
   <div class="select-meat-box", id="select-meat-box" style="color: white; font-size: 14px;"> ⊗Meat  </div>
   <div class="select-fish-box", id="select-fish-box" style="color: white; font-size: 14px;"> ⊗Fish  </div>
   <div class="select-shellfish-box", id="select-shellfish-box" style="color: white; font-size: 14px;"> ⊗Shellfish </div>
 <!--  <div class="select-dairy-box", id="select-dairy-box" style="color: white; font-size: 14px;"> ⊗Dairy & eggs </div> -->
   <div class="select-plantbased-box", id="select-plantbased-box" style="color: white; font-size: 14px;"> ⊗Plantbased  </div>
 </div>

<div class="protein-dropdown" id="proteindropdown">
   <div class="select-protein-box", id="select-protein-box" style="color: white; font-size: 8.5px;">  ↓ Exclude specific proteins  </div>
   <div id="protein-dropdown" class="protein-dropdown-content">
     <div class="protein-scrollable-content">
       <form id="proteinForm">
      <!-- This is filled dynamic -->
     </form>
   </div>
   <span class="protein-close-btn", id="protein-closeX">X</span>
   </div>
 </div>
 
 <label class="AllergiePref"> Exclude allergies </label>
   <div class="dropdown" id="allergiedropdown">
       <div class="select-box", id="select-box" style="color: white"> ↓ Select allergies  </div>
       <div id="dropdown" class="dropdown-content">
         <div class="scrollable-content">
           <form id="optionsForm">
          <!-- This is filled dynamic -->
         </form>
       </div>
       <span class="allergy-close-btn", id="allergy-closeX">X</span>
       </div>
     </div>


   <label class="PricePref"> Select price </label>
   <label for="priceRange", class="priceRangeTitle" >Max price:  <span id="priceValue">50 kr</span></label>
   <input type="range" id="priceRange" class="priceRange" name="priceRange" min="0" max="100" value="50">
   <br>
   <button class="apply-button" onclick="applyFilters()">Apply</button>
</div>
</div> 

<!-- Optional JavaScript -->
<!-- jQuery first, then Popper.js, then Bootstrap JS -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"
integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
<script src="filter.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/js/bootstrap.min.js"
integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
crossorigin="anonymous"></script>`