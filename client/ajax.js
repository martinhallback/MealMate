host = window.location.protocol + '//' + location.host

//GET a single ad based on id
function getAd(id, callback){
$.ajax({
  url: host + '/ad/' + id,
  type: 'GET',
  contentType: 'application/json',
  success: function(response){
    callback(response)
  },
  error: function(JQxhr, status, error){
    console.log(error);
    callback(null)
  }
});
}

//GET all ads
function getAds(callback){
  $.ajax({
    url: host + '/ads',
    type: 'GET',
    contentType: 'application/json',
    success: function(response){
      callback(response);
    },
    error: function(JQxhr, status, error){
      console.log(error);
      callback(null);
    }
  });
}

//GET a single user based on userID
function getUser(userID, callback){
  $.ajax({
    url: host + '/user/' + userID,
    type: 'GET',
    contentType: 'application/json',
    success: function(response){
      callback(response);
    },
    error: function(JQxhr, status, error){
      console.log("Error fetching user: " + error);
      callback(null);
    }
  });
}

function getAllergies(callback){
    $.ajax({
        url: host + '/allergies',
        type: 'GET',
        success: function(allergies) {
          callback(allergies);
        },
        error: function(error) {
          console.error("Error fetching allergies: ", error);
          callback(null);
        }
    });
}

function getProteins(callback){
  $.ajax({
      url: host + '/proteins',
      type: 'GET',
      success: function(allergies) {
        callback(allergies);
      },
      error: function(error) {
        console.error("Error fetching proteins: ", error);
        callback(null);
      }
  });
}

function postLogin(email, password, callback){
    $.ajax({
        url: host + '/login',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            email,
            password,
        }),
        success: function(response) {
            callback(response, null);
        }, 
        error: function(JQxhr, status, error) {
            console.error('Error: ' + error);
            if (JQxhr.status === 401) {
              callback(null, 'Incorrect email address or password. Please try again.');
            } else {
              callback(null, null);
            }
        }
    });
}

function postSignUp(email, name, password, phoneNumber, university, studentID, callback){
  $.ajax({
    url: host + '/sign-up',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
        email: email,
        name : name,
        password : password,
        phoneNumber: phoneNumber,
        university : university,
        studentID : studentID,
    }),
    success: function() {
      callback(true)
    },
    error: function(JQxhr, status, error){
      console.log('Error when signing up: ' + error)
      callback(false)
    },
  });
}

function postAd(userID, dishName, cookDate, imagePath, description, quantity, portionPrice, protein, allergy, callback){
  getUser(userID, function(user){
    if(user){
      $.ajax({
        url: host + '/ad',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            user: {
              _id : user._id,
              email : user.email,
              isVerified : user.isVerified
            },
            ad : {
              dishName: dishName,
              cookDate: cookDate,
              imagePath: imagePath, //image ej implementerat än?
              description: description,
              quantity: quantity,
              portionPrice: portionPrice,
              protein: protein,
              allergy: allergy
            },
        }),
        success: function() {
          callback(true)
        },
        error: function(JQxhr, status, error){
          console.log('Error when posting ad: ' + error)
          callback(false)
        },
      });
    }
  });
  
}

function postPurchase(totalPrice, quantity, buyerID, sellerID, ad, callback){
  $.ajax({
    url: host + '/purchase',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
        totalPrice:  totalPrice,
        quantity: quantity,
        buyer: buyerID,
        seller: sellerID,
        advertisment: ad,
    }),
    success: function() {
        callback(true);
    }, 
    error: function(JQxhr, status, error) {
        console.error('Error: ' + error);
        callback(false);
    }
  });
}

function deleteAd(id){
  $.ajax({
    url: host + '/ad/' + id,
    type: 'DELETE',
    contentType: 'application/json',
    success: function() {
    }, 
    error: function(JQxhr, status, error) {
        console.error('Error: ' + error);
    }
  });
}

function putAd(id, quantity){
  $.ajax({
    url: host + '/ad/' + id,
    type: 'PUT',
    contentType: 'application/json',
    data: JSON.stringify({
      quantity: quantity,
  }),
    success: function() {
        
    }, 
    error: function(JQxhr, status, error) {
        console.error('Error: ' + error);
    }
  });
}


