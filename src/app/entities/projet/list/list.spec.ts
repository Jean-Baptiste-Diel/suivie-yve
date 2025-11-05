import { ComponentFixture, TestBed } from '@angular/core/testing';

// Correct the import path if the file is named 'list.component.ts'
import { List } from './list';

describe('ListCommentaire', () => {
  let component: List;
  let fixture: ComponentFixture<List>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [List]
    })
    .compileComponents();

    fixture = TestBed.createComponent(List);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
