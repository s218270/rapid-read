//document service
import { Injectable } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private documentData: { title: string; text: string } | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.mjs';
    }
  }

  async loadPdfFromFile(file: File): Promise<{ title: string; text: string }> {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      let fullText = '';
      let title = file.name.replace('.pdf', '').replace(/_/g, ' ');

      for (let i = 1; i < pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        fullText += pageText + ' ';
      }
      this.setDocumentData({ title, text: fullText });
      return { title, text: fullText };
    } catch (error) {
      console.log('Error loading pdf', error);
      throw error;
    }
  }

  setDocumentData(documentData: { title: string; text: string }) {
    this.documentData = documentData;
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('documentData', JSON.stringify(documentData));
    }
  }

  getDocumentData(): { title: string; text: string } | null {
    if (!this.documentData && typeof window !== 'undefined') {
      const storedData = sessionStorage.getItem('documentData');
      if (storedData) {
        this.documentData = JSON.parse(storedData);
      }
    }
    return this.documentData;
  }
}
