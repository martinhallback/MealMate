$(document).ready(function () {
  homeview();
  $(".footer").load("footer.html", function () {});
  //$('.footer').fadeIn();
  $(window).scrollTop(0);
  

  //$('li.nav-item a.nav-link').click(function (e) {
  $('li.nav-item a.nav-link, .navbar-brand.larger-text').click(function (e) {
    e.preventDefault();
      var linkText = $(this).text();
      switch (linkText) {
        case 'MealMate':
          console.log('Hemknapp');
          homeview();
          break;
        case 'Sell':
              
          break;
        case 'Contact':
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