export const setUpdateOptions = function (next) {
  this.options.runValidators = true;
  this.options.new = true;
  next();
};

export default setUpdateOptions;
