const getCurrentPeriodContext = () => {
  const newYear = new Date().getFullYear();
  const newMonth = new Date().getMonth() + 1; //1-12;
  return {
    currentYear: newYear,
    currentMonth: newMonth,
  };
};

module.exports = { getCurrentPeriodContext };
