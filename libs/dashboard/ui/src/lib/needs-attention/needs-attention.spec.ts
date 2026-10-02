import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NeedsAttention } from './needs-attention';

describe('NeedsAttention', () => {
  let component: NeedsAttention;
  let fixture: ComponentFixture<NeedsAttention>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NeedsAttention],
    }).compileComponents();

    fixture = TestBed.createComponent(NeedsAttention);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
