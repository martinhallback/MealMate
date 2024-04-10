function loadSignUpContent() {
    console.log('Load Sign Up Content');
    $("#signupContainer").load("signup.html #signup-modal", function () {
      showSignUpModal();
    });
}
  
function showSignUpModal(){
    $('#signup-modal').modal('show');

    $('#email, #name, #password, #pnum, #university, #studentid').on('input', function() {
        checkFormValidity();
    });

    $("#signUpBtn").off().on('click', function (e) {
      console.log('Signup klickat');
      postNewUser();
    });
    // Add event listener to the "Already have an account?" link
    $('#loginLink').on('click', function (event) {
      event.preventDefault(); // Prevent the default action of the link
      // Hide the signup modal
      $('#signup-modal').modal('hide');
      // Load and show the login modal
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
  newUserEmail = document.getElementById('email').value;
  newUserName = document.getElementById('name').value;
  newUserPassword = document.getElementById('password').value;
  newUserPhone = document.getElementById('pnum').value;
  newUserUni = document.getElementById('university').value;
  newUserSID = document.getElementById('studentid').value;
  
  postSignUp(newUserEmail, newUserName, newUserPassword, newUserPhone, newUserUni, newUserSID, function(response){
    if(response){
      $('#signup-modal').modal('hide');
    }
  }); 
 }