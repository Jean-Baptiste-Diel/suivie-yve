import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetValiderComponent } from './projet-valider-component';

describe('ProjetValiderComponent', () => {
  let component: ProjetValiderComponent;
  let fixture: ComponentFixture<ProjetValiderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjetValiderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjetValiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
