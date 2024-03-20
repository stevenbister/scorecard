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
