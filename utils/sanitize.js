import DOMPurify from "dompurify";

export const sanitize = (content) => {
  return typeof window !== "undefined" ? DOMPurify.sanitize(content) : content;
};