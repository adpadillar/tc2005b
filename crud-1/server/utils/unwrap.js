const unwrap = async (f, ...params) => {
  try {
    return await f(...params);
  } catch (error) {
    return new Error(error.message);
  }
};

module.exports = unwrap;
