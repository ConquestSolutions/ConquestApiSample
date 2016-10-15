baseUrl = "https://localhost/ConquestApi/api/"
connectionName = "1-marsh-CityOfConquest"
authToken = {
    access_token: "",
    token_type: "",
    expires_in: 0,
    refresh_token: ""
};

function LoadConnectionList() {
    //Load list of connection names
    $.ajax({
        url: baseUrl + "system/connections"
    }).then(function(list) {
        for (var n in list) {
            $('#connection-dropdownlist').append(
                '<option value="' + list[n] + '">' + list[n] + '</option>');
        };
    });
}

function GetAuthCode(userName, password) {
    //Get auth code
    $.ajax({
        url: baseUrl + "token",
        type: "POST",
        headers: {
            "connectionName": connectionName,
            "Accept": "application/json"
        },
        data: {
            "grant_type": "password",
            "username": userName,
            "password": password
        },
    }).then(function(token) {
        authToken = token;
        $('#auth-code').append(token.access_token);
        $('#login-form').hide();
    });
}

function AddImport(fileData) {
    var formData = new FormData();
    formData.append("file", fileData);

    //Add import
    $.ajax({
        url: baseUrl + "import/add/Action",
        type: "POST",
        headers: {
            "Authorization": "Bearer " + authToken.access_token,
            "Accept": "application/json"
        },
        data: formData,
        contentType: false,
        processData: false
    }).then(function(key) {
        $('#import-key').text("Import State: " + key);
        RetriveImportState(key);
    });
}

function RetriveImportState(key) {
    $.ajax({
        url: baseUrl + "import/state/" + key,
        headers: {
            "Authorization": "Bearer " + authToken.access_token,
            "Accept": "application/json"
        },
    }).then(function(state) {
        console.log(state);
        $('#import-title').text(state.Title)
        $('#import-status').text(state.Status)
        $('#import-status').text(state.StatusDescription)

        if (state.Error != null){
            $('#import-error').show();
            $('#import-error').text(state.Error);
        }
        else{
            $('#import-error').hide();
        }

        $('#import-progress').text(state.WorkDone.toString() + '/' + state.TotalWork.toString())
        var percent = (100 * state.WorkDone / state.TotalWork).toString();
        $('#import-progress').css('width', percent + "%");

        if (state.Status == "Processing") {
            window.setTimeout(function() { RetriveImportState(key); }, 1000);
        }
    });
}

$('#btn-login').click(function(e) {
    e.preventDefault();

    baseUrl = $('#api-base-url').val();
    connectionName = $('#connection-dropdownlist').val();
    userName = $('#user-name').val();
    password = $('#password').val();

    GetAuthCode(userName, password);
});

$('#btn-import').click(function() {
    var files = $('#fileInput')[0].files;
    if (files.length == 0)
        return;
    AddImport(files[0]);
});

$(document).ready(function() {
    LoadConnectionList();
    //GetAuthCode();
});