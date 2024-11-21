//reader component ts
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reader',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatSliderModule,
    MatToolbarModule,
    FormsModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './reader.component.html',
  styleUrl: './reader.component.scss',
})
export class ReaderComponent implements OnInit{
  sidenavOpened = false;
  openFontSettings = false;
  readingMode: 'bionic' | 'static' = 'bionic';
  fontSize = 16;
  bgColor = '#ffffff';
  selectedFontFamily = 'Roboto'; // Default font
  fonts: string[] = [
    'Roboto', 
    'Great Vibes', 
    'Cinzel Decorative', 
    'Shadows Into Light', 
    'Pacifico', 
    'Playfair Display', 
    'Lobster', 
    'Courier Prime', 
    'Comic Neue'
  ];
  selectedFontSize = 16;
  fontSizes: number[] = [
    8, 9, 10,
    11, 12, 13,
    14, 15, 16,
    17, 18, 19,
    20, 21, 22,
    23, 24, 25
  ]
  fontColor = '#000000';

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}


    ngOnInit(): void {
         // Set default font on component initialization
    this.applyFontFamily(this.selectedFontFamily);
    }

    onFontChange(): void {
        // Apply the selected font to the content dynamically
        this.applyFontFamily(this.selectedFontFamily);
      }
    
      applyFontFamily(font: string): void {
        if (isPlatformBrowser(this.platformId)) {
          document.documentElement.style.setProperty('--selected-font', font);
        }
      }

      onFontSizeChange(): void {
        // Apply the selected font to the content dynamically
        this.applyFontSize(this.selectedFontSize);
      }

      applyFontSize(size: number): void {
        if (isPlatformBrowser(this.platformId)) {
          document.documentElement.style.setProperty('--selected-size', `${size}px`);
        }
      }
}
