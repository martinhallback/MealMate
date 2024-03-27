$(document).ready(function () {
  homeview();
  $("#footer").load("footer.html .footer", function () {});
  
  $(window).scrollTop(0); //ensuring start on the top of the page
  

  $('li.nav-item a.nav-link, .navbar-brand.larger-text').click(function (e) {
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
              
      }
  
    });
    
});
