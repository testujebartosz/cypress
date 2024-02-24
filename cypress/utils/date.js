export const generateDateDaysAhead = (daysAhead) => {
    return generateDateDaysAheadWithSpecificHour(daysAhead, 0)
}

export const generateDateDaysAheadWithSpecificHour = (daysAhead, hour) => {
    let today = new Date();
    let futureDate = new Date(today);
    futureDate.setDate(today.getDate() + daysAhead);
    futureDate.setHours(hour, 0, 0);
    let year = futureDate.getFullYear();
    let month = String(futureDate.getMonth() + 1).padStart(2, '0'); 
    let day = String(futureDate.getDate()).padStart(2, '0'); 
    let hourFormatted = String(futureDate.getHours()).padStart(2, '0');

    return `${year}-${month}-${day}T${hourFormatted}:00:00`;
}