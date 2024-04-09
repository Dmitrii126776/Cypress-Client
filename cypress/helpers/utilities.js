export const createTodayDate = () => {
    const date = new Date()
    const year = new Date(date).getFullYear();
    const month = (1 + new Date(date).getMonth()).toString().padStart(2, '0');
    const day = new Date(date).getDate().toString().padStart(2, '0');

    return month + '/' + day + '/' + year;
}

export function getRandomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
