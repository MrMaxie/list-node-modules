import fs from 'fs';

/**
 * Safely reads and parses JSON data from a file.
 *
 * @param path - The path to the JSON file.
 * @param fn - A function that processes the parsed JSON data.
 * @returns The result of applying the provided function to the parsed JSON data, or undefined if an error occurs.
 */
export const safeReadFromJson = <T>(path: string, fn: (value: unknown) => T): T | undefined => {
    try {
        const json = fs.readFileSync(path, 'utf8');
        return fn(JSON.parse(json));
    } catch (e) {}

    return undefined;
};
