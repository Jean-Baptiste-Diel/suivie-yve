import { ComponentFixture, TestBed } from '@angular/core/testing';

// Correct the import path if the file is named 'liste-projet-dispo.component.ts'
import { ListeProjetDispoComponent } from './liste-projet-dispo-component';

describe('ListCommentaire', () => {
  let component: ListeProjetDispoComponent;
  let fixture: ComponentFixture<ListeProjetDispoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeProjetDispoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeProjetDispoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
