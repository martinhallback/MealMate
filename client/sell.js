// sell.js

function sellview() {
    
    $('.container').empty();
    $('.container').append('<div class="sellcontainerjs">' + '</div>');
    var imageUrl = 'Images/lunchboxsellview.jpg'; //  image URL with your image
    $('.sellcontainerjs').append('<img src="' + imageUrl + '" alt="Lunchbox" class="sellImage">');
    $('.sellcontainerjs').append('<h2 class="startSelling">Start selling your lunchboxes here!</h2>');
    $('.sellcontainerjs').append('<p class="benefitsText">Earn extra income by selling your homemade lunchboxes to hungry customers. <br> Share your culinary skills and delight others with your delicious creations!</p>');
    var imageUrl = 'Images/lunchboxsellview.jpg'; 
    $('.sellcontainerjs').append('<img src="' + imageUrl + '" alt="Lunchbox" class="sellImage">');

    $('.sellcontainerjs').append('<button id="sellBtn" class="btn btn-primary">Sell</button>');

    $("#sellBtn").off().on('click', function (e) {
        console.log('Sell button clicked');
        showSellForm();
    });
}

function showSellForm() {
    
    $(".sellcontainerjs").empty();
    $(".sellcontainerjs").load("sell.html #sellForm", function () {
        
        //nedanför anrop finns i ajax.js, "function(response){}" för att se om det var lyckat
        //postAd(userID, dishName, cookDate, imagePath, description, quantity, portionPrice, protein, allergy, function(response){});
    });
}
