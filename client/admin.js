function loadAdminView(){
    $('.container').empty();
    getAllUsers(function(users){
        console.log(users)
        if(users){
            makeTable(users)
        }else{
            $('.container').append("<p>No users found, check backend or console for errors");
        }   
    })
}

function makeTable(users) {
    var table = '<table class="usersTable" id="usersTable">' +
        '<thead>' +
        '<tr>' +
        '<th>Name</th>' +
        '<th>Email</th>' +
        '<th>University ID</th>' +
        '<th>Verify</th>' +
        '<th>Make Admin</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody>' +
        populateUsers(users)
        '</tbody>' +
        '</table>';

    $('.container').append(table);
}

function populateUsers(users) {
    var rows = '';
    users.forEach(user => {
        rows += '<tr>' +
            '<td>' + user.name + '</td>' +
            '<td>' + user.email + '</td>' +
            '<td>' + user.studentID + '</td>';
        
        if (!user.isVerified) {
            rows += '<td><button onclick="verifyUser(\'' + user._id + '\')">Verify</button></td>';
        } else {
            rows += '<td>Verified</td>';
        }
        if (!user.isAdmin) {
            rows += '<td><button onclick="makeAdmin(\'' + user._id + '\')">Make Admin</button></td>';
        } else {
            rows += '<td>Admin</td>';
        }
        
        rows += '</tr>';
    });
    return rows;
}

function verifyUser(id){
    verifyUser(id)
    setTimeout(10)
    loadAdminView()
}

function makeAdmin(id){
    verifyAdmin(id)
    setTimeout(10)
    loadAdminView()
}