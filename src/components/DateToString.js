const toDateInputString = (date) => {
    if (typeof date !== Object) date = new Date(date);
    const asString = date.toISOString();
    return asString.substring(0, asString.indexOf("T"));
  };

const toTimeInputString = (date) => {
if (typeof date !== Object) date = new Date(date);

const asString = date.toISOString();
return asString.substring(asString.indexOf("T")+1, 16);
};

module.exports = {
    toDateInputString,
    toTimeInputString,
}