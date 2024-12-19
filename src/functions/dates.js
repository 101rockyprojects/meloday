export function parseDate(dateString) {
    let day, month, year;
    let error = false;
    const regexDM = /^(\d{2})-(\d{2})$/;
    const matchDM = dateString.match(regexDM);
    if (matchDM && matchDM[1] <= 31 && matchDM[2] <= 12) {
        day = parseInt(matchDM[1], 10);
        month = parseInt(matchDM[2], 10) - 1;
        year = new Date().getFullYear();

        const date = new Date(year, month, day);
        if (date.getDate() !== day || date.getMonth() !== month) {
            console.error("Invalid date: The day does not exist in the given month.");
            return null;
        }
    } else {
        console.error("Invalid date format for 'day' parameter. Expected 'DD-MM'");
        return null;
    }
    const currentYear = new Date().getFullYear();
    return new Date(currentYear, month, day);
}

export function isLeapYear() {
    const year = new Date().getFullYear();
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

export function getDayNumber(date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 0);
    const diff = date - Number(firstDayOfYear);
    const dayToMiliseconds = 24 * 60 * 60 * 1000;
    const dayNumber = Math.floor(diff / dayToMiliseconds);
    return dayNumber;
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
        const specialDateNumber = getDayNumber(specialDateParsed);
        if (dayNumber === specialDateNumber) {
            return true;
        }
    }
    return false;
}

