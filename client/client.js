$(document).ready(function () {
  $("#footer").load("footer.html .footer");
  var token = sessionStorage.getItem('auth');
  var signedIn = token !== null && token !== undefined;
    $('.nav-link#loginLink').toggleClass('d-none', signedIn);
    $('.nav-link#signupLink').toggleClass('d-none', signedIn);
    $('.nav-link#logoutLink').toggleClass('d-none', !signedIn);
   

  homeview();
 
  $(window).scrollTop(0);

  $(".navbar-basket").click(function (e) {
    console.log('Basket');
    shoppingcartView();
    
  });
  $(".navbar-profile").click(function (e) {
    $('.container').empty();
    $(".container").load("profile.html .profileContainer", function () {});
  });
  
    $('li.nav-item a.nav-link, .navbar-brand.larger-text, .navbar-basket.ml-auto').click(function (e) {
      e.preventDefault();
      var linkText = $(this).text();
      switch (linkText) {
        case 'MealMate':
          console.log('Hemknapp');
          homeview();
          break;
        case 'Sell':
          sellview();    
          break;

        case 'Contact':
          $('.container').empty();
          $(".container").load("contact.html .contactContainer", function () {});
            break;
            
        case 'Sign up':
            loadSignUpContent();
            break;

        case 'Log in':
          loadLogInContent();
          break;

        default:
              
        case 'Log out':
          logOutUser();
          break;
      }
  
    });
    
});