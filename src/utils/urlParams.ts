export const hasParams = (url: string): boolean => url.includes('?');
export const getParamPrefix = (url: string): string => hasParams(url) ? '&' : '?';
