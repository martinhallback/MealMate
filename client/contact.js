//contact.js
$(document).ready(function(){
    $('.faqQuestion').click(function(){
        console.log($(this).text());  // Log the text of the clicked question
        console.log($(this).find('.answer'));  // Log the selected answer element
        $(this).find('.answer').slideToggle();  // Toggle the answer
    });
  });
  
