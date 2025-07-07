export const checkPath = (
    paths: Array<string>,
    currentPath: string
): boolean => {
    return paths.some(
        (path) => currentPath === path || currentPath.startsWith(`${path}/`)
    );
};
