/**
|--------------------------------------------------------------------------
| Middleware wrapper for async error handling
|--------------------------------------------------------------------------
|
| Link to solution:
| https://stackoverflow.com/a/51391081
|
*/

const asyncHandler = fn => (req, res, next) => {
  return Promise
    .resolve(fn(req, res, next))
    .catch(next);
};

module.exports = asyncHandler;


/**
|--------------------------------------------------------------------------
| Usage examples
|--------------------------------------------------------------------------
|
| app.use(asyncHandler(async(req, res, next) => {
|   await authenticate(req);
|   next();
| }));
| 
|--------------------------------------------------------------------------
| 
| app.get('/async', asyncHandler(async(req, res) => {
|   const result = await request('http://example.com');
|   res.end(result);
| }));
| 
| // Any rejection will go to the error handler
|
*/

