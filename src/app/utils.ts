export function idGenerator() {
    let i = 0;
    return function() {
        return i++;       
    }
}