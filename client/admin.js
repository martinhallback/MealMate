function loadAdminView(){
    $('.container').empty();
    getAllUsers(function(users){
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
            '<td>' + user.universityID + '</td>' +
            '<td><button onclick="verifyUser(\'' + user.id + '\')">Verify</button></td>' +
            '</tr>';
    });
    return rows;
}

function verifyUser(id){
    putUserAdmin(id)
    loadAdminView()
}