import "server-only";
import sanitizeHtml from "sanitize-html";

/** Assainit le HTML saisi dans l'éditeur avant affichage. */
export function clean(html: string | null | undefined): string {
  return sanitizeHtml(html ?? "", {
    allowedTags: ["p", "br", "strong", "b", "em", "i", "u", "s", "a", "ul", "ol", "li", "h2", "h3", "h4", "blockquote", "hr", "img", "figure", "figcaption"],
    allowedAttributes: { a: ["href", "target", "rel"], img: ["src", "alt", "width", "height", "loading"] },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    transformTags: {
      a: (tag, attribs) => ({ tagName: "a", attribs: { ...attribs, rel: "noopener", ...(attribs.href?.startsWith("http") ? { target: "_blank" } : {}) } }),
      img: (tag, attribs) => ({ tagName: "img", attribs: { ...attribs, loading: "lazy" } }),
    },
  });
}
