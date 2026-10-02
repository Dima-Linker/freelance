import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActiveProjectCard } from './active-project-card';

describe('ActiveProjectCard', () => {
  let component: ActiveProjectCard;
  let fixture: ComponentFixture<ActiveProjectCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveProjectCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ActiveProjectCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
