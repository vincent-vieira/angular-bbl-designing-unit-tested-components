import { TestBed } from '@angular/core/testing';
import { TicTacToeGameStateHistoryComponentModule } from './state-history.module';
import { TicTacToeGameStateHistoryComponent } from './state-history.component';
import { By } from '@angular/platform-browser';

describe('Tic-tac-toe game state history component', () => {
  beforeEach(async () => {
    await TestBed
      .configureTestingModule({
        imports: [TicTacToeGameStateHistoryComponentModule]
      })
      .compileComponents();
  });

  it('should display a list', () => {
    const fixture = TestBed.createComponent(TicTacToeGameStateHistoryComponent);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('ol'))).toBeTruthy();
  });

  [2, 3, 4].forEach(movesNumber => {
    it(`should render ${movesNumber} moves as list items, with the first move being with a special label`, () => {
      const fixture = TestBed.createComponent(TicTacToeGameStateHistoryComponent);
      fixture.componentInstance.size = movesNumber;
      fixture.detectChanges();

      const buttons = fixture.debugElement.queryAll(By.css('button'));

      expect(buttons.length).toBe(movesNumber);
      expect(buttons[0].nativeElement.textContent).toEqual('Go to game start');
    });
  });

  it('should render all subsequent moves with their index', () => {
    const fixture = TestBed.createComponent(TicTacToeGameStateHistoryComponent);
    fixture.componentInstance.size = 3;
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css('button'));

    expect(buttons.length).toBe(3);
    expect(buttons[1].nativeElement.textContent).toEqual('Go to move #1');
    expect(buttons[2].nativeElement.textContent).toEqual('Go to move #2');
  });

  [1, 2].forEach(moveNumber => {
    it(`should notify parent component when jumping to move ${moveNumber}`, () => {
      const fixture = TestBed.createComponent(TicTacToeGameStateHistoryComponent);
      spyOn(fixture.componentInstance.navigateTo, 'emit');
      fixture.componentInstance.size = moveNumber + 1;
      fixture.detectChanges();

      fixture.debugElement.query(By.css(`li:nth-child(${moveNumber + 1}) > button`)).nativeElement.click();
      fixture.detectChanges();

      expect(fixture.componentInstance.navigateTo.emit).toHaveBeenCalledOnceWith(moveNumber);
    });
  });
});
