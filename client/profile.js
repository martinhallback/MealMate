// profile.js

function loadMyProfile() {
$(document).ready(function () {
    $('.container').empty();
    $(".container").load("accountdetails.html .profileContainer", function () {
        loadAccountdetails();
    });

    $(".container").on("click", ".reviewBtn", function () { 
        $('#reviewModal').modal('show');
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
        console.log('Purchase history button clicked');
        $('.container').empty();
        $(".container").load("purchasehistory.html .profileContainer", function () { 
            var userID = JSON.parse(sessionStorage.getItem('auth')).user;
            getPurchases(userID, 'buyer', function(purchases){
                console.log(purchases)
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

    $(".container").on("click", "#submitReview", function () {
        console.log("Clicked on the submit review button");
        $('#reviewModal').modal('hide');
        const index = parseInt(document.getElementById("reviewModal").getAttribute("data-index"));
        const reviewText = document.getElementById("reviewText").value;
        purchases[index].review = reviewText;

        // Close review modal
        $('#reviewModal').modal('hide');

        // Display review text modal
        $('#reviewTextContent').text(reviewText);
        $('#reviewTextModal').modal('show');
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
                    <button type="button" class="btn btn-primary reviewBtn" data-toggle="modal" data-target="#reviewModal" data-index="${index}">
                        Give Review
                    </button>
                </td>
            ` : ''}
        `;
        tableBody.appendChild(row);
    });
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