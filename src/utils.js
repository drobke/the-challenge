export const convertTime = (timestamp) => {
    var convertedTimeStamp = new Date(timestamp);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = convertedTimeStamp.getFullYear();
    var month = months[convertedTimeStamp.getMonth()];
    var date = convertedTimeStamp.getDate();
    var hour = convertedTimeStamp.getHours();
    var min = convertedTimeStamp.getMinutes();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + (min < 10 ? `0${min}` : min);
    return time;
}

