import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListJury } from './listJury';

describe('ListCommentaire', () => {
  let component: ListJury;
  let fixture: ComponentFixture<ListJury>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListJury]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListJury);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
