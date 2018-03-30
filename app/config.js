/*
*
* Create and export configiuration variables
*
*/

// Container for all the environments
var environment = {};


// Staging (default) environments
environment.staging = {
  'port' : 3000,
  'envName' : 'staging'
};

// Production environment
environment.production = {
  'port' : 5000,
  'envName' : 'production'
};

// Determine which environment was passed as command line argument
var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase():'';

// Check that the current environment is one of the environment above, if not, default to staging
var environmentToExport = typeof(environment[currentEnvironment]) == 'object' ? environment[currentEnvironment]: environment.staging;

// Export the module
module.exports = environmentToExport;
