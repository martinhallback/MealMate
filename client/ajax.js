host = window.location.protocol + '//' + location.host

//GET a single ad based on id
function getAd(id, callback){
$.ajax({
  url: host + '/ad/' + id,
  type: 'GET',
  contentType: 'application/json',
  beforeSend: function(xhr) {
    const authData = JSON.parse(sessionStorage.getItem('auth'));
    const token = authData ? authData.token : null;
    if (token) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    }
  },
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

//Filter ads
function filteringAds(allergy, proteinType, proteinSource, portionPrice, callback){
  portionPrice >= 100 ? portionPrice = null : portionPrice = portionPrice;
  proteinType.length > 0 ? proteinTypeString = proteinType.join(',') : proteinTypeString = null;
  proteinSource.length > 0 ? proteinSourceString = proteinSource.join(',') : proteinSourceString = null;
  allergy.length > 0 ? allergyString = allergy.join(',') : allergyString = null;

  requestData = {
    allergy : allergyString,
    proteinType : proteinTypeString,
    proteinSource : proteinSourceString,
    portionPrice : portionPrice
  };
  console.log(requestData)
  function removeNullKeys(obj) {
    Object.keys(obj).forEach(key => {
        if (obj[key] === null) {
            delete obj[key];
        }
    });
    return obj;
  }  
  var nullPurged = removeNullKeys(requestData);
  console.log("No nulls", nullPurged)
   $.ajax({
    url: host + '/ads/filter',
    type: 'GET',
    contentType: 'application/json',
    data : nullPurged,
    success: function(response){
      console.log("fetched all the ads");
      //ladda om ads från hemsidan. 
      callback(response)
    },
    error: function(JQxhr, status, error){
      console.log(error);
      callback(null)
    }
  });
}

//GET a single user based on userID, without sensitive information
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

//GET for a single user, including all information
function loadUser(callback) {
  $.ajax({
    url: host + '/user', 
    type: 'GET',
    contentType:"application/json",
    beforeSend: function(xhr) {
      const authData = JSON.parse(sessionStorage.getItem('auth'));
      const token = authData ? authData.token : null;
      if (token) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      }
    },
    success: function(user) {
      callback(user);
    }
})
}

//PUT for a user
function putUser(settingsData, callback) {
  $.ajax({
    url: host + '/user', 
    type: 'PUT',
    contentType:"application/json",
    beforeSend: function(xhr) {
      const authData = JSON.parse(sessionStorage.getItem('auth'));
      const token = authData ? authData.token : null;
      if (token) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      }
    },
    data: JSON.stringify(settingsData),
    success: function(response) {
      callback(response);
    },
    error: function(){
      callback(null)
    }
})
}

function putPassword(passwordData, callback) {
  $.ajax({
    url: host + '/change-password', 
    type: 'PUT',
    contentType:"application/json",
    beforeSend: function(xhr) {
      const authData = JSON.parse(sessionStorage.getItem('auth'));
      const token = authData ? authData.token : null;
      if (token) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      }
    },
    data: JSON.stringify(passwordData),
    success: function(response) {
      callback(response, null);
    }, 
    error: function(JQxhr, error) {
      console.error('Error: ' + error);
      if (JQxhr.status === 401) {
        callback(null, 'Incorrect current password. Please try again.');
      } else {
        callback(null, null);
      }
  }    
})
}

function getUniversities(callback) {
  $.ajax({
    url: host + '/universities', 
    type: 'GET',
    contentType:"application/json",
    success: function(unis) {
      callback(unis);  
    }
})
}

function getLocations(callback) {
  $.ajax({
    url: host + '/locations', 
    type: 'GET',
    contentType:"application/json",
    success: function(locations) {
      callback(locations);  
    }
})
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

function postAd(dishName, cookDate, imagePath, description, quantity, portionPrice, protein, allergy, callback){
  $.ajax({
    url: host + '/ad',
    type: 'POST',
    contentType: 'application/json',
    beforeSend: function(xhr) {
      const authData = JSON.parse(sessionStorage.getItem('auth'));
      const token = authData ? authData.token : null;
      if (token) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      }
    },
    data: JSON.stringify({
        ad : {
          dishName: dishName,
          cookDate: cookDate,
          imagePath: imagePath,
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

function postPurchase(totalPrice, quantity, buyerID, sellerID, ad, dishName, callback){
  var currentDate = new Date();
  var date = currentDate.toISOString()
  $.ajax({
    url: host + '/purchase',
    type: 'POST',
    contentType: 'application/json',
    beforeSend: function(xhr) {
      const authData = JSON.parse(sessionStorage.getItem('auth'));
      const token = authData ? authData.token : null;
      if (token) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      }
    },
    data: JSON.stringify({
        totalPrice:  totalPrice,
        quantity: quantity,
        buyer: buyerID,
        seller: sellerID,
        advertisement: ad,
        date: date,
        dishName: dishName,
    }),
    success: function() {
        callback(true);
    }, 
    error: function(JQxhr, status, error) {
        console.error('Error: ' + error);
        console.log(JQxhr)
        callback(false);
    }
  });
}

function deleteAd(id, userID){
  $.ajax({
    url: host + '/ad/' + id,
    type: 'DELETE',
    contentType: 'application/json',
    beforeSend: function(xhr) {
      const authData = JSON.parse(sessionStorage.getItem('auth'));
      const token = authData ? authData.token : null;
      if (token) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      }
    },
    success: function() {
    }, 
    error: function(JQxhr, status, error) {
        console.error('Error: ' + error);
        console.log(JQxhr)
    }
  });
}

function putAd(id, quantity){
  $.ajax({
    url: host + '/ad/' + id,
    type: 'PUT',
    contentType: 'application/json',
    beforeSend: function(xhr) {
      const authData = JSON.parse(sessionStorage.getItem('auth'));
      const token = authData ? authData.token : null;
      if (token) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      }
    },
    data: JSON.stringify({
      quantity: quantity,
    }),
    success: function() {
        
    }, 
    error: function(JQxhr, status, error) {
        console.error('Error: ' + error);
        console.log(JQxhr)
    }
  });
}

function filterOnSellerID(sellerID, callback){
  $.ajax({
    url: host + '/ads/' + sellerID,
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

function getPurchases(userID, role, callback){
  $.ajax({
    url: host + '/purchases/' + role,
    type: 'GET',
    contentType: 'application/json',
    headers: {"Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
    success: function(pruchases) {
        callback(pruchases);
    }, 
    error: function(JQxhr, status, error) {
        console.error('Error: ' + error);
        console.log(JQxhr)
        callback(null)
    }
  });
}

function putPurchase(id, rating, review){
  $.ajax({
    url: host + '/purchase/' + id,
    type: 'PUT',
    contentType: 'application/json',
    data: JSON.stringify({
      sellerRating: rating,
      reviewText: review
    }), 
    success: function() {
        
    }, 
    error: function(JQxhr, status, error) {
        console.error('Error: ' + error);
        console.log(JQxhr)
    }
  });
}


//GET a single user based on userID, without sensitive information
function getPurchase(ID, callback){
  $.ajax({
    url: host + '/purchase/' + ID,
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

