function calculateDuration(start, end) {
    start = start.split(":");
    end = end.split(":");
    var startDate = new Date(0, 0, 0, start[0], start[1], 0);
    var endDate = new Date(0, 0, 0, end[0], end[1], 0);
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
function calculateDate(date,dayNumber){
    return new Date(date.getTime() + dayNumber*24*60*60*1000).toLocaleDateString();
}

exports.convertDayNumberToString = convertDayNumberToString;
exports.calculateDuration = calculateDuration;
exports.calculateDate= calculateDate;