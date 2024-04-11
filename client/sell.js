// sell.js

function sellview() {

    $('.container').empty();
    $('.container').append('<div class="sellcontainerjs">' + '</div>');
    var imageUrl = 'Images/Sell_Image.jpg'; //  image URL with your image
    $('.sellcontainerjs').append('<img src="' + imageUrl + '" alt="Lunchbox" class="sellImage">');
    $('.sellcontainerjs').append('<h2 class="startSelling">Start selling your lunchboxes here!</h2>');
    $('.sellcontainerjs').append('<p class="benefitsText">Earn extra income by selling your homemade lunchboxes to hungry customers. <br> Share your culinary skills and delight others with your delicious creations!</p>');

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
        
        $("#submitCreateAd").on('click', function (e) {

            //check if logged in 
            var authData = JSON.parse(sessionStorage.getItem('auth'));
            if (authData && authData.token != null) {
                //fetch userID from sessionstorage
                    var userID = authData.user._id;

                    //fetch all input and check 
                    var dishName = $("#lunchboxTitle").val();
                    var cookDate = $("#lunchboxMadeDate").val();
                    var imagePath = '/' //image not implemented yet?!
                    var description = $("#lunchboxDescription").val();    
                    var quantity = $("#lunchboxQuantity").val();
                    var portionPrice = $("#lunchboxPrice").val();

                    var proteins = [];
                    $("input[name='protein']:checked").each(function () {
                        var proteinId = $(this).data('id');
                        proteins.push(proteinId);
                    });

                    var allergies = [];
                    $("input[name='allergen']:checked").each(function () {
                        var allergyId = $(this).data('id');
                        allergies.push(allergyId);
                    });

                    //call the postAd() in ajax.js
                    postAd(userID, dishName, cookDate, imagePath, description, quantity, portionPrice, proteins, allergies, function(response){
                        //redirict or show the user somehow they have sucessfully posted an ad
                        if(response){
                            alert("You have sucessfully posted a ad")
                            
                        }else{
                            alert("unfortunately the ad wasnt posted, please contact staff")
                        }
                        sellview()                
                    });
        
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
            <input type="checkbox" id="${id}" name="protein" value="${value}" data-id="${protein._id}">
            <span class="checkmark"></span>
        </label>`;
}

function handleAllergies(){
    getAllergies(function(allergies){
        if(allergies){
            $.each(allergies, function(index, allergy){
                var allergyHTML = createAllergyHtml(allergy);
                $("#allergensList").append(allergyHTML);
            })
        }else{
            $("#allergensList").append("<h1>Ops, something went wrong please try again</h1>");
        }
    })
}

function createAllergyHtml(allergy) {
    var html = `
        <label class="AllergenContainer">${allergy.type}
            <input type="checkbox" id="${allergy.type.toLowerCase()}" name="allergen" value="${allergy.type}" data-id="${allergy._id}">
            <span class="checkmark"></span>
        </label>`;
    return html;
}





