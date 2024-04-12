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

    $.ajax({
        url: '/proteins', // Adjust the URL based on your application's routing
        type: 'GET',
        success: function(proteins) {
            proteins.forEach(function(protein) {  
                if (protein.type !== "Other") {
                // Assuming 'type' is the property that holds the name of the allergy
                var checkbox = $('<div class="' + protein.source + '"><label><input type="checkbox" name="' + protein._id  + '" value="' + protein.type  + '" id="' + protein.source + '" data-type"proteinSort")> ' + protein.type + '</label></div>');
                $('#proteinForm').append(checkbox);
                }
            });
        },
        error: function(error) {
            console.error("Error fetching proteins: ", error);
        }
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

$('#PescitarianSelected').click(function() {
    if ($(this).prop('checked')) {
        $('#select-poultry-box, #select-meat-box').addClass('active-click');
        $('#proteinForm .Meat, .Poultry').hide();
    } else {
        $('#select-poultry-box, #select-meat-box').removeClass('active-click');
        $('#proteinForm .Meat, .Poultry').show();
    }
});

$('#VegetarianSelected').click(function() {
    if ($(this).prop('checked')) {
        $('#select-poultry-box, #select-meat-box, #select-fish-box, #select-shellfish-box').addClass('active-click');
        $('#proteinForm .Meat, .Poultry, .Fish, .Seafood').hide();
    } else {
        $('#select-poultry-box, #select-meat-box, #select-fish-box, #select-shellfish-box').removeClass('active-click');
        $('#proteinForm .Meat, .Poultry, .Fish, .Seafood').show();
    }
});

$('#VeganSelected').click(function() {
    if ($(this).prop('checked')) {
        $('#select-poultry-box, #select-meat-box, #select-fish-box, #select-shellfish-box, #select-dairy-box').addClass('active-click');
        $('#proteinForm .Meat, .Poultry, .Fish, .Seafood, .Vegetarian').hide();
    } else {
        $('#select-poultry-box, #select-meat-box, #select-fish-box, #select-shellfish-box, #select-dairy-box').removeClass('active-click');
        $('#proteinForm .Meat, .Poultry, .Fish, .Seafood, .Vegetarian').show();
    }
});
$('#proteinForm .Meat, .Poultry').hide();

$('#select-poultry-box').click(function() {
    $(this).toggleClass('active-click'); 
    $('#proteinForm .Poultry').toggle();
});

$('#select-meat-box').click(function() {
    $(this).toggleClass('active-click'); 
    $('#proteinForm .Meat').toggle();
});

$('#select-fish-box').click(function() {
    $(this).toggleClass('active-click'); 
    $('#proteinForm .Fish').toggle();
});

$('#select-shellfish-box').click(function() {
    $(this).toggleClass('active-click'); 
    $('#proteinForm .Seafood').toggle();
});

$('#select-plantbased-box').click(function() {
    $(this).toggleClass('active-click'); 
    $('#proteinForm .Vegan').toggle();
});

$('#select-dairy-box').click(function() {
    $(this).toggleClass('active-click'); 
    $('#proteinForm .Vegetarian').toggle();
});

$('#select-box').click(function() {
   $('#dropdown').slideToggle(function() {
    if ($('#dropdown').is(':visible')) {
        $('.PricePref').css('margin-top', '145px');
    } else {
        $('.PricePref').css('margin-top', '20px');
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

$('#allergy-closeX').click(function() {
    $('#dropdown').slideToggle(function() {
        if ($('#dropdown').is(':visible')) {
            $('.PricePref').css('margin-top', '145px');
        } else {
            $('.PricePref').css('margin-top', '20px');
        }
    });
});

$('#select-protein-box').click(function() {
    $('#protein-dropdown').slideToggle(function() {
 });
     document.getElementById('protein-dropdown').addEventListener('change', function() {
            let selected = [];
            document.querySelectorAll('#protein-dropdown input[type="checkbox"]:checked').forEach(item => {
              selected.push(item.value);
            });
            if (selected.length > 0) {
              document.querySelector('.select-protein-box').textContent = selected.join(', ');
              } else {
               document.querySelector('.select-protein-box').textContent = "↓ Exclude specific proteins";
              }
          });
 });
 
 $('#protein-closeX').click(function() {
     $('#protein-dropdown').slideToggle
     (function() {
     });
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
   // const dietaryPreferences = [];
    const allergiesToAdd = [];

    const allergy = [];
    const portionPrice = document.getElementById('priceRange').value;
    const proteinType = [];
    const proteinSource = [];

    const allergyType_checkboxes = document.querySelectorAll('input[type="checkbox"][data-type="allergyType"]');
    const proteinType_checkboxes = document.querySelectorAll('input[type="checkbox"][data-type="proteinSort"]');
    

    allergyType_checkboxes.forEach(allergyType_checkbox => {
        if (allergyType_checkbox.checked && !allergy.includes(allergyType_checkbox.name)) {
            allergy.push(allergyType_checkbox.name); 
        }
    });

    proteinType_checkboxes.forEach(proteinType_checkbox => {
        if (proteinType_checkbox.checked && !proteinType.includes(proteinType_checkbox.name)) {
            proteinType.push(proteinType_checkbox.name); 
        }
    });

    console.log(allergy, proteinType, proteinSource, portionPrice);
}

