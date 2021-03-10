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
function amPmTimeFormat(trainingObj) {
    let [hours, minutes] = trainingObj.startTime.split(':');

    if(hours === '00'){
        hours = '12';
    }
    if (parseInt(hours) > 12) {
        hours = parseInt(hours) - 12;
    }

    return `${hours}:${minutes} ${parseInt(hours) > 12 ? 'pm' : 'am'}`;
}
const addHourToStartTime = (start) => {
    let startTime = new Date(start);
    let hourToMillisec = startTime.getTime() + (1000 * 60 * 60);
    let defaultEndTime = new Date(hourToMillisec);
    return defaultEndTime;
};

exports.convertDayNumberToString = convertDayNumberToString;
exports.calculateDuration = calculateDuration;
exports.calculateDate = calculateDate;
exports.dateFormat = dateFormat;
exports.amPmTimeFormat = amPmTimeFormat;
exports.addHourToStartTime = addHourToStartTime;
