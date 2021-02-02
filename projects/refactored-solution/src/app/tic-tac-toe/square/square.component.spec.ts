import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TicTacToeSquareComponent } from './square.component';
import { TicTacToePlayer } from '../state/game.models';
import { TicTacToeSquareComponentModule } from './square.module';

@Component({
  template: `
    <tic-tac-toe-square
      [value]="'O'"
      (clicked)="onSquareClicked()"
    ></tic-tac-toe-square>`,
})
class TestComponent {
  onSquareClicked(): void {
  }
}

describe('Tic-tac-toe square component', () => {
  beforeEach(
    async () =>
      await TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [TicTacToeSquareComponentModule],
      }).compileComponents()
  );

  it('should be initialized properly', () => {
    const fixture = TestBed.createComponent(TicTacToeSquareComponent);

    expect(fixture).toBeTruthy();
    expect(fixture.componentInstance).toBeTruthy();
  });

  ['X', 'O', ''].forEach(player => {
    it(`should display a button with the player's value "${player}"`, () => {
      const fixture = TestBed.createComponent(TicTacToeSquareComponent);
      fixture.componentInstance.value = player as TicTacToePlayer;
      fixture.detectChanges();

      const squareButton = fixture.debugElement.query(By.css('button.square'));
      expect(squareButton.nativeElement.innerText).toEqual(player);
    });
  });

  it('should notify parent component when clicking on the button', () => {
    const fixture = TestBed.createComponent(TestComponent);
    spyOn(fixture.componentInstance, 'onSquareClicked');
    fixture.detectChanges();

    fixture.debugElement.query(By.css('button.square')).nativeElement.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.onSquareClicked).toHaveBeenCalledOnceWith();
  });
});
