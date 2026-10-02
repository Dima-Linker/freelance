import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecommendedJobCard } from './recommended-job-card';

describe('RecommendedJobCard', () => {
  let component: RecommendedJobCard;
  let fixture: ComponentFixture<RecommendedJobCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecommendedJobCard],
    }).compileComponents();

    fixture = TestBed.createComponent(RecommendedJobCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
