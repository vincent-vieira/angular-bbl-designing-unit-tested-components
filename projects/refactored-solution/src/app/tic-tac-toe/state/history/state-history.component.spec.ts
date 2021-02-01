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
      const fixture = TestBed.createComponent(GameStateHistoryComponent);
      fixture.componentInstance.size = movesNumber;
      fixture.detectChanges();

      const buttons = fixture.debugElement.queryAll(By.css('button'));

      expect(buttons.length).toBe(movesNumber);
      expect(buttons[0].nativeElement.textContent).toEqual('Go to game start');
    });
  });

  it('should render all subsequent moves with their index', () => {
    const fixture = TestBed.createComponent(GameStateHistoryComponent);
    fixture.componentInstance.size = 3;
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css('button'));

    expect(buttons.length).toBe(3);
    expect(buttons[1].nativeElement.textContent).toEqual('Go to move #1');
    expect(buttons[2].nativeElement.textContent).toEqual('Go to move #2');
  });

  [1, 2].forEach(moveNumber => {
    it(`should notify parent component when jumping to move ${moveNumber}`, () => {
      const fixture = TestBed.createComponent(GameStateHistoryComponent);
      spyOn(fixture.componentInstance.navigateTo, 'emit');
      fixture.componentInstance.size = moveNumber + 1;
      fixture.detectChanges();

      fixture.debugElement.query(By.css(`li:nth-child(${moveNumber + 1}) > button`)).nativeElement.click();
      fixture.detectChanges();

      expect(fixture.componentInstance.navigateTo.emit).toHaveBeenCalledTimes(1);
      expect(fixture.componentInstance.navigateTo.emit).toHaveBeenCalledWith(moveNumber);
    });
  });
});
