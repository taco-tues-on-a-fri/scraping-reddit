const {format} = require('winston');

const fix_errors = format(info => {
  // Only modify the info it there was an error
  if (info.stack === undefined) {
    return info;
  }

  const {message} = info;

  // Get the original error message
  const error_message =
    info[Symbol.for('splat')] &&
    info[Symbol.for('splat')][0] &&
    info[Symbol.for('splat')][0].message;

  // Check that the original error message was concatenated to the message
  if (
    error_message === undefined ||
    message.length <= error_message.length ||
    !message.endsWith(error_message)
  ) {
    return info;
  }

  // Slice off the original error message from the log message
  info.message = message.slice(0, error_message.length * -1);
  return info;
});

module.exports = fix_errors;