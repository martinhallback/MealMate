$(document).ready(function(){
    $('#RectangularFilterContainer').hide();
    $('#PillFilterContainer').hide();
    var isRectangularVisible = false;
    var isAnimating = false;
   // var isDropdownVisible = false;
   getAllergies(function(allergies){
    allergies.forEach(function(allergy) {
        // Assuming 'type' is the property that holds the name of the allergy
        var checkbox = $('<label><input type="checkbox" name="' + allergy._id  + '" value="' + allergy.type  + '" data-type="allergyType"> ' + allergy.type + '</label><br>');
        $('#optionsForm').append(checkbox);
    });
   });
    
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

priceRange.addEventListener('input', function() {
    const value = this.value;
    if (value < 100) {
        priceValue.textContent = value + 'kr';
    } else if (value >= 100) {
        priceValue.textContent = '+' + value + 'kr';
    }
    
});

function applyFilters() {
    const selectedOptions = {
        dietaryPreferences: [],
        allergies: [], // Assuming you'll later populate this dynamically
        maxPrice: document.getElementById('priceRange').value // Get the value of the price range
    };

    // Get all checkbox inputs
    const dietPref_checkboxes = document.querySelectorAll('input[type="checkbox"][data-type="dietPref"]');
    const allergyType_checkboxes = document.querySelectorAll('input[type="checkbox"][data-type="allergyType"]');

    // Iterate over each checkbox to see if it's checked
    dietPref_checkboxes.forEach(dietPref_checkbox => {
        if (dietPref_checkbox.checked) {
            selectedOptions.dietaryPreferences.push(checkbox.name); // Add the name of the checkbox to the array
        }
    });

    allergyType_checkboxes.forEach(allergyType_checkbox => {
        if (allergyType_checkbox.checked) {
            selectedOptions.allergies.push(checkbox.name); // Add the name of the checkbox to the array
        }
    });

    // Log the selected options to the console
    console.log(selectedOptions);
    alert(selectedOptions);
}
