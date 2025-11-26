import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjet } from './edit-projet';

describe('EditProjet', () => {
  let component: EditProjet;
  let fixture: ComponentFixture<EditProjet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProjet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProjet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
