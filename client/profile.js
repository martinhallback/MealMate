// profile.js

function loadMyProfile() {
$(document).ready(function () {
    $('.container').empty();
    $(".container").load("profile.html .profileContainer", function () { });
    
  
    $(".container").on('click', '#accountbutton', function (e) {
      e.preventDefault(); // Prevent the default behavior of the anchor element
      console.log('Account button clicked');
      $('.container').empty();
      $(".container").load("accountdetails.html .profileContainer", function () { 
        var user = JSON.parse(sessionStorage.getItem('auth')).user
        var accountEmail = document.getElementById("accountEmail");
        var accountRating = document.getElementById("accountRating");
        var accountVerification = document.getElementById("accountVerification");

        accountEmail.textContent = user.email;
        accountVerification.textContent = user.isVerified;
        // accountRating.textContent = user.
    });
    });
  
    $(".container").on('click', '#purchaseHistoryBtn', function (e) {
      e.preventDefault(); // Prevent the default behavior of the anchor element
      console.log('Setting button clicked');
      $('.container').empty();
      $(".container").load("purchasehistory.html .profileContainer", function () { });
    });
  
    $(".container").on('click', '#soldProductsbutton', function (e) {
      e.preventDefault(); // Prevent the default behavior of the anchor element
      console.log('Setting button clicked');
      $('.container').empty();
      $(".container").load("accountdetails.html .profileContainer", function () { });
    });
  
    $(".container").on('click', '#settingsbutton', function (e) {
      e.preventDefault(); // Prevent the default behavior of the anchor element
      console.log('Setting button clicked');
      $('.container').empty();
  
      $(".container").load("settings.html .profileContainer", function () { 
          var user = JSON.parse(sessionStorage.getItem('auth')).user;
          loadUser(user);
          loadUniversities();
      });
    });
});
}

function loadUser(id) {
    $.ajax({
        url: host + '/user/' + id + '/full', 
        type: 'GET',
        contentType:"application/json",
        success: function(user) {
            var settingsform = document.getElementById("settingsForm");
            settingsform.elements["settingName"].value = user.name;
            settingsform.elements["settingPhoneNumber"].value = user.phoneNumber;
            settingsform.elements["settingPNumber"].value = user.PNumber;
            settingsform.elements["settingUniversity"].value = user.university;
            settingsform.elements["settingStudentID"].value = user.studentID;
            settingsform.elements["settingAddress"].value = user.address;
        }
    })
}

function loadUniversities() {
    $.ajax({
        url: host + '/universities', 
        type: 'GET',
        contentType:"application/json",
        success: function(unis) {
            var uniDropdown = document.getElementById("settingUniversity");

            unis.forEach(function(uni) {
                var option = document.createElement("option");
                option.text = uni.name;
                uniDropdown.add(option);
            });
        }
    })
}
  

function saveSettings() {
    var name = document.getElementById("settingName").value;
    var phoneNumber = document.getElementById("settingPhoneNumber").value;
    var PNumber = document.getElementById("settingPNumber").value;
    var university = document.getElementById("settingUniversity").value;
    var studentID = document.getElementById("settingStudentID").value;
    var address = document.getElementById("settingAddress").value;
    //password

    updateSettings(name, phoneNumber, PNumber, university, studentID, address); //Och password
}

function updateSettings(name, phoneNumber, PNumber, university, studentID, address) {
    var id = JSON.parse(sessionStorage.getItem('auth')).user

    var settingsData = {
        'name': name,
        'phoneNumber': phoneNumber,
        'PNumber': PNumber,
        'university': university,
        'studentID': studentID,
        'address': address
        //password
    } 

    $.ajax({
        url: host + '/user/' + id, 
        type: 'PUT',
        contentType:"application/json",
        data: JSON.stringify(settingsData),
        success: function() {
            loadMyProfile();
        }
    })
}
