// sell.js

function sellview() {
    $('.container').empty();
    $('.container').append('<h2 class="startSellingYourLunchboxesHere">Start selling your lunchboxes here!</h2>');
    $('.container').append('<div class="adcontainer">' + '</div>');

    console.log('Load Sell Content');
    $("#sellContainer").html(""); // Clear the sellContainer
    // Append a button to initiate the selling process
    $('.container').append('<button id="sellBtn" class="btn btn-primary">Sell</button>');
    // Attach a click event to the "Sell" button
    $("#sellBtn").off().on('click', function (e) {
        console.log('Sell button clicked');
        showSellForm();
    });
}

// Function to show the sell form
function showSellForm() {
    $("#sellContainer").html(""); // Clear the sellContainer
    $("#sellContainer").load("sell.html #sellForm", function () {
        // You can add additional logic or event handling here if needed
    });
}
    
    document.addEventListener('DOMContentLoaded', function () {
        // Execute code when the document is fully loaded
        // Additional logic can be added here if needed
    });
