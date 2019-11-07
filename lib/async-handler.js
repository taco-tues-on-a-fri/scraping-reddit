/**
|--------------------------------------------------------------------------
| Middleware wrapper for async error handling
|--------------------------------------------------------------------------
|
| Link to solution:
| https://stackoverflow.com/a/51391081
|
*/

const asyncHandler = function => (req, res, next) => {
  return Promise
    .resolve(function(req, res, next))
    .catch(next);
};

module.exports = asyncHandler;