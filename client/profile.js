// profile.js

function loadMyProfile() {
$(document).ready(function () {
    $('.container').empty();
    $(".container").load("accountdetails.html .profileContainer", function () {
        loadAccountdetails();
    });
  
    $(".container").on('click', '#accountbutton', function (e) {
      e.preventDefault(); // Prevent the default behavior of the anchor element
      console.log('Account button clicked');
      $('.container').empty();
      $(".container").load("accountdetails.html .profileContainer", function () { 
        loadAccountdetails();
    });
    });
  
    $(".container").on('click', '#purchaseHistoryBtn', function (e) {
        e.preventDefault();
        $('.container').empty();
        $(".container").load("purchasehistory.html .profileContainer", function () { 
            var userID = JSON.parse(sessionStorage.getItem('auth')).user;
            getPurchases(userID, 'buyer', function(purchases){
                if(!purchases || purchases.length == 0){
                    $('#purchaseTable tbody').append("<p>You have no purchase history</p>")
                }else{
                    populateTable(purchases, true);
                } 
            })
        });


    });
  
    $(".container").on('click', '#soldProductsbutton', function (e) {
        e.preventDefault(); 
        $('.container').empty();
        $(".container").load("soldProducts.html .profileContainer", function () {
            var userID = JSON.parse(sessionStorage.getItem('auth')).user;
            getPurchases(userID, 'seller', function(purchases){
                console.log(purchases)
                if(!purchases || purchases.length == 0){
                    $('#purchaseTable tbody').append("<p>You have no sell history</p>")
                }else{
                    populateTable(purchases, false);
                }
                
            }) 
        });
    });

    $(".container").on('click', '#currentOffersbutton', function (e) {
        e.preventDefault(); 
        console.log('Current offers button clicked');
        $('.container').empty();
        $(".container").load("currentOffers.html .profileContainer", function () {
            loadCurrentOffers();
         });
    });
  
    $(".container").on('click', '#settingsbutton', function (e) {
      e.preventDefault(); 
      console.log('Setting button clicked');
      $('.container').empty();
  
      $(".container").load("settings.html .profileContainer", function () { 
          var userID = JSON.parse(sessionStorage.getItem('auth')).user;
          loadUser(userID, function(usr) {
            setFieldValues(usr)
        });
      });
    });
});
}

function populateTable(purchases, isPurchaseHistory) {
    const tableBody = document.querySelector("#purchaseTable tbody");
    tableBody.innerHTML = ""; // Clear table body before populating

    purchases.forEach((purchase, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${purchase.dishName}</td>
            <td>${purchase.date}</td>
            <td>${purchase.totalPrice}</td>
            <td>${purchase.quantity}</td>
            ${isPurchaseHistory ? `
                <td>
                    <button type="button" class="btn btn-primary reviewBtn" data-toggle="modal" data-target="#reviewModal_${index}">
                        Give Review
                    </button>
                </td>
            ` : ''}
              ${!isPurchaseHistory ? `
                <td>
                    <button type="button" class="btn btn-primary reviewBtn" data-toggle="modal" data-target="#reviewModal_${index}">
                        Customer Review
                    </button>
                </td>
            ` : ''}
        `;
        tableBody.appendChild(row);
        if(isPurchaseHistory){
            createReviewModal(purchase._id, index)
        } else {
            console.log("You are now on the selling page. createViewModal will load next");
            createViewModal(purchase._id, index);
        }
    });
}

function createReviewModal(purchaseID, index){
    var modalHTML = '<div class="modal fade" id="reviewModal_' + index + '" tabindex="-1" role="dialog" aria-labelledby="reviewModalLabel" aria-hidden="true">' +
    '<div class="modal-dialog" role="document">' +
    '<div class="modal-content">' +
    '<form id="reviewForm">' +
    '<div class="modal-header">' +
    '<h5 class="modal-title" id="reviewModalLabel">Give Review</h5>' +
    '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
    '<span aria-hidden="true">&times;</span>' +
    '</button>' +
    '</div>' +
    '<div class="modal-body">' +
    '<textarea id="reviewText_'+index+'" class="form-control" rows="3" placeholder="Write your review here..." required></textarea>' +
    '<div class="mt-3">' +
    '<label for="ratingInput">Rating:</label>' +
    '<div class="rating">' +
    '<input type="radio" id="star1" name="rating" value="1" required>' +
    '<label for="star1">1</label>' +
    '<input type="radio" id="star2" name="rating" value="2" required>' +
    '<label for="star2">2</label>' +
    '<input type="radio" id="star3" name="rating" value="3" required>' +
    '<label for="star3">3</label>' +
    '<input type="radio" id="star4" name="rating" value="4" required>' +
    '<label for="star4">4</label>' +
    '<input type="radio" id="star5" name="rating" value="5" required>' +
    '<label for="star5">5 stars</label>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="modal-footer">' +
    '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>' +
    '<button type="button" class="btn btn-primary" onclick="submitReview(\'' + purchaseID + '\', ' + index + ')" data-dismiss="modal">Submit Review</button>' +
    '</div>' +
    '</form>' +
    '</div>' +
    '</div>' +
    '</div>';

    $(".container").append(modalHTML);
}

function createViewModal(purchaseID, index){
    getPurchase(purchaseID, function(purchase){
        console.log(purchase.reviewText);
        var text;
        var rat;
        if(purchase.reviewText){
            text = purchase.reviewText;
            rat = purchase.sellerRating;
        }else{
            text = "Ingen review given än";
            rat = 0;
        }

        var modalHTML = '<div class="modal fade" id="reviewModal_' + index + '" tabindex="-1" role="dialog" aria-labelledby="reviewModalLabel" aria-hidden="true">' +
        '<div class="modal-dialog" role="document">' +
        '<div class="modal-content">' +
        '<form id="customerReviewForm">' +
        '<div class="modal-header">' +
        '<h5 class="modal-title" id="reviewModalLabel">Customer review of your product</h5>' +
        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
        '<span aria-hidden="true">&times;</span>' +
        '</button>' +
        '</div>' +
         '<div class="modal-body">' +
        '<p id="customerReview" class="form-control" rows="3" required>' + text + '</p>' +
        '<p>Rating: '+ rat +'</p>'
        '<div class="mt-3">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="modal-footer">' +
        '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>' +
        '</div>' +
        '</form>' +
        '</div>' +
        '</div>' +
        '</div>';

        $(".container").append(modalHTML);
    });
     
    console.log("createViewModal has been fully loaded");

}

function submitReview(id, index){
    var review = document.getElementById("reviewText_" + index).value;
    //var review = document.getElementById("reviewText").value;
    console.log(review);
    console.log("Inuti submitReview");
    var rating = document.querySelector('input[name="rating"]:checked').value;
    putPurchase(id, rating, review)

}

function loadAccountdetails() {
    var userID = JSON.parse(sessionStorage.getItem('auth')).user;
    var accountVerification = document.getElementById("accountVerification");
    var accountEmail = document.getElementById("accountEmail");
    var accountRating = document.getElementById("accountRating");

    console.log("Inuti loadAccount");
    getUser(userID, function (usr) {
        accountEmail.text = usr.email;
        if (usr.isVerified)
            accountVerification.text = "Yes";
        else
            accountVerification.text = "No";
        
    })
}

function setFieldValues(usr) {
    var settingsform = document.getElementById("settingsForm");
    settingsform.elements["settingName"].value = usr.name;
    settingsform.elements["settingPhoneNumber"].value = usr.phoneNumber;
    settingsform.elements["settingPNumber"].value = usr.PNumber;
    settingsform.elements["settingStudentID"].value = usr.studentID;
    settingsform.elements["settingAddress"].value = usr.address;

    getUniversities(function (unis) {
        var uniDropdown = document.getElementById("settingUniversity");
        uniDropdown.innerHTML = '';
        var defaultOption = document.createElement("option");
        defaultOption.value = "";
        uniDropdown.add(defaultOption);

        unis.forEach(function(uni) {
            var option = document.createElement("option");
            option.text = uni.name;
            option.value = uni._id
            if (uni._id == usr.university) { 
                option.selected = true; // Pre-select the option
            }
            uniDropdown.add(option);
        })
    });

    getLocations(function (locations) {
        var areaDropdown = document.getElementById("settingArea");
        areaDropdown.innerHTML = '';
        var defaultOption = document.createElement("option");
        defaultOption.value = "";
        areaDropdown.add(defaultOption);

        locations.forEach(function(loc) {
            var option = document.createElement("option");
            option.text = loc.area;
            option.value = loc._id
            if (loc._id == usr.location) { 
                option.selected = true; // Pre-select the option
            }
            areaDropdown.add(option);
        })
    });
}

function saveSettings() {
    var name = document.getElementById("settingName").value;
    var phoneNumber = document.getElementById("settingPhoneNumber").value;
    var PNumber = document.getElementById("settingPNumber").value;
    var university = document.getElementById("settingUniversity").value;
    var studentID = document.getElementById("settingStudentID").value;
    var address = document.getElementById("settingAddress").value;
    var location = document.getElementById("settingArea").value;

    updateSettings(name, phoneNumber, PNumber, university, studentID, address, location);
}

function updateSettings(name, phoneNumber, PNumber, university, studentID, address, location) {
    var userID = JSON.parse(sessionStorage.getItem('auth')).user;

    var settingsData = {
        'name': name,
        'phoneNumber': phoneNumber,
        'PNumber': PNumber,
        'university': university,
        'studentID': studentID,
        'address': address,
        'location': location
    }

    putUser(userID, settingsData, function(response) {
        if (response) {
            loadMyProfile()
        }
    });
}

function changePassword() {
    $('#passwordModal').modal('show');
    document.getElementById("currentPassword").value = '';
    document.getElementById("newPassword").value = '';
}

function savePassword() {
    var userID = JSON.parse(sessionStorage.getItem('auth')).user;
    var currentPassword = document.getElementById("currentPassword").value;
    var newPassword = document.getElementById("newPassword").value;
    
    var passwordData = {
        'currentPassword': currentPassword,
        'newPassword': newPassword
    }

    putPassword(userID, passwordData, function(response, error) {
        if (response) {
            $('#passwordModal').modal('hide');
        } else if (error){           
            $('#currentPasswordError').text(error);
        }
    });
}

function loadCurrentOffers(){
    var userID = JSON.parse(sessionStorage.getItem('auth')).user;
    console.log("current offers")
    filterOnSellerID(userID, function(ads){
        $('#purchaseTable tbody').empty();
        if(!ads || ads.length == 0){
            $('#purchaseTable tbody').append('<p> you have no current ads listed </p>')
        }else{
            ads.forEach(function(ad){
                var row = `<tr>
                    <td>${ad.dishName}</td>
                    <td>${ad.cookDate}</td>
                    <td>${ad.portionPrice * ad.quantity}</td>
                    <td>${ad.quantity}</td>
                    <td><button class="btn btn-danger remove-btn" onclick="removeCurrentAd('${ad._id}', '${userID}')">Remove</button></td>
                    </tr>`;
                $('#purchaseTable tbody').append(row);
            });
        }
    });
}

function removeCurrentAd(id, userID){
    deleteAd(id, userID)
    loadCurrentOffers()
}