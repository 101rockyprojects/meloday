export function parseDate(dateString) {
    const regexDM = /^(\d{2})-(\d{2})$/;
    const matchDM = dateString.match(regexDM);
    if (!matchDM || matchDM[1] > 31 || matchDM[2] > 12) {
        return null;
    }
    
    const day = parseInt(matchDM[1], 10);
    const month = parseInt(matchDM[2], 10) - 1;
    const year = new Date().getFullYear();
    
    const date = new Date(year, month, day);
    if (date.getDate() !== day || date.getMonth() !== month) {
        return null;
    }
    
    return date;
}

export function isLeapYear(year) {
    if (!year) year = new Date().getFullYear();
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

export function getDayNumber(date) {
    const startOfYear = Date.UTC(date.getFullYear(), 0, 0);
    const currentDay = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
    const msPerDay = 24 * 60 * 60 * 1000;
    return (currentDay - startOfYear) / msPerDay;
}

export function isSpecialDate(date, specialDates, dayNumber = null) {
    if (!Array.isArray(specialDates) || specialDates.length === 0) {
        return false;
    }
    if (dayNumber === null) {
        dayNumber = getDayNumber(date);
    }
    for (const specialDate of specialDates) {
        const specialDateParsed = parseDate(specialDate);
        if (!specialDateParsed) continue;
        const specialDateNumber = getDayNumber(specialDateParsed);
        if (dayNumber === specialDateNumber) {
            return true;
        }
    }
    return false;
}
