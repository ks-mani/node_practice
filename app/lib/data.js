/*
*
* Library for storing and editing data
*
*/

// Dependencies
var fs = require('fs');
var path = require('path');

//Container for the module (to be exported)
var lib = {};

// Base Directory of the data folder
lib.baseDir = path.join(__dirname, '/../.data/');

// Write data to a file
lib.create = function(dir, file, data, callback){
  // Open the file for writing
  fs.open(lib.baseDir+dir+'/'+file+'.json', 'wx', function(err, fileDescriptor){
    if(!err && fileDescriptor){
      // Convert data into String
      var stringData = JSON.stringify(data);

      // Write to file and close inspect
      fs.writeFile(fileDescriptor, stringData, function(err){
        if(!err){
          fs.close(fileDescriptor, function(err){
            if(!err){
              callback(false);
            } else {
              callback('Error closing new file')
            }
          });
        } else {
          callback('Error writing to a new file');
        }
      });

    } else {
      callback('Could not create new file, it may already exist');
    }
  });
};

// Read data from a file
lib.read = function(dir, file, callback){
  fs.readFile(lib.baseDir+dir+'/'+file+'.json', 'utf8', function(err, data){
    callback(err, data);
  });
};

// Update data inside the file
lib.update = function (dir, file, data, callback){
  // Open the file for writing
  fs.open(lib.baseDir+dir+'/'+file+'.json', 'r+', function(err, fileDescriptor){
    if(!err && fileDescriptor) {
      var stringData= JSON.stringify(data);

      // Truncate the file
      fs.truncate(fileDescriptor, function(err){
        if(!err) {
          // Write to the file and close inspect
          fs.write(fileDescriptor, stringData, function(err){
            if(!err) {
              fs.close(fileDescriptor, function(err){
                  if(!err) {
                    callback(false);
                  } else {
                    callback('Error closing the file');
                  }
              });
            } else {
              callbacl('Error writing to existing file');
            }
          });
        } else {
          callback(' Error truncating file');
        }
      });

    } else {
      callback('Could not open the file for updating, it may not exist yet');
    }
  });
};

// Delete a file
lib.delete = function(dir, file, callback){
  // Unlink the file
  fs.unlink(lib.baseDir+dir+'/'+file+'.json', function(err){
    if(!err) {
      callback(false);
    } else {
      callback('Error deleting file');
    }
  });
};



// Export the module
module.exports = lib;
