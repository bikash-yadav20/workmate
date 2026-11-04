"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.markAttendance = exports.getTodayAttendance = void 0;

var _apiClient = require("@/lib/apiClient");

// get today attendance
var getTodayAttendance = function getTodayAttendance() {
  var response;
  return regeneratorRuntime.async(function getTodayAttendance$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _apiClient.apiClient)("/workmate/employee/attendance/today-attendance", {
            method: "GET"
          }));

        case 2:
          response = _context.sent;
          return _context.abrupt("return", response);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}; // mark attendance


exports.getTodayAttendance = getTodayAttendance;

var markAttendance = function markAttendance(status) {
  var m, response;
  return regeneratorRuntime.async(function markAttendance$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (status === "clock-in") {
            m = "POST";
          } else {
            m = "PUT";
          }

          _context2.next = 3;
          return regeneratorRuntime.awrap((0, _apiClient.apiClient)("/workmate/employee/attendance/".concat(status), {
            method: m
          }));

        case 3:
          response = _context2.sent;
          return _context2.abrupt("return", response);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.markAttendance = markAttendance;