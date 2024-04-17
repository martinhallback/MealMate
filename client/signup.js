function loadSignUpContent() {
  $("#signupContainer").load("signup.html #signup-modal", function () {
      showSignUpModal();
  });
}

function showSignUpModal(){
  $('#signup-modal').modal('show');

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

  postSignUp(newUserEmail, newUserName, newUserPassword, newUserPhone, newUserUni, newUserSID, function(response){
      if(response){
          $('#signup-modal').modal('hide');
      }
  }); 
}
