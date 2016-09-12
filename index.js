const csv = require('csv');
const fs = require('fs');
var prompt = require('prompt-sync')();

exports.processCsv = function(filename, callback) {
    fs.readFile(filename, function(error, dataFile) {
        if (error) throw error;
        csv.parse(dataFile, {
            columns: true
        }, function(error, dataParsed) {
            if (error) {
                throw error;
            }
            callback(dataParsed, filename);
        });
    });
}

//writes new csv when called in function
writeCsv = function(data, filename) {
    csv.stringify(data, {
        header: true
    }, function(error, data) {
        fs.writeFile(filename, data, function(error) {
            if (error) {
                throw error;
            }
            console.log('CSV update was successful');
        });
    });
};

//contact information
function contact() {
    var firstName = prompt('Enter first name: ');
    var lastName = prompt('Enter last name: ');
    var phone = prompt('Enter phone number: ');
    var email = prompt('Enter email: ');
    var city = prompt('Enter city: ');
    var zipcode = prompt('Enter zipcode: ');
    var website = prompt('Enter website: ');
    var company = prompt('Enter company: ');

    var contactObj = {
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        email: email,
        city: city,
        zipcode: zipcode,
        website: website,
        company: company
    };
    return contactObj;
}

//push newuser to data
exports.addUser = function(data, filename) {
    var question = prompt('Would you like to add a new contact? ');
    if (question === 'yes' || question === 'YES' || question === 'Yes') {
        var add = contact();
        console.log(add);
        //writes new Csv [see function writeCsv]
        data.push(add);
        writeCsv(data, filename);
    }
    else if (question === 'no' || question === 'NO' || question === 'No') {
        console.log('No contact added to list.');
    } else {
        console.log('Command not found');
    };
}

//find user in list
function findContact(data, email) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].email === email) {
            return i;
        }
    }
    return -1;
}

exports.searchUser = function(data) {
    var email = prompt('Enter email: ');
    var position = findContact(data, email);
    if (position === -1) {
        console.log('User not found.');
    } else {
        console.log('search user function is running ', data[position]);
    }
}

//deletes the user when id finds it
exports.deleteUser = function(data, filename) {
    // console.log(data);
    console.log('Removing data from list.');
    var email = prompt('Enter email: ');
    var position = findContact(data, email);
    if (position === -1) {
        console.log('Email not found.');
    } else {
        console.log(position);
        deletedClient = data.splice(position);
        console.log("Delete contact with key: " + email);
    }
    //writes new Csv [see function writeCsv]
    writeCsv(data, filename);
}


exports.updateUser = function(data, filename) {
    console.log('Updating existing contact.');
    var email = prompt('Enter email to update contact: ');
    var position = findContact(data, email);
        if (position === -1) {
            console.log('No contact found');
        } else {
         console.log('Update contact information of: ', email);
         var modifyUser = contact();
         console.log(modifyUser);
         data.splice(position, 1, modifyUser);
         writeCsv(data, filename);
        }
}
