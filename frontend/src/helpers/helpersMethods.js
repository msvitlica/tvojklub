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
function dateFormat(date) {
    const day = new Date(date).getDate();
    const month = new Date(date).getMonth() + 1;
    const year = new Date(date).getFullYear();
    return `${year}-${month}-${day}`;
}
const addHourToStartTime = (start) => {
    let startTime = new Date(start);
    let hourToMillisec = startTime.getTime() + (1000 * 60 * 60);
    let defaultEndTime = new Date(hourToMillisec);
    return defaultEndTime;
}
function clientTimeFormat(dateFromDB) {
    const time = dateFromDB.split('T')[1].split(':');
    const date = dateFromDB.split('T')[0].split('-');
    return new Date(parseInt(date[0]), parseInt(date[1] - 1), parseInt(date[2]), parseInt(time[0]), parseInt(time[1]));
}
const setClientDateFormat = (dateFromDB) => {
   const date = dateFromDB.split('T')[0].split('-');
    const datePlusHour= new Date(date).getTime() +(1000*60*60*24);
    return datePlusHour;
}
function timeFormatUI(date) {
    const frontendDate = clientTimeFormat(date);
    return (new Date(frontendDate).getHours() < 10 ? '0' + new Date(frontendDate).getHours() : new Date(frontendDate).getHours()) + ':' + (new Date(frontendDate).getMinutes() < 10 ? '0' + new Date(frontendDate).getMinutes() : new Date(frontendDate).getMinutes());
}
function validateSheduleDuration(duration) {
    const hoursDuration = duration.split(':')[0];
    if (hoursDuration.split[0] === '0') {
        hoursDuration.split[0] = ''
    }
    let hoursToNumber = Number(hoursDuration);
    return hoursToNumber;
}

exports.convertDayNumberToString = convertDayNumberToString;
exports.calculateDuration = calculateDuration;
exports.calculateDate = calculateDate;
exports.dateFormat = dateFormat;
exports.addHourToStartTime = addHourToStartTime;
exports.timeFormatUI = timeFormatUI;
exports.validateSheduleDuration = validateSheduleDuration;
exports.setClientDateFormat = setClientDateFormat;

