import moment from 'moment';

export const getGreeting = () => {
  const currentHour = moment().hour(); // 0-23

  if (currentHour >= 5 && currentHour < 12) {
    return 'Good Morning'; // 5 AM → 11:59 AM
  } else if (currentHour >= 12 && currentHour < 17) {
    return 'Good Afternoon'; // 12 PM → 4:59 PM
  } else if (currentHour >= 17 && currentHour < 21) {
    return 'Good Evening'; // 5 PM → 8:59 PM
  } else {
    return 'Good Night'; // 9 PM → 4:59 AM
  }
};
