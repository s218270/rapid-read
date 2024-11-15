//reader component ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
export class ReaderComponent {
  sidenavOpened = false;
  readingMode: 'bionic' | 'static' = 'bionic';
  fontSize = 16;
  bgColor = '#ffffff';
  fontColor = '#000000';
}
