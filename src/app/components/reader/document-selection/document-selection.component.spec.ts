import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentSelectionComponent } from './document-selection.component';

describe('DocumentSelectionComponent', () => {
  let component: DocumentSelectionComponent;
  let fixture: ComponentFixture<DocumentSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentSelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
