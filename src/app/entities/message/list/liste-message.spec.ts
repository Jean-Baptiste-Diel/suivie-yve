import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeMessage } from './liste-message';

describe('ListCommentaire', () => {
  let component: ListeMessage;
  let fixture: ComponentFixture<ListeMessage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeMessage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeMessage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
