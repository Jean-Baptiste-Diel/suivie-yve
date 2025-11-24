import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeProjetEncadrerComponent } from './liste-projet-encadrer-component';

describe('ListeProjetEncadrerComponent', () => {
  let component: ListeProjetEncadrerComponent;
  let fixture: ComponentFixture<ListeProjetEncadrerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeProjetEncadrerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeProjetEncadrerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
