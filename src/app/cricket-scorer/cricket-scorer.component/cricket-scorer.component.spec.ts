import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CricketScorerComponent } from './cricket-scorer.component';

describe('CricketScorerComponent', () => {
  let component: CricketScorerComponent;
  let fixture: ComponentFixture<CricketScorerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CricketScorerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CricketScorerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
