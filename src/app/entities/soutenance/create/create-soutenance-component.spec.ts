import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSoutenanceComponent } from './create-soutenance-component';

describe('CreateSoutenanceComponent', () => {
  let component: CreateSoutenanceComponent;
  let fixture: ComponentFixture<CreateSoutenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSoutenanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSoutenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
