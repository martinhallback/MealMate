// sell.js

function sellview() {

    $('.container').empty();
    $('.container').append('<div class="sellcontainerjs">' + '</div>');
    var imageUrl = 'Images/Sell_Image.jpg'; //  image URL with your image
    $('.sellcontainerjs').append('<img src="' + imageUrl + '" alt="Lunchbox" class="sellImage">');
    $('.sellcontainerjs').append('<h2 class="startSelling">Start selling your lunchboxes here!</h2>');
    $('.sellcontainerjs').append('<p class="benefitsText">Earn extra income by selling your homemade lunchboxes to hungry customers. <br> Share your culinary skills and delight others with your delicious creations!</p>');
    console.log('Load Sell Content');

    $('.sellcontainerjs').append('<button id="sellBtn" class="btn btn-primary">Sell</button>');
    $('.container').append('<div id="SellQuestionsContainer">' +
        '<h3 class="ifQuestionsTitle"><strong>Do you have any questions about how to start selling your lunchboxes?</strong></h3>' +
        '<p class="ifQuestionsText">If you have any questions, click the button below to see frequently asked questions or contact us directly.</p>' +
        '<button id="faqBtn">FAQs</button>' +
        '</div>');

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

        //nedanför ajax anrop finns i ajax.js, "function(response){}" för att se om det var lyckat
        //postAd(userID, dishName, cookDate, imagePath, description, quantity, portionPrice, protein, allergy, function(response){});
        
        
        $("#submitCreateAd").on('click', function (e) {
            console.log("create ad button pressed")

            //check if logged in 
            var authData = JSON.parse(sessionStorage.getItem('auth'));
            if (authData && authData.token != null) {
                //fetch userID from sessionstorage
                if(authData.user){
                    var userID = authData.user._id;

                    //fetch all input and check 
                    var dishName = $("#lunchboxTitle").val();
                    var cookDate = $("#lunchboxMadeDate").val();

                    //call the postAd() in ajax.js
                    //redirict or show the user somehow they have sucessfully posted an ad
                }else{

                }
            }else{
                loadLogInContent();
            }
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
                $("#proteinList").append(proteinHTML);
            })
        }else{
            $("#proteinList").append("<h1>Ops, something went wrong please try again</h1>");
        }
    })
}

function createProteinHtml(protein) {
    const id = protein.type.toLowerCase() + (protein.type === 'Other' ? `_${protein.source.toLowerCase()}` : '');
    const value = protein.type === 'Other' ? `${protein.type} ${protein.source}` : protein.type;

    return `
        <label class="proteinContainer">${protein.type}${protein.type === 'Other' ? ` ${protein.source}` : ''}
            <input type="checkbox" id="${id}" name="protein" value="${value}">
            <span class="checkmark"></span>
        </label>`;
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





