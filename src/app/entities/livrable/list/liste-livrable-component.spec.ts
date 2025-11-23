import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeLivrableComponent } from './liste-livrable-component';

describe('ListCommentaire', () => {
  let component: ListeLivrableComponent;
  let fixture: ComponentFixture<ListeLivrableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeLivrableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeLivrableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
