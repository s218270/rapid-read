import { PageService } from './../../../services/page.service';
import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Renderer2,
  ViewChildren,
  QueryList,
  Inject,
  PLATFORM_ID,
  SecurityContext,
  InjectionToken,
} from '@angular/core';
import { DocumentService } from '../../../services/document.service';
import { BionicModeService } from '../../../services/bionic-mode.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer } from '@angular/platform-browser';
import { IntersectionObserverService } from '../../../services/intersection-observer.service';
import { ReadingSpeedService } from '../../../services/reading-speed.service';

@Component({
  selector: 'app-read',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule, MatButtonModule],
  templateUrl: './read.component.html',
  styleUrl: './read.component.scss',
})
export class ReadComponent implements OnInit, AfterViewInit {
  currentWordIndex = 0;
  isReading = false;
  intervalId: any;
  pages: string[] = [];
  documentLoaded = false;
  readingMode: 'bionic' | 'static' = 'bionic';
  fontSize = 16;
  readingSpeed = 300;
  bionicText =
    'This is a sample bionic text. Some parts are bold to help with focus.';
  currentWord = 'Welcome';
  pagesLoadedCount = 0;
  pagesPerLoad = 1;
  visiblePages: Set<number> = new Set();

  @ViewChild('sidenav') sidenav: any;
  @ViewChildren('page') pageElements!: QueryList<ElementRef>;

  constructor(
    private documentService: DocumentService,
    private bionicModeService: BionicModeService,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2,
    private intersectionObserverService: IntersectionObserverService,
    private pageService: PageService,
    private readingSpeedService: ReadingSpeedService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit(): void {
    const documentData = this.documentService.getDocumentData();
    if (documentData) {
      this.bionicText = this.bionicModeService.toBionic(documentData.text);
      this.pages = this.pageService.splitTextIntoPages(
        this.bionicModeService.toBionic(documentData.text),
        this.fontSize
      );
      this.documentLoaded = true;
      this.updatePages();
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.intersectionObserverService.attachIntersectionObserver(
        this,
        this.pageElements,
        this.visiblePages
      );
    }
  }

  updatePages() {
    if (!this.documentService.getDocumentData()) {
      return;
    }

    const documentData = this.documentService.getDocumentData();
    this.visiblePages.clear();
    this.pages = this.pageService.splitTextIntoPages(
      this.bionicModeService.toBionic(documentData!.text),
      this.fontSize
    );
    this.pageService.loadMorePages(
      this.pages,
      this.pagesLoadedCount,
      this.pagesPerLoad,
      this.visiblePages
    );
    this.pagesLoadedCount += this.pagesPerLoad;
  }

  stripHtmlTags(text: string): string {
    return text.replace(/<[^>]*>/g, '');
  }

  onToggleChange(event: any) {
    this.readingMode = event.checked ? 'static' : 'bionic';
  }

  getSanitizedBionicHtml(page: string): any {
    return this.sanitizer.sanitize(SecurityContext.HTML, page);
  }

  loadPageContent(element: HTMLElement, pageIndex: number) {
    const pageContent = this.pages[pageIndex];
    const sanitizedContent = this.getSanitizedBionicHtml(pageContent);
    this.renderer.setProperty(element, 'innerHTML', sanitizedContent as string);
  }

  unloadPageContent(element: HTMLElement) {
    element.innerHTML = '&nbsp;'; // Clear the content to save memory
  }

  startStopReading() {
    this.readingSpeedService.startStopReading(this);
  }

  increaseSpeed() {
    this.readingSpeedService.increaseSpeed(this);
  }

  decreaseSpeed() {
    this.readingSpeedService.decreaseSpeed(this);
  }

  goBackWords() {
    this.readingSpeedService.goBackWords(this);
  }
}
