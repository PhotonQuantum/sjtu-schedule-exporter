export const useCurrentTerm = () => {
    const now = new Date();
    const realYear = now.getFullYear();
    const month = now.getMonth();
    const termYear = (month < 7 ? realYear - 1 : realYear);
    let term = 0;
    if (month < 5) {
        term = 1;
    } else if (month < 7) {
        term = 2;
    }
    return [termYear, term]
}