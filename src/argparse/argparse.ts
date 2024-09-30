
export function parseArguments(args: string) {
    let argsParsed: Array<string> = [];
    let split = args.split(`"`);
    if (split.length % 2 !== 1) {
        return "incorrectly formatted string";
    }

    for (let i = 0; i < split.length; i++) {
        if (i % 2 === 1) {
            argsParsed.push(split[i]);
        } else {
            if (split[i].trim() === "") {
                continue;
            }
            split[i].trim().split(" ").forEach(x => argsParsed.push(x));
        }
    }

    return argsParsed;
}
