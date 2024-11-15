//document selection component ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DocumentService } from '../../../services/document.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-document-selection',
  standalone: true,
  imports: [MatButtonModule, CommonModule, RouterModule],
  templateUrl: './document-selection.component.html',
  styleUrl: './document-selection.component.scss',
})
export class DocumentSelectionComponent implements OnInit {
  isLoaded: boolean = false;
  documentTitle: string | undefined = '';

  constructor(
    private documentService: DocumentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.documentTitle = this.documentService.getDocumentData()?.title;
    console.log('doc title', this.documentTitle);
  }

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      try {
        const pdfDoc = await this.documentService.loadPdfFromFile(file);
        this.documentTitle = file.name.replace('.pdf', '').replace(/_/g, ' ');
        this.documentService.setDocumentData(pdfDoc); // Save document data to service
        this.router.navigate(['/reader/read']); // Navigate to the reader component
      } catch (error) {
        console.error('Error loading PDF:', error);
      }
    }
  }
}
