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

$(document).on('click', '#faqBtn', function() {
    $('.container').empty();
    $(".container").load("contact.html .contactContainer", function () {});
});

function showSellForm() {
    
    $(".sellcontainerjs").empty();
    $(".sellcontainerjs").load("sell.html #sellForm", function () {
        handleAllergies();
        handleProteins();
        //nedanför anrop finns i ajax.js, "function(response){}" för att se om det var lyckat
        //postAd(userID, dishName, cookDate, imagePath, description, quantity, portionPrice, protein, allergy, function(response){});
        $("#sellBtn").on('click', function (e) {
            //check if logein in
            //fetch all input and check 
            //
        });
});
    
    $("#SellQuestionsContainer").hide();
}
function handleProteins(){
    getProteins(function(proteins){
        if(proteins){
            console.log(proteins)
            $.each(proteins, function(index, protein){
                var proteinHTML = createProteinHtml(protein);
                $("#allergensList").append(proteinHTML);
            })
        }else{
            $("#proteinList").append("<h1>Ops, something went wrong please try again</h1>");
        }
    })
}

function createProteinHtml(protein){
    var html = '<label class="proteinContainer">' + protein.type +
    '<input type="checkbox" id="' + protein.type.toLowerCase() +
    '" name="protein" value="' + protein.type + '">' +
    '<span class="checkmark"></span>' +
    '</label>';
return html;
}

function handleAllergies(){
    getAllergies(function(allergies){
        if(allergies){
            console.log(allergies);
            $.each(allergies, function(index, allergy){
                var allergyHTML = createAllergyHtml(allergy);
                $("#allergensList").append(allergyHTML);
            })
        }else{
            $("#allergensList").append("<h1>Ops, something went wrong please try again</h1>");
        }
    })
}
function createAllergyHtml(allergy){
    var html = '<label class="AllergenContainer">' + allergy.type +
               '<input type="checkbox" id="' + allergy.type.toLowerCase() +
               '" name="allergen" value="' + allergy.type + '">' +
               '<span class="checkmark"></span>' +
               '</label>';
    return html;
}


