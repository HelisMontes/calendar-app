const moment =  require('moment');

const isDate = (value) => {
  if(!value) return false;
  return moment(value).isValid() ? true : false;
}
const isDateEnd = (value, {req}) => {
  //console.log(req.body)
  if(!value) return false;
  if(!moment(value).isValid()) return false
  
  const dateStart = moment(req.body.start).add(15, 'minutes').toDate(); 
  const dateEnd = moment(value).toDate();
  /**
   * Validamos que la fecha final no sea menor o igual a la inicial
   * y debe haber una diferencia de 15 minutos entre fechas
   */
  return moment(dateEnd).isSameOrBefore(dateStart) ? false : true;
}
module.exports = { 
  isDate, 
  isDateEnd 
};