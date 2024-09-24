export function formatDateToSQL(date) {
    const pad = (number) => (number < 10 ? '0' : '') + number;

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1); // Months are zero-indexed
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}