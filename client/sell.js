// sell.js

function loadSellContent() {
    console.log('Load Sell Content');
    $("#sellContainer").load("sell.html #sellForm", function () {
      showSellModal();
    });
}

function showSellModal() {
    $('#sell-modal').modal('show'); 
    $("#sellForm").off().on('submit', function (e) { 
      sellLunchbox();
    });
}

document.addEventListener('DOMContentLoaded', function () {
    // Execute code when the document is fully loaded
/*
function isUserLoggedIn() {
    // Check the user's login status
    // You might use session storage, cookies, or another method to check this
    // For demonstration purposes, let's assume there's a 'userLoggedIn' variable in session storage
    return sessionStorage.getItem('userLoggedIn') === 'true';

    Authorization: `Bearer ${sessionStorage.getItem('token')}`,

    function isUserLoggedIn() {
    // Check your authentication status here
    // You might use session storage, cookies, or another method
    // For demonstration purposes, let's assume there's a 'token' variable in session storage
    return sessionStorage.getItem('token') !== null;
}

function pageLoaded() {
    if (isUserLoggedIn()) {
        loadLoggedInNav();
        $(".container").html($("#view-home").html());
    } else {
        loadLoginNav();
        loadSellPage();   
    }
}

function loadSellPage() {   
    $(".container").html($("#sellPage").html());  
    // Additional logic specific to selling page
    $('#sell-save-button').click(function (e) {
        e.preventDefault();
        var sellTitle = $("#sell-title").val();
        var sellDescription = $("#sell-description").val();
        var sellPrice = $("#sell-price").val();
        createSellListing(sellTitle, sellDescription, sellPrice);
    });
}

function createSellListing(title, description, price) {  
    $.ajax({
        url: host + '/sell-listings',  // Changed from '/sign-up' to '/sell-listings'
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ title: title, description: description, price: price }),
        
        error: function (response) {
            console.log(response);
        },
        success: function (response) {
            // Additional logic after successfully creating a sell listing
            console.log(response);
            // Example: Reload the sell page after creating a listing
            loadSellPage();
        }
    });
}

//AJAX Additions
host = window.location.protocol + '//' + location.host;

$.get(host + '/sell-listings', function (sellListings) { 
    return sellListings;
    // sellListings innehåller nu den JSON-data som servern svarar med på /sell-listings
});
}
*/
    // Reference to the sellForm element
    const sellForm = document.getElementById('sellForm');

    // Event listener for form submission
    sellForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Get form data
        const title = document.getElementById('lunchboxTitle').value;
        const description = document.getElementById('lunchboxDescription').value;
        const madeDate = document.getElementById('lunchboxMadeDate').value;
        const allergens = document.getElementById('lunchboxAllergens').value;
        const image = document.getElementById('lunchboxImage').value;

        // Perform any additional processing or validation here

        // Example: Display the form data in the console
        console.log('Title:', title);
        console.log('Description:', description);
        console.log('Made Date:', madeDate);
        console.log('Allergens:', allergens);
        console.log('Image:', image);

        // You can send the form data to the server or perform other actions as needed
    });
});

function sellLunchbox() {
    // Implement the logic to handle selling lunchbox
    // You can use AJAX to send data to the server
    console.log('Selling lunchbox...');
    // Example: You might want to close the modal after successful submission
    $('#sell-modal').modal('hide');
}