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
};
