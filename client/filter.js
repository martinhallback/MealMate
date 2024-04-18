$(document).ready(function(){
    $('#RectangularFilterContainer').hide();
    $('#PillFilterContainer').hide();
    var isRectangularVisible = false;
    var isAnimating = false;
   // var isDropdownVisible = false;

   getAllergies(function(allergies){
    allergies.forEach(function(allergy) {
        var checkbox = $('<label><input type="checkbox" name="' + allergy._id  + '" value="' + allergy.type  + '" data-type="allergyType"> ' + allergy.type + '</label><br>');
        $('#optionsForm').append(checkbox);
    });
});

    getProteins(function(proteins){
        proteins.forEach(function(protein) {
            if (protein.type != 'Other') {
            var checkbox = $('<div class="' + protein.source + '"><label><input type="checkbox" name="' + protein._id  + '" value="' + protein.type  + '" id="' + protein.source + '" data-type="proteinSource"> ' + protein.type + '</label></div>');
            $('#proteinForm').append(checkbox);
            }
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
            $('.adContainer').css('padding-left', '190px');
        } else if (isRectangularVisible) {
            $('#RectangularFilterContainer').slideToggle().promise().done(function() {
                $('#dropdown').hide();
                $('.adContainer').css('padding-left', '30px');
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
//});

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

//$('#select-dairy-box').click(function() {
 //   $(this).toggleClass('active-click'); 
  //  $('#proteinForm .Vegetarian').toggle();
//});

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

function addSingleProtein(data){
    if (!proteinSource.includes(data)){
    proteinSource.push(data);
    }
}

function removeSingleProtein(data){
    const index = proteinSource.indexOf(data);
    if (index > -1) {
        proteinSource.splice(index, 1);
    }
}

function applyFilters() {
    const allergy = [];
    const portionPrice = document.getElementById('priceRange').value;
    const proteinType = [];
    const proteinSource = [];

    const allergyType_checkboxes = document.querySelectorAll('input[type="checkbox"][data-type="allergyType"]');
    const proteinType_checkboxes = document.querySelectorAll('input[type="checkbox"][data-type="proteinSource"]');
    const dietPref_checkboxes = document.querySelectorAll('input[type="checkbox"][data-type="dietPref"]');

   

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

    dietPref_checkboxes.forEach(proteinSource_checkbox => {
            if (proteinSource_checkbox.checked && proteinSource_checkbox.name === 'Pescitarian' && !proteinSource.includes('Meat', 'Poultry')) {
                proteinSource.push('Meat', 'Poultry');
            } 

            if (proteinSource_checkbox.checked && proteinSource_checkbox.name === 'Vegetarian' && proteinSource.includes('Meat', 'Poultry')) {
                proteinSource.push('Fish', 'Seafood');
            } else if (proteinSource_checkbox.checked && proteinSource_checkbox.name === 'Vegetarian' && !proteinSource.includes('Meat', 'Poultry')){
                proteinSource.push('Meat', 'Poultry','Fish', 'Seafood');
            }

            if (proteinSource_checkbox.checked && proteinSource_checkbox.name === 'Vegan' && proteinSource.includes('Meat', 'Poultry', 'Fish', 'Seafood')) {
                proteinSource.push('Vegetarian');
            } else if (proteinSource_checkbox.checked && proteinSource_checkbox.name === 'Vegan' && !proteinSource.includes('Meat', 'Poultry','Fish', 'Seafood')){
                proteinSource.push('Meat', 'Poultry','Fish', 'Seafood', 'Vegetarian');
            }
    });

    if ($('#select-meat-box').hasClass('active-click')) {
        proteinSource.push('Meat');
    }
    if ($('#select-fish-box').hasClass('active-click')) {
        proteinSource.push('Fish');
    }
    if ($('#select-poultry-box').hasClass('active-click')) {
        proteinSource.push('Poultry');
    }
    if ($('#select-shellfish-box').hasClass('active-click')) {
        proteinSource.push('Seafood');
    }
    if ($('#select-plantbased-box').hasClass('active-click')) {
        proteinSource.push('Vegetarian', 'Vegan');
    }
    //if ($('#select-dairy-box').hasClass('active-click')) {
   //     proteinSource.push('Vegan');
   // }

    filteringAds(allergy, proteinType, proteinSource, portionPrice, function(ads){
        homeview(ads);
    });
    console.log(allergy, proteinType, proteinSource, portionPrice);

}

