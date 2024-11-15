import { Injectable, Renderer2, ElementRef, QueryList } from '@angular/core';
import { ReadComponent } from '../components/reader/read/read.component';

@Injectable({
  providedIn: 'root',
})
export class IntersectionObserverService {
  attachIntersectionObserver(
    context: ReadComponent,
    pageElements: QueryList<ElementRef>,
    visiblePages: Set<number>
  ) {
    if (!('IntersectionObserver' in window)) {
      console.warn(
        'IntersectionObserver is not supported in this environment.'
      );
      context.pages.forEach((_, index) => visiblePages.add(index));
      return;
    }

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const pageIndex = parseInt(
          entry.target.getAttribute('data-page-index')!,
          10
        );
        if (entry.isIntersecting) {
          visiblePages.add(pageIndex);
          context.loadPageContent(entry.target as HTMLElement, pageIndex);
        } else {
          visiblePages.delete(pageIndex);
          context.unloadPageContent(entry.target as HTMLElement);
        }
      });
    }, options);

    pageElements.forEach((pageElement) => {
      observer.observe(pageElement.nativeElement);
    });
  }

  constructor() {}
}
