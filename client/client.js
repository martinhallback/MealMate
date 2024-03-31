$(document).ready(function () {
  $(".footer").load("footer.html");
  homeview();
  //$('.footer').fadeIn();
  $(window).scrollTop(0);

  $(".navbar-basket").click(function (e) {
    console.log('Basket');
    
  });
  $(".navbar-profile").click(function (e) {
    console.log('Profile');
    
  });
  

  //$('li.nav-item a.nav-link').click(function (e) {
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
        
        case 'navbar-basket-button':
        console.log('Basket1');
        default:
              
      }
  
    });
    
});