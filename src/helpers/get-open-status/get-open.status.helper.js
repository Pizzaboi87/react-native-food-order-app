export const getOpenStatus = (openingHours) => {
  const date = new Date();

  const addZeroToMinutes = (time) => {
    if (time < 10) {
      time = "0" + time;
    }
    return time;
  };

  const hour = date.getHours().toString();
  const minute = addZeroToMinutes(date.getMinutes());
  const now = Number(hour + minute);

  const day = date.getDay();
  const open = openingHours[day][0];
  const close = openingHours[day][1];

  const getStatus = () => {
    if (now >= open && now < close) {
      return "open";
    } else {
      return "close";
    }
  };

  const status = getStatus();
  return status;
};
