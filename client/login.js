function loadLogInContent() {
    $("#loginContainer").load("login.html #login-modal", function () {
        showLogInModal();
        $('#redirectSignup').on('click', function(event) {
            event.preventDefault(); 
            $('#login-modal').modal('hide');
            loadSignUpContent();
        });
    });
}

function showLogInModal(){
    $('#login-modal').modal('show');
    $("#logInBtn").off().on('click', function (e) {
        logInUser();
    });
}

function logInUser(){
    var host = window.location.protocol + '//' + location.host
    var email = $("#email").val();
    var password = $("#password").val();
    postLogin(email, password, function(response, error){
        if(response){
            sessionStorage.setItem('auth', JSON.stringify(response))
            $('#login-modal').modal('hide');
            $('#loginLink').toggleClass('d-none', true);
            $('#signupLink').toggleClass('d-none', true);
            $('#logoutLink').toggleClass('d-none', false);
        }else if(error){           
            $('#passwordError').text(error);
        }
    });
}

function logOutUser(){
    $("#loginContainer").load("login.html #logout-modal", function () {
        $('#logout-modal').modal('show');
        $("#logoutBtn").off().on('click', function (e) {
            sessionStorage.removeItem('auth');
            $('#loginLink').toggleClass('d-none', false);
            $('#signupLink').toggleClass('d-none', false);
            $('#logoutLink').toggleClass('d-none', true);
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
