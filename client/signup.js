function loadSignUpContent() {
  $("#signupContainer").load("signup.html #signup-modal", function () {
      showSignUpModal();
  });
}

function showSignUpModal(){
  $('#signup-modal').modal('show');

  getUniversities(function (unis) {
    var uniDropdown = document.getElementById("university");
    uniDropdown.innerHTML = '';
    var defaultOption = document.createElement("option");
    defaultOption.value = "";
    uniDropdown.add(defaultOption);

    unis.forEach(function(uni) {
        var option = document.createElement("option");
        option.text = uni.name;
        option.value = uni._id
        uniDropdown.add(option);
    })
});

  $('#signupEmail, #name, #signupPassword, #pnum, #university, #studentid').on('input', function() {
      checkFormValidity();
  });

  $("#signUpBtn").off().on('click', function (e) {
      postNewUser();
  });
  $('#redirectLogin').on('click', function (event) {
      event.preventDefault(); 
      $('#signup-modal').modal('hide');
      loadLogInContent();
  });
}

function checkFormValidity(){
  let form = document.getElementById("Signupform");
  if (form.checkValidity()) {
      $("#signUpBtn").prop('disabled', false);
  } else {
      $("#signUpBtn").prop('disabled', true);
  }
}

function postNewUser() {
  newUserEmail = document.getElementById('signupEmail').value;
  newUserName = document.getElementById('name').value;
  newUserPassword = document.getElementById('signupPassword').value;
  newUserPhone = document.getElementById('pnum').value;
  newUserUni = document.getElementById('university').value;
  newUserSID = document.getElementById('studentid').value;

  postSignUp(newUserEmail, newUserName, newUserPassword, newUserPhone, newUserUni, newUserSID, function(response, error){
      if (response) {
          $('#signup-modal').modal('hide').on('hidden.bs.modal', function () {
            alert("You have successfully signed up to MealMate. Please log in using your chosen email and password.")
          });
      } else if (error) {
        $('#alreadyExistingEmailError').text(error);
      }
  }); 
}
