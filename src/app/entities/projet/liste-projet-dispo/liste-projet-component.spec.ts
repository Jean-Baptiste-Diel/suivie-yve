import { ComponentFixture, TestBed } from '@angular/core/testing';

// Correct the import path if the file is named 'liste-projet-dispo.component.ts'
import { ListeProjetComponent } from './liste-projet-component';

describe('ListCommentaire', () => {
  let component: ListeProjetComponent;
  let fixture: ComponentFixture<ListeProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeProjetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
