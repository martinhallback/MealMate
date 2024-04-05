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
    $("#SellQuestionsContainer").hide();
}

$(document).on('click', '#faqBtn', function() {
    $('.container').empty();
    $(".container").load("contact.html .contactContainer", function () {});
});

//function showAllergensList() {
    //var allergens = ["Gluten", "Dairy", "Nuts", "Soy", "Shellfish"];
    //var list = document.getElementById("allergensList");
    //list.innerHTML = ""; // Clear previous list

    // Create list items for each allergen
    //allergens.forEach(function(allergen) {
        //var listItem = document.createElement("div");
        //listItem.textContent = allergen;
        //listItem.classList.add("allergen-item");
        //listItem.onclick = function() {
            //addAllergen(allergen);
        //};
        //list.appendChild(listItem);
    //});

    // Show the allergens list
    //list.style.display = "block";
//}

// Function to show the allergens list when the input field is clicked
function showAllergensList() {
    var allergens = ["Gluten", "Dairy", "Nuts", "Soy", "Shellfish", "Fish", "Peanuts"];
    var inputWidth = $('#lunchboxAllergens').outerWidth(); // Get the width of the input field
    $('.allergens-list').css('width', inputWidth + 'px'); // Set the width of the allergens list equal to the input field width
    $('.allergens-list').empty(); // Clear previous list
    // Append allergens to the list
    allergens.forEach(function(allergen) {
        $('.allergens-list').append('<div class="allergen-item">' + allergen + '</div>');
    });
    $('.allergens-list').show(); // Show the allergens list
}

// Function to add an allergen when clicked and remove it from the list
$(document).on('click', '.allergen-item', function() {
    var allergen = $(this).text(); // Get the text of the clicked allergen
    $('#selectedAllergens').append('<div class="selected-allergen">' + allergen + '</div>'); // Add the allergen below the allergen title
    $(this).remove(); // Remove the clicked allergen from the list
});

// Hide the allergens list when clicking outside of it
$(document).on('click', function(event) {
    if (!$(event.target).closest('.sellinput').length && !$(event.target).closest('.allergens-list').length) {
        hideAllergensList();
    }
});

function hideAllergensList() {
    $('.allergens-list').hide();
}


document.addEventListener('DOMContentLoaded', function () {
    // Execute code when the document is fully loaded
    // Additional logic can be added here if needed
});
