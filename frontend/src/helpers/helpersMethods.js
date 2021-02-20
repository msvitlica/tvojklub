function calculateDuration(start, end) {
    let startDate = new Date(start);
    let endDate = new Date(end);
    var diff = endDate.getTime() - startDate.getTime();
    var hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);
    if (hours < 0) {
        hours = hours + 24;
    }
    return (hours <= 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes;
}
function convertDayNumberToString(dayNumber) {
    switch (dayNumber) {
        case 0:
            return "sunday";
        case 1:
            return "monday";
        case 2:
            return "tuesday";
        case 3:
            return "wednesday";
        case 4:
            return "thursday";
        case 5:
            return "friday";
        case 6:
            return "saturday";

    }
}
function calculateDate(date, dayNumber) {
    return new Date(date.getTime() + dayNumber * 24 * 60 * 60 * 1000).toLocaleDateString();
}
const addHourToStartTime = (start) => {
    let startTime = new Date(start);
    // var endOfDay = new Date();
    // endOfDay.setHours(23, 59, 59, 999);
    // let beginOfDay = new Date();
    // beginOfDay.setHours(0, 0, 0, 0);
    // let addedHourToDay = new Date();
    // addedHourToDay.setHours(24, 0, 0, 0);
  
    let hourToMillisec = startTime.getTime() + (1000 * 60 * 60);
    let defaultEndTime = new Date(hourToMillisec).toLocaleString('en-US', { hour12: false });
    return defaultEndTime;
};

exports.convertDayNumberToString = convertDayNumberToString;
exports.calculateDuration = calculateDuration;
exports.calculateDate = calculateDate;
exports.addHourToStartTime = addHourToStartTime;

