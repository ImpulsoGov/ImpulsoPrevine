import DOMPurify from "dompurify";

export const sanitize = (content: string | Node): string | Node => {
    return typeof window !== "undefined"
        ? DOMPurify.sanitize(content)
        : content;
};
