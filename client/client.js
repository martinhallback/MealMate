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





