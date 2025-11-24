import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeSoutenanceEncadrantComponent } from './liste-soutenance-encadrant-component';

describe('ListeSoutenanceEncadrantComponent', () => {
  let component: ListeSoutenanceEncadrantComponent;
  let fixture: ComponentFixture<ListeSoutenanceEncadrantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeSoutenanceEncadrantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeSoutenanceEncadrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
