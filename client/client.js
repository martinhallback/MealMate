$(document).ready(function () {

  var token = sessionStorage.getItem('auth');
  var signedIn = token !== null && token !== undefined;
  $('.nav-link#loginLink').toggleClass('d-none', signedIn);
  $('.nav-link#signupLink').toggleClass('d-none', signedIn);
  $('.nav-link#logoutLink').toggleClass('d-none', !signedIn);
  $('.nav-link#adminLink').toggleClass('d-none', !signedIn);
  $('.navbar-profile#profile').toggleClass('d-none', !signedIn);


  loadFooter();

  homeview();
 
  $(window).scrollTop(0);

  $(".navbar-basket").click(function (e) {
    shoppingcartView();
  });
  $(".navbar-profile").click(function (e) {
    loadMyProfile();
  });
  
    $('li.nav-item a.nav-link, .navbar-brand.larger-text, .navbar-basket.ml-auto').click(function (e) {
      e.preventDefault();
      var linkText = $(this).text();
      handleNavigationLinks(linkText);
    });    
});

function loadFooter(){
  $("#footer").load("footer.html .footer", function(){
    $('#footer').on('click', 'a', function (e) {
      e.preventDefault();
      var linkText = $(this).text();
      handleNavigationLinks(linkText);
    });
  }); 

}

function handleNavigationLinks(linkText){
  switch (linkText) {
    case 'MealMate':
    case 'Lunchboxes':
      homeview();
      break;
    case 'Sell':
    case 'Sell Lunchboxes':
      sellview();    
      break;

    case 'About Us':
      $('.container').empty();
      $(".container").load("contact.html .contactContainer", function () {});
        break;
        
    case 'Sign up':
        loadSignUpContent();
        break;

    case 'Log in':
      loadLogInContent();
      break;
          
    case 'Log out':
      logOutUser();
      break;
    case 'My Profile':
      loadMyProfile();
      break;
    case 'Admin':
      loadAdminView();
      break;
  }

}

