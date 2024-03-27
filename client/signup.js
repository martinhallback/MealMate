function loadSignUpContent() {
    console.log('Load Sign Up Content');
    $("#signUpContainer").load("signup.html #signup-modal", function () {
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
    // e.preventDefault();
     var host = window.location.protocol + '//' + location.host
     newUserEmail = document.getElementById('email').value;
     newUserName = document.getElementById('name').value;
     newUserPassword = document.getElementById('password').value;
     newUserPhone = document.getElementById('pnum').value;
     newUserUni = document.getElementById('university').value;
     newUserSID = document.getElementById('studentid').value;
 
     $.ajax({
       url: host + '/sign-up',
       type: 'POST',
       contentType: 'application/json',
      // headers: {"Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
       data: JSON.stringify({
           email: newUserEmail,
           name : newUserName,
           password : newUserPassword,
           phoneNumber : newUserPhone,
           university : newUserUni,
           studentID : newUserSID,
       }),
       success: function() {
         console.log('signed up');
        $('#signup-modal').modal('hide');
     }
   });
 }