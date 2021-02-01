import { TestBed } from '@angular/core/testing';
import { GameStateHistoryComponentModule } from './state-history.module';
import { GameStateHistoryComponent } from './state-history.component';
import { By } from '@angular/platform-browser';

describe('History component', () => {
  beforeEach(async () => {
    await TestBed
      .configureTestingModule({
        imports: [GameStateHistoryComponentModule]
      })
      .compileComponents();
  });

  it('should display a list', () => {
    const fixture = TestBed.createComponent(GameStateHistoryComponent);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('ol'))).toBeTruthy();
  });

  [2, 3, 4].forEach(movesNumber => {
    it(`should render ${movesNumber} moves as list items, with the first move being with a special label`, () => {
      fail('implement');
    });
  });

  it('should render all subsequent moves with their index', () => {
    fail('implement');
  });

  [1, 2].forEach(moveNumber => {
    it(`should notify parent component when jumping to move ${moveNumber}`, () => {
      fail('implement');
    });
  });
});
