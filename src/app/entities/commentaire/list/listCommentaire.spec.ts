import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCommentaire } from './listCommentaire';

describe('ListCommentaire', () => {
  let component: ListCommentaire;
  let fixture: ComponentFixture<ListCommentaire>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCommentaire]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCommentaire);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
