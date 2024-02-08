export function formatDate(dateString) {
    // Convert the string to a Date object
    const date = new Date(dateString);
    
    // Define an array of month names
    const monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];
    
    // Extract the month, day, and year from the date object
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    
    // Return the formatted date string
    return `${month} ${day}, ${year}`;
}

// Example usage
const formattedDate = formatDate("2023-12-21T00:26:46.183Z");
console.log(formattedDate); // Output: December 21, 2023
