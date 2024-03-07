$(document).ready(function () {
  homeview();
  $('li.nav-item a.nav-link').click(function (e) {
    e.preventDefault();
      var linkText = $(this).text();
      switch (linkText) {
        case 'MealMate':
          homeview();
          break;
        case 'Sell':
              
          break;
        case 'Contact':
              
              break;
            
            case 'Sign up':
              loadSignUpContent();
            break;

            case 'Log in':
            loadLogInContent();
            break;

            default:
              
          }
    });
    
});

function homeview(){
  $('.container').empty();
  $('.container').append('<h2 class="foodNearMe">Food near me</h2>');
  $('.container').append('<div class="adcontainer">' + '</div>');

  var cardData = [ // remove when list from backend is finished
    { 
        imgSrc: 'Images/TestFoodImage.jpg',
        title: 'Card Title 1',
        text: 'Some quick example text for card 1.',
        extraInfo: 'Some extra info for card 1'
    },
    { 
        imgSrc: 'Images/TestFoodImage.jpg',
        title: 'Card Title 2',
        text: 'Some quick example text for card 2.',
        extraInfo: 'Some extra info for card 2'
    },
  ];

  $.each(cardData, function(index, card) {
    var cardHtml = '<div class="card">' +
                        '<div class="card-body">' +
                            '<img src="' + card.imgSrc + '" class="card-img-top" alt="...">' +
                            '<h5 class="card-title">' + card.title + '</h5>' +
                            '<p class="card-text">' + card.text + '</p>' +
                            '<button type="button" class="btn">Buy</button>' +
                        '</div>' +
                    '</div>';

    $('.adcontainer').append(cardHtml);

    //add button handler for Buy button and call foodAdModal() when pressed
  });
}


function foodAdModal(card){
  var modalHtml = '<div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
                                '<div class="modal-dialog">' +
                                    '<div class="modal-content">' +
                                        '<div class="modal-header">' +
                                            '<h5 class="modal-title" id="exampleModalLabel">'+ card.title +'</h5>' +
                                            '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
                                        '</div>' +
                                        '<div class="modal-body">' +
                                            '<p>' + card.extraInfo + '</p>' + 
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>';
}
//document.getElementById>("#Example").innerhtml = //Source path till signup.html

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


