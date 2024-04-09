// sell.js

function sellview() {
    
    $('.container').empty();
    $('.container').append('<div class="sellcontainerjs">' + '</div>');
    $('.sellcontainerjs').append('<h2 class="startSelling">Start selling your lunchboxes here!</h2>');
    $('.sellcontainerjs').append('<p class="benefitsText">Earn extra income by selling your homemade lunchboxes to hungry customers. <br> Share your culinary skills and delight others with your delicious creations!</p>');
    var imageUrl = 'Images/lunchboxsellview.jpg'; // Update the image URL with your actual image
    $('.sellcontainerjs').append('<img src="' + imageUrl + '" alt="Lunchbox" class="sellImage">');

    console.log('Load Sell Content');
    // Append a button to initiate the selling process
    $('.sellcontainerjs').append('<button id="sellBtn" class="btn btn-primary">Sell</button>');
    // Attach a click event to the "Sell" button
    $("#sellBtn").off().on('click', function (e) {
        console.log('Sell button clicked');
        showSellForm();
    });
}

// Function to show the sell form
function showSellForm() {
    //$(".container").empty(""); // Clear the container
    $(".sellcontainerjs").empty();
    $(".sellcontainerjs").load("sell.html #sellForm", function () {
        if (status == "error") {
            var msg = "Sorry but there was an error: ";
            console.log(msg + xhr.status + " " + xhr.statusText);
        }
    });
}
