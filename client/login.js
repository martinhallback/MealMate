function loadLogInContent() {
    console.log('Load Log in Content');
    $("#loginContainer").load("login.html #login-modal", function () {
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
            $('#logInLink').toggleClass('d-none', true);
            $('#signUpLink').toggleClass('d-none', true);
            $('#logOutLink').toggleClass('d-none', false);
        }, 
        error: function(JQxhr, status, error) {
            if (JQxhr.status === 401) {
                $('#passwordError').text('Incorrect email adress or password. Please try again.');
            } else {
                console.error('Error:', error);
            }
        }
    });
}

function logOutUser(){
    $("#loginContainer").load("login.html #logout-modal", function () {
    $('#logout-modal').modal('show');
    $("#logoutBtn").off().on('click', function (e) {
            sessionStorage.removeItem('auth');
            $('#logInLink').toggleClass('d-none', false);
            $('#signUpLink').toggleClass('d-none', false);
            $('#logOutLink').toggleClass('d-none', true);
            $('#logout-modal').modal('hide');
        });
    });

}

function validateAndSubmit() {
    var email = document.getElementById('email').value;
    var phoneNumber = document.getElementById('pnum').value;
    if (email.indexOf('@') === -1) {
        document.getElementById('emailError').style.display = 'block';
    } else {
        document.getElementById('emailError').style.display = 'none';
    }

    var plusCount = 0;
    for (i = 0; i < phoneNumber.length; i++) {
        if (phoneNumber[i] === '+') {
            plusCount++;
        } else if (isNaN(parseInt(phoneNumber[i]))) {
            document.getElementById('phoneError').style.display = 'block';
            return;
        }
    }

    if (plusCount > 1) {
        document.getElementById('phoneError').style.display = 'block';
    } else {
        document.getElementById('phoneError').style.display = 'none';
    }
}