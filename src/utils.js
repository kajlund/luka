class Utils {
  constructor() { }
  parseSort(sortStr) {
    const sortObj = {};
    const fldArr = sortStr.split(',');
    fldArr.forEach((fld) => {
      if (fld.indexOf('-') > -1) {
        sortObj[fld.slice(1)] = 'desc'
      } else {
        sortObj[fld] = 'asc'
      }
    });
    return sortObj;
  }
}

export default new Utils();
