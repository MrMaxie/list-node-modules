import Path from 'path';
import { globSync } from 'glob';
import { safeReadFromJson } from './safeReadFromJson';

/**
 * Represents the options for listing node modules.
 */
type Options = {
    /**
     * The path to search for node modules. If not provided, the current working directory will be used.
     * @default process.cwd()
     */
    path?: string;

    /**
     * An array of module names to exclude from the list.
     * @default []
     */
    excludeNames?: string[];

    /**
     * An array of file names to exclude from the list.
     * @default []
     */
    excludeFiles?: string[];

    /**
     * Specifies whether to panic and throw an error if an error occurs during the listing process.
     * @default false
     */
    panicOnError?: boolean;

    /**
     * An array of filters to apply when listing node modules.
     * @default ['node_modules/**\/package.json']
     */
    filters?: string[];
};

/**
 * Lists all the node modules found in the specified path.
 * @param options - The options for listing node modules.
 * @returns An array of found node module names.
 */
export const listNodeModules = (options: Options = {}) => {
    const {
        path,
        excludeNames,
        excludeFiles,
        panicOnError,
        filters,
    } = Object.assign({
        path: process.cwd(),
        excludeNames: [],
        excludeFiles: [],
        panicOnError: false,
        filters: ['node_modules/**/package.json'],
    }, options);

    const foundModules = new Set<string>();

    const targetCwd = Path.resolve(process.cwd(), path, '.');

    const files = globSync(filters, {
        ignore: excludeFiles,
        cwd: targetCwd,
    });

    for (const file of files) {
        const name = safeReadFromJson(Path.resolve(targetCwd, file), (content) => {
            if (typeof content === 'object' && content !== null && 'name' in content && typeof content.name === 'string') {
                return content.name;
            }

            return undefined;
        });

        if (name && !excludeNames.includes(name)) {
            foundModules.add(name);
        } else if (panicOnError) {
            throw new Error(`Invalid package.json found at ${file}`);
        }
    }

    return Array.from(foundModules);
};
