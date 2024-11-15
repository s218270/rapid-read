import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  splitTextIntoPages(text: string, fontSize: number): string[] {
    const containerHeight = window.innerHeight;
    const containerWidth = window.innerWidth;
    const charPerLine = Math.floor(containerWidth / (fontSize * 0.6));
    const linesPerPage = Math.floor(containerHeight / (fontSize * 1.2));
    const charsPerPage = charPerLine * linesPerPage;

    const pages = [];
    for (let i = 0; i < text.length; i += charsPerPage) {
      pages.push(text.slice(i, i + charsPerPage));
    }
    return pages;
  }

  loadMorePages(
    pages: string[],
    pagesLoadedCount: number,
    pagesPerLoad: number,
    visiblePages: Set<number>
  ) {
    const nextPages = pages.slice(
      pagesLoadedCount,
      pagesLoadedCount + pagesPerLoad
    );
    nextPages.forEach((_, index) => visiblePages.add(pagesLoadedCount + index));
  }
  constructor() {}
}
