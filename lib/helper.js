/**
|--------------------------------------------------------------------------
| Helper function modules
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
//#region | BUILDING | promisified fs read write | fs_read_write
/**
|--------------------------------------------------------------------------
|  fs_read_write
|--------------------------------------------------------------------------
| 
| 
*/

const fs_read_write = (file, data_to_push) => {
  return new Promise((resolve, reject) => {
    let file_to_read_write = appRoot + '/logs/json/' + file;
    
    fs.readFile(file_to_read_write, (err, data) => {
      if (err) reject(err);

      let json = JSON.parse(data);
      json.push(data_to_push)
    
      fs.writeFile(file_to_read_write, JSON.stringify(json, 0, 4), (err) => {
        if (err) reject(err);

        resolve(winston.info(`${chalk.green('✓')} Successfully pushed data to ${file}`))
      })
    })
  })
}

//#endregion
//|------------------------------------------------------------------------

module.exports = {
  fs_read_write: fs_read_write,
};