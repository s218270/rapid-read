//bionic mode service
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class BionicModeService {
  constructor(private sanitizer: DomSanitizer) {}
  toBionic(text: string): string {
    return text
      .split(' ')
      .map((word) => {
        if (word.length <= 1) return word;
        const splitIndex = Math.ceil(word.length / 2);
        return `<b>${word.slice(0, splitIndex)}</b>${word.slice(splitIndex)}`;
      })
      .join(' ');
  }

  getSanitizedBionicHtmlWithSpans(page: string, pageIndex: number): SafeHtml {
    const words = page.split(' ');
    const wrappedWords = words
      .map(
        (word, index) =>
          `<span class="word-span" data-page-index="${pageIndex}" data-word-index="${index}">${word}</span>`
      )
      .join(' ');
    return this.sanitizer.bypassSecurityTrustHtml(wrappedWords);
  }

  stripHtmlTags(text: string): string {
    return text.replace(/<[^>]*>/g, '');
  }
}
