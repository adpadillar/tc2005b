const failed = (maybeError) => {
  return maybeError instanceof Error;
};

module.exports = failed;
