$(document).ready(function () {
  homeview();
  $(".footer").load("footer.html", function () {});

  $(window).scroll(function () {
     // Calculate the bottom position of the window
     var bottomWindow = $(window).scrollTop() + $(window).height();
     // Calculate the height of the document
     var documentHeight = $(document).height();

     // Check if the bottom of the window is at the bottom of the document
     if (bottomWindow + 10 >= documentHeight) {
      console.log("fade in footer");
         $('.footer').fadeIn();
     } else {
         $('.footer').fadeOut();
     }
  });

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







