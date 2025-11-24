// auto formatting based on country
export const formatInternationalPhone = (raw: any, callingCode: any) => {
  let digits = raw.replace(/\D/g, '');

  // remove calling code from input 
  const cc = callingCode.replace('+', '');
  if (digits.startsWith(cc)) digits = digits.slice(cc.length);
  let formatted = `+${cc} `;
    console.log('cc => ',cc);
    
  // US FORMAT → +1 (999) 999-9999
  if (cc === '1') {
    if (digits.length > 10) digits = digits.slice(0, 10);

    if (digits.length > 0) formatted += '(' + digits.slice(0, 3);
    if (digits.length >= 3) formatted += ') ';
    if (digits.length >= 4) formatted += digits.slice(3, 6);
    if (digits.length >= 6) formatted += '-' + digits.slice(6, 10);
    return formatted;
  }

  // DEFAULT FORMAT → +XX xxxxx xxxxx
  if (digits.length > 10) digits = digits.slice(0, 10);
  if (digits.length > 0) formatted += digits.slice(0, 5);
  if (digits.length > 5) formatted += ' ' + digits.slice(5);

  return formatted;
};
