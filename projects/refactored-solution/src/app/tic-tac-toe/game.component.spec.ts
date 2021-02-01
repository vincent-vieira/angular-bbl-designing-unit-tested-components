import { TestBed } from '@angular/core/testing';
import { TicTacToeGameComponent } from './game.component';
import { By } from '@angular/platform-browser';
import { TicTacToeGameComponentModule } from './game.module';
import { TicTacToeGameService } from './game.service';
import { GameStateHistoryComponent } from './state/history/state-history.component';

describe('Tic-tac-toe game component', () => {

  beforeEach(async () => {
    await TestBed
      .configureTestingModule({
        imports: [TicTacToeGameComponentModule]
      })
      .compileComponents();
  });

  it('should hide moves history if game has not yet started', () => {
    const fixture = TestBed.createComponent(TicTacToeGameComponent);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.directive(GameStateHistoryComponent))).toBeFalsy();
  });

  it('should show moves history if game has started', () => {
    const fixture = TestBed.createComponent(TicTacToeGameComponent);
    fixture.detectChanges();

    // Programmatically triggering a play
    fixture.debugElement.injector.get(TicTacToeGameService).play(1);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.directive(GameStateHistoryComponent))).toBeTruthy();
  });
});
