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