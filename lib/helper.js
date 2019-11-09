/**
|--------------------------------------------------------------------------
| Helper functions
|--------------------------------------------------------------------------
*/

//|------------------------------------------------------------------------
//#region module dependencies

const appRoot =  require('app-root-path');
const chalk   =  require('chalk');
const fs      =  require('fs');
const moment  =  require('moment');
const rp      =  require('request-promise');
const winston =  require(appRoot + '/config/winston');

//#endregion
//|------------------------------------------------------------------------



//|------------------------------------------------------------------------
//#region | LIVE | promisified fs read write | fs_read_write
/**
|--------------------------------------------------------------------------
|  fs_read_write
|--------------------------------------------------------------------------
| 
| options = {  path: '', read_file_name: '', data_to_push: []  }
| 
*/

const fs_read_write = options => {
  // const fs_read_write = function(options) {
  return new Promise((resolve, reject) => {
    let file_to_read_write = appRoot + options.path + options.read_file_name;
    
    fs.readFile(file_to_read_write, (err, data) => {
      if (err) reject(err);

      let json = JSON.parse(data);
      json.push(options.data_to_push)
    
      fs.writeFile(file_to_read_write, JSON.stringify(json, 0, 4), (err) => {
        if (err) reject(err);

        resolve(winston.info('%s Successfully pushed data to %s', chalk.green('✓'), file_to_read_write))
      })
    })
  })
}
//#endregion
//|------------------------------------------------------------------------




//|------------------------------------------------------------------------
//#region | TEST | 02 Attempt fs_read_write | fs_read_write_02
/**
|--------------------------------------------------------------------------
|  fs_read_write_02
|--------------------------------------------------------------------------
|
*/

const fs_read_write_02 = (file, data_to_push) => {
  return new Promise((resolve, reject) => {
    let file_to_read_write = appRoot + '/logs/json/' + file;
    
    fs.readFile(file_to_read_write, (err, data) => {
      if (err) reject(err);

      let json = JSON.parse(data);
      json.push(data_to_push)
    
      // fs.writeFile(file_to_read_write, JSON.stringify(json, 0, 4), (err) => {
      fs.writeFile(file_to_read_write, JSON.stringify(json, 0, 2), (err) => {
        if (err) reject(err);

        // resolve(winston.info('%s Successfully pushed data to %s', chalk.green('✓'), file_to_read_write))
        resolve(winston.info(`${chalk.green('✓')} Successfully pushed data to ${file}`))
      })
    })
  })
} 

//#endregion
//|------------------------------------------------------------------------




//|------------------------------------------------------------------------
//#region | TEST | 03 Attempt fs_read_write | fs_read_write_03
/**
|--------------------------------------------------------------------------
|  fs_read_write_03
|--------------------------------------------------------------------------
|
|  This attempt is to take the json formatting away from request-promise module
|
*/

const fs_read_write_03 = (file, data_to_push) => {
  return new Promise((resolve, reject) => {
    let file_to_read_write = appRoot + '/logs/json/' + file;
    
    fs.readFile(file_to_read_write, (err, data) => {
      if (err) reject(err);

      let json = JSON.parse(data);
      json.push(data_to_push)
    
      fs.writeFile(file_to_read_write, JSON.stringify(json, 0, 4), (err) => {
        if (err) reject(err);

        // resolve(winston.info('%s Successfully pushed data to %s', chalk.green('✓'), file_to_read_write))
        resolve(winston.info(`${chalk.green('✓')} Successfully pushed data to ${file}`))
      })
    })
  })
} 

//#endregion
//|------------------------------------------------------------------------



module.exports = {
  fs_read_write: fs_read_write,
  fs_read_write_02: fs_read_write_02,
  fs_read_write_03: fs_read_write_03
};



//|------------------------------------------------------------------------
//#region | BLANK | description | function_name
/**
|--------------------------------------------------------------------------
|  function_name
|--------------------------------------------------------------------------
|
*/


//#endregion
//|------------------------------------------------------------------------


