
var appConfigs = {
    "Roles": {
        "Admin": "ADMIN",
        "ProjectOwner": "OWNER",
        "Developer": "DEV",
        "ReadonlyUser": "READER"
    },
    "GroupRoles":{
        "Developer": "DEV",
        "GroupOwner": "OWNER",
        "GroupReader": "READER"
    }
};
var axiosConfigs = {
    "apiUrls": {
        "utilityApi": "https://utility.jessepecar.com/api"
    }
}

// axiosConfigs = {
//     "apiUrls": {
//         "utilityApi": "https://localhost:44335/api"
//     }
// }

var googleConfigs_dev = {
    "clientId": "1024010743256-ubfm0545n0ua5se36j123njsuk4dog92"
}

var googleConfigs_prod = {
    "clientId": "1024010743256-5qod0iv02fcntk2u33490o0civrg7evv"
}

var googleConfigs = {}

if(window.location.hostname == 'localhost'){
    googleConfigs = googleConfigs_dev;
} else{
    googleConfigs = googleConfigs_prod;
}
