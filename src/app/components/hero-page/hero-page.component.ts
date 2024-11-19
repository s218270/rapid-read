import {
  Component,
  OnInit,
  Inject,
  PLATFORM_ID,
  ElementRef,
  ViewChildren,
  QueryList,
  AfterViewInit,
} from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import {
  trigger,
  style,
  animate,
  transition,
  keyframes,
} from '@angular/animations';
import { BionicModeService } from '../../services/bionic-mode.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-hero-page',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    MatCardModule,
    MatButtonModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './hero-page.component.html',
  styleUrls: ['./hero-page.component.scss'],
  animations: [
    trigger('waveAnimation', [
      transition(':increment', [
        animate(
          '14s cubic-bezier(0.42, 0.0, 0.58, 1.0)', // 4 seconds animation + 10 seconds pause
          keyframes([
            style({
              transform: 'rotateX(0deg)',
              fontFamily: 'Roboto',
              offset: 0,
            }),
            style({
              transform: 'rotateX(180deg)',
              fontFamily: '{{ randomFont }}',
              offset: 0.5,
            }),
            style({
              transform: 'rotateX(360deg)',
              fontFamily: 'Roboto',
              offset: 1.0,
            }),
          ])
        ),
      ]),
    ]),
    trigger('contentAnimation', [
      transition(':enter', [
        animate(
          '1s ease-in-out',
          keyframes([
            style({
              opacity: 0.2,
              transform: 'scale(0.8) translateY(20px)',
              offset: 0,
            }),
            style({
              opacity: 0.5,
              transform: 'scale(1.05) translateY(-10px)',
              offset: 0.7,
            }),
            style({
              opacity: 1,
              transform: 'scale(1) translateY(0)',
              offset: 1.0,
            }),
          ])
        ),
      ]),
      transition(':leave', [
        animate(
          '0.8s ease-in-out',
          keyframes([
            style({
              opacity: 1,
              transform: 'scale(1) translateX(0)',
              offset: 0,
            }),
            style({
              opacity: 0.5,
              transform: 'scale(0.9) translateX(20px)',
              offset: 0.5,
            }),
            style({
              opacity: 0,
              transform: 'scale(0.8) translateX(-20px)',
              offset: 1,
            }),
          ])
        ),
      ]),
    ]),
  ],
})
export class HeroPageComponent implements OnInit {
  @ViewChildren('contentCard', { read: ElementRef })
  contentCards!: QueryList<ElementRef>;

  titleArray: string[] = [];
  fonts: string[] = [
    'Roboto',
    'Georgia',
    'Courier Prime',
    'Comic Neue',
    'Verdana',
    'Tahoma',
    'Impact',
    'Great Vibes',
    'Cinzel Decorative',
    'Shadows Into Light',
    'Pacifico',
    'Playfair Display',
    'Lobster',
  ];
  fontWeights: string[] = [
    '900',
    '800',
    '800',
    '500',
    '500',
    '500',
    '300',
    '300',
    '100',
    '100',
  ]; // Different font weights
  triggerAnimation = false;

  info: string[] = [
    `Revolutionizing How You Read`,
    `Welcome to Rapid-Read, a cutting-edge platform designed to enhance your
    reading skills by transforming the way you interact with text. Our unique
    methods combine innovative techniques like Bionic Reading and RSVP (Rapid
    Serial Visual Presentation) to boost your reading speed and comprehension.
    Whether you're an avid reader looking to enhance your speed, or a student
    wanting to better absorb information, Rapid-Read is the tool that will change
    how you process content, making reading faster, more engaging, and efficient.`,
    `Bionic Reading: Let Your Eyes Guide the Way`,
    `Bionic Reading is all about guiding your eyes seamlessly across text by
      highlighting the key parts of words, allowing for faster recognition and
      processing. By bolding the initial segments of words, Rapid-Read helps
      your eyes quickly latch onto the core meaning, enabling a smoother flow
      across the text. This technique has been shown to reduce eye strain while
      helping readers focus better, especially when dealing with dense or
      lengthy content. Bionic Reading empowers users to effortlessly improve
      their reading experience by naturally accelerating their reading pace
      without sacrificing comprehension.`,
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private bionicModeService: BionicModeService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.titleArray = 'Rapid-Read'.split('');
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('scroll', this.onScroll.bind(this));
      setTimeout(() => {
        this.triggerAnimation = true;
        this.updateFonts();
      }, 10000); // Initial delay
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.onScroll();
    }
  }

  onScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.contentCards.forEach((card: ElementRef) => {
        const rect = card.nativeElement.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          card.nativeElement.classList.add('in-view');
        } else {
          card.nativeElement.classList.remove('in-view');
        }
      });
    }
  }

  updateFonts(): void {
    setInterval(() => {
      this.titleArray.forEach((_, index) => {
        const randomFont =
          this.fonts[Math.floor(Math.random() * this.fonts.length)];
        document.documentElement.style.setProperty(
          `--font-${index}`,
          randomFont
        );
      });
    }, 14000); // Match the animation duration, including 10 seconds of pause
  }

  makeBionic(text: string) {
    return this.bionicModeService.toBionic(text);
  }
}
