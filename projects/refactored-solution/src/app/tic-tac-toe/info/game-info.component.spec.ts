import { TestBed } from '@angular/core/testing';
import { TicTacToeGameInfoComponentModule } from './game-info.module';
import { TicTacToeGameInfoComponent } from './game-info.component';
import { By } from '@angular/platform-browser';
import { TicTacToePlayer } from '../state/game.models';

describe('Game info component', () => {
  const players: TicTacToePlayer[] = ['X', 'O'];

  beforeEach(async () => {
    return TestBed
      .configureTestingModule({
        imports: [TicTacToeGameInfoComponentModule]
      })
      .compileComponents();
  });

  describe('when winner is absent', () => {

    players.forEach(player => {
      it(`should display the next player "${player}" if set`, () => {
        const fixture = TestBed.createComponent(TicTacToeGameInfoComponent);
        fixture.componentInstance.nextPlayer = player;
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('div.game-info')).nativeElement.textContent)
          .toEqual(`Next player: ${player}`);
      });

      it(`should not display the winner "${player}"`, () => {
        const fixture = TestBed.createComponent(TicTacToeGameInfoComponent);
        fixture.componentInstance.nextPlayer = player;
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('div.game-info')).nativeElement.textContent)
          .not
          .toEqual(`Winner: ${player}`);
      });
    });
  });

  players.forEach(player => {
    describe(`when winner is set as player "${player}"`, () => {
      it('should not display the next player', () => {
        const fixture = TestBed.createComponent(TicTacToeGameInfoComponent);
        fixture.componentInstance.winner = player;
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('div.game-info')).nativeElement.textContent)
          .not
          .toEqual(`Next player: ${player}`);
      });

      it('should display the winner', () => {
        const fixture = TestBed.createComponent(TicTacToeGameInfoComponent);
        fixture.componentInstance.winner = player;
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('div.game-info')).nativeElement.textContent)
          .toEqual(`Winner: ${player}`);
      });
    });
  });
});
