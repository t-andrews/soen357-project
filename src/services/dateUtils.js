export function buildDates(startDate, endDate, term) {
    let yearEnd = term.substr(-4);
    let yearStart = yearEnd;

    if (term.includes('/')) {
        yearStart = term.substr(-9, 4);
    }

    return { startDate: new Date(Date.parse(startDate + ' ' + yearStart)), endDate: new Date(Date.parse(endDate + ' ' + yearEnd)) }
}

export function getDateWithTime(date, timeString) {
    const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const isPM = timeString.substr(-2) === 'PM';
    const timeSection = timeString.substr(0, timeString.length - 2);
    const arr = timeSection.split(':');
    let hours = Number(arr[0]);
    let minutes = Number(arr[1]);

    if (isPM) {
        hours += 12;
    }

    newDate.setHours(hours);
    newDate.setMinutes(minutes);

    return newDate;
}
