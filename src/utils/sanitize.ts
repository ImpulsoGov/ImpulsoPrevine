import DOMPurify from "dompurify";

export const sanitize = (content: any) => {
    return typeof window !== "undefined"
        ? DOMPurify.sanitize(content)
        : content;
};
