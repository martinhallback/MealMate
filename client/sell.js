// sell.js

function sellview() {

    $('.container').empty();
    $('.container').append('<div class="sellcontainerjs">' + '</div>');
    var imageUrl = 'Images/Sell_Image.jpg'; //  image URL with your image
    $('.sellcontainerjs').append('<img src="' + imageUrl + '" alt="Lunchbox" class="sellImage">');
    $('.sellcontainerjs').append('<h2 class="startSelling">Start selling your lunchboxes here!</h2>');
    $('.sellcontainerjs').append('<p class="benefitsText">Earn extra income by selling your homemade lunchboxes to hungry customers. <br> Share your culinary skills and delight others with your delicious creations!</p>');
    console.log('Load Sell Content');
    // Append a button to initiate the selling process
    $('.sellcontainerjs').append('<button id="sellBtn" class="btn btn-primary">Sell</button>');
    $('.container').append('<div id="SellQuestionsContainer">' +
        '<h3 class="ifQuestionsTitle"><strong>Do you have any questions about how to start selling your lunchboxes?</strong></h3>' +
        '<p class="ifQuestionsText">If you have any questions, click the button below to see frequently asked questions or contact us directly.</p>' +
        '<button id="faqBtn">FAQs</button>' +
        '</div>');
<<<<<<< HEAD


=======


>>>>>>> f83e16dbfe8d931c72167dc2315b93f6e5fcf0d6
    // Attach a click event to the "Sell" button
    $("#sellBtn").off().on('click', function (e) {
        console.log('Sell button clicked');
        showSellForm();
    });
}

function showSellForm() {
    
    $(".sellcontainerjs").empty();
    $(".sellcontainerjs").load("sell.html #sellForm", function () {
        if (status == "error") {
            var msg = "Sorry but there was an error: ";
            console.log(msg + xhr.status + " " + xhr.statusText);
        }
    });
    $("#SellQuestionsContainer").hide();
}

$(document).on('click', '#faqBtn', function() {
    $('.container').empty();
    $(".container").load("contact.html .contactContainer", function () {});
});

document.addEventListener('DOMContentLoaded', function () {
    // Execute code when the document is fully loaded
    // Additional logic can be added here if needed
});
