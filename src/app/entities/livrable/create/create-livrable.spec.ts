import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLivrable } from './create-livrable';

describe('CreateLivrable', () => {
  let component: CreateLivrable;
  let fixture: ComponentFixture<CreateLivrable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateLivrable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateLivrable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
