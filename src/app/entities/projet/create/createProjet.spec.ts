import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProjet } from './createProjet';

describe('Create', () => {
  let component: CreateProjet;
  let fixture: ComponentFixture<CreateProjet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateProjet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProjet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
