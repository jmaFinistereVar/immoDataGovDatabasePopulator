
export class Utils {
    static indexOf<T>(arr: Array<T>, el: T, fn?: (a: T, b: T) => boolean): number {
        let notFound: number = -1;
        arr.forEach((e, index) => {
            if (fn) {
                if (fn(e, el)) {
                    notFound = index;
                    return;
                }

            }
            else {
                if (el === e) {
                    notFound = index;
                    return;
                }
            }
        })
        return (notFound);
    }
}

