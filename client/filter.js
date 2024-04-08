$(document).ready(function(){
    $('#RectangularFilterContainer').hide();
    $('#PillFilterContainer').hide();
    var isRectangularVisible = false;
    var isAnimating = false;
   // var isDropdownVisible = false;
    
    
    $('#CicularFilterContainer').mouseenter(function() {
        if (isAnimating) return; 
        isAnimating = true;
        $('#PillFilterContainer').css({
            opacity: 0,
            width: 50, 
        }).show().animate({
            opacity: 1,
            width: 150, 
        }, 500, function() {
            isAnimating = false; 
        });
        $('#CircleFilterContainer').hide();

   });

    $('#PillFilterContainer').mouseleave(function() {
        if (!isRectangularVisible && !isAnimating) {
            isAnimating = true;
            $('#CircleFilterContainer').show();
            $(this).animate({
                opacity: 0,
                width: 50, 
            }, 500, function() {
                $(this).hide();
                $('#CicularFilterContainer').show();
                isAnimating = false; 
            });
        }
   });

    $('#PillFilterContainer').click(function() {
        if (!isRectangularVisible) {
            $(this).show();
            $('#RectangularFilterContainer').slideToggle();
            isRectangularVisible = true;
        } else if (isRectangularVisible) {
            $('#RectangularFilterContainer').slideToggle().promise().done(function() {
                $('#dropdown').hide();
               // isDropdownVisible = false;
                isAnimating = true;
                $('#PillFilterContainer').animate({
                    opacity: 0,
                    width: 50, 
                }, 500, function() {
                    $(this).hide();
                    isRectangularVisible = false;
                    isAnimating = false;
                });
            });
        }
    });
});

$('#select-box').click(function() {
   $('#dropdown').slideToggle(function() {
    if ($('#dropdown').is(':visible')) {
        $('.priceRangeTitle').css('margin-top', '145px');
    } else {
        $('.priceRangeTitle').css('margin-top', '20px');
    }
});
    document.getElementById('optionsForm').addEventListener('change', function() {
           let selected = [];
           document.querySelectorAll('#optionsForm input[type="checkbox"]:checked').forEach(item => {
             selected.push(item.value);
           });
           if (selected.length > 0) {
             document.querySelector('.select-box').textContent = selected.join(', ');
             } else {
              document.querySelector('.select-box').textContent = "↓ Select allergies";
             }
         });
});

$('#closeX').click(function() {
    $('#dropdown').slideToggle(function() {
        if ($('#dropdown').is(':visible')) {
            $('.priceRangeTitle').css('margin-top', '145px');
        } else {
            $('.priceRangeTitle').css('margin-top', '20px');
        }
    });
});




//function toggleDropdown() {
//    var dropdown = document.getElementById("dropdown");
//    dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
 // }
  


priceRange.addEventListener('input', function() {
    const value = this.value;
    if (value < 100) {
        priceValue.textContent = value + 'kr';
    } else if (value >= 100) {
        priceValue.textContent = '+' + value + 'kr';
    }
    
});