export function debounce<T extends (...args: unknown[]) => void>(
    callback: T,
    wait: number
) {
    let timeoutId: number | undefined = undefined;

    return (...args: Parameters<T>) => {
        window.clearTimeout(timeoutId);

        timeoutId = window.setTimeout(() => {
            callback(...args);
        }, wait);
    };
}

export function stringToArray(input: string, separator: string) {
    return input
        .trim()
        .split(separator)
        .map((line) => line.trim());
}

export function arrayToString(arr: (string | number)[], separator: string) {
    return arr.join(separator).trim();
}

export function arrayValuesToNumbers(arr: string[]) {
    return arr.map((value) => Number(value));
}
