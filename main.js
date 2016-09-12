var argument = process.argv[2];
var index = require('./index');

switch (argument) {
    case 'addUser':
        callback = index.addUser;
        break;

    case 'deleteUser':
        callback = index.deleteUser;
        break;

    case 'searchUser':
        callback = index.searchUser;
        break;
    case 'updateUser':
        callback = index.updateUser;
        break;

    default:
        console.log('Command not found');
        break;
}

index.processCsv('example.csv', callback);
