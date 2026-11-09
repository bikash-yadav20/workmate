export const dateFormatter = {
  currentTime: function () {
    return new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  },

  currentDateLong: function () {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  },

  // formate as ISO 8601 -- yyyy-mm-dd
  isoFormatPattern: function (date) {
    const rawDate = date.toLocaleDateString();
    const formattedDate = rawDate.split("/").reverse().join("-");
    return formattedDate;
  },

  // Helper to format month number (e.g., 10 -> October 2026)
  getMonthName: function (monthNum, year) {
    const date = new Date(year, monthNum - 1, 1);
    return date.toLocaleString("default", { month: "long", year: "numeric" });
  },

  // Helper to format dates nicely
  formatDate: function (dateStr) {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  },

  // get difference in date between 2 date strings
  getDifferenceInDate: function (fromDateStr, toDateStr) {
    const start = new Date(fromDateStr);
    const end = new Date(toDateStr);

    const diffTime = Math.abs(end - start);

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays + 1;
  },
};
