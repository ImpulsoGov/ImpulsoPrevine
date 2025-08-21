import type React from "react";
// import { renderToString } from "react-dom/server";

type PrintWindowProps = {
    document: Document;
} & Window;

type Image = {
    onload: ((this: GlobalEventHandlers, ev: Event) => void) | null;
    onerror: OnErrorEventHandler;
} & HTMLImageElement;

const loadImages = (printWindow: PrintWindowProps): void => {
    const doc = printWindow.document;
    const images: Array<Image> = Array.from(doc.images) as Array<Image>;
    let loads = 0;
    const imagesTotal = images.length;
    for (let i = 0; i < imagesTotal; i++) {
        if (images[i].complete) {
            loads++;
        } else {
            images[i].onload = images[i].onerror = (): void => {
                loads++;
                if (loads === imagesTotal) {
                    printWindow.print();
                }
            };
        }
    }
    if (loads === imagesTotal) printWindow.print();
};

// export const RenderPrint = (escala: string, child: React.ReactElement) => {
export const RenderPrint = (escala: string, content: string): void => {
    if (typeof window !== "undefined") {
        const width = window.innerWidth;
        const height = window.innerHeight;
        // const content = renderToString(child);
        const printWindow = window.open(
            "",
            "",
            `width=${String(width)},height=${String(height)}`
        );

        if (printWindow) {
            const doc = printWindow.document;
            doc.open();
            const htmlElement = doc.createElement("html");
            doc.appendChild(htmlElement);
            htmlElement.innerHTML = `
          <head>
            <style>
              @media print and (orientation: landscape){
                @page {
                  transform: scale(${escala});
                  transform-origin: top left;
                  margin: 14px;
                }
                body {
                  margin: 0;
                }
                .width {
                  width: 1215px;
                }
                .portrait{
                  display: none !important;
                }
                .landscape{
                  display: block !important;
                }
              }
              @media print and (orientation: portrait){
                @page {
                  transform: scale(${escala});
                  transform-origin: top left;
                  margin: 14px;
                }
                body {
                  margin: 0;
                }
                .width {
                  width: 868px;
                }
                .portrait{
                  display: block !important;
                }
                .landscape{
                  display: none !important;
                }
              }
            </style>
          </head>
          <body>${content}</body>
        `;
            doc.close();

            // Aguarda imagens carregarem
            loadImages(printWindow);
        }
    }
};
