function loadSignUpContent() {
    console.log('Load Sign Up Content');
    $("#signUpContainer").load("signup.html #signup-modal", function () {
      showSignUpModal();
    });
}
  
function showSignUpModal(){
    $('#signup-modal').modal('show');
    $("#signUpBtn").off().on('click', function (e) {
      console.log('Signup klickat');
      postNewUser();
    });
}
  
function loadLogInContent() {
    console.log('Load Log in Content');
    $("#logInContainer").load("login.html #login-modal", function () {
      showLogInModal();
    });
}
  
function showLogInModal(){
    console.log('showlogin');
    $('#login-modal').modal('show');
    $("#logInBtn").off().on('click', function (e) {
      console.log('Login');
      logInUser();
    });
}
  
function postNewUser() {
   // e.preventDefault();
    var host = window.location.protocol + '//' + location.host
    newUserEmail = document.getElementById('email').value;
    newUserName = document.getElementById('name').value;
    newUserPassword = document.getElementById('password').value;
    $.ajax({
      url: host + '/sign-up',
      type: 'POST',
      contentType: 'application/json',
     // headers: {"Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
      data: JSON.stringify({
          email: newUserEmail,
          name : newUserName,
          password : newUserPassword,
      }),
      success: function() {
        console.log('signed up');
       $('#signup-modal').modal('hide');
    }
  });
}
  
function logInUser(){
    var host = window.location.protocol + '//' + location.host
    var email = $("#email").val();
    var password = $("#password").val();
  
    $.ajax({
        url: host + '/login',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            email,
            password,
        }),
        success: function(response) {
            console.log('login succesful');
            sessionStorage.setItem('auth', JSON.stringify(response))
            $('#login-modal').modal('hide');
        }
    });
}