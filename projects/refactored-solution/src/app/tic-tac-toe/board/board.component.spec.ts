import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TicTacToeBoardComponent } from './board.component';
import { TicTacToeBoardComponentModule } from './board.module';
import { SharedModule } from '../../shared/shared.module';
import { TicTacToeSquareComponent } from '../square/square.component';

function rangeTo(size: number): number[] {
  return [...Array(size).keys()];
}

@Component({
  template: `
    <tic-tac-toe-board
      [size]="size"
      [squares]="[] | range: size * size"
      (squareClicked)="onSquareClicked($event)"
    ></tic-tac-toe-board>`,
})
class TestComponent {
  size: number;

  onSquareClicked(playIndex: number): void {
  }
}

describe('Board component', () => {
  beforeEach(
    async () =>
      await TestBed
        .configureTestingModule({
          imports: [TicTacToeBoardComponentModule, SharedModule],
          declarations: [TestComponent],
        })
        .compileComponents()
  );

  [
    [3, 9],
    [4, 16],
  ].forEach(([size, expectedElementsCount]) => {
    describe(`with size ${size} * ${size}`, () => {
      it('should be rendered', () => {
        const fixture = TestBed.createComponent(TicTacToeBoardComponent);

        expect(fixture).toBeTruthy();
        expect(fixture.componentInstance).toBeTruthy();
      });

      it(`should render ${size} rows`, () => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.componentInstance.size = size;
        fixture.detectChanges();

        expect(
          fixture.debugElement.queryAll(By.css('div.board-row')).length
        ).toBe(size);
      });

      it(`should render ${expectedElementsCount} cells`, () => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.componentInstance.size = size;
        fixture.detectChanges();

        expect(
          fixture.debugElement.queryAll(By.directive(TicTacToeSquareComponent)).length
        ).toBe(expectedElementsCount);
      });

      rangeTo(expectedElementsCount)
        .forEach((gridIndex) => {
          it(`should notify parent component when clicking on square number ${gridIndex}`, () => {
            const fixture = TestBed.createComponent(TestComponent);
            fixture.componentInstance.size = size;
            spyOn(fixture.componentInstance, 'onSquareClicked');

            fixture.detectChanges();

            fixture.debugElement
              .queryAll(By.css('button.square'))
              [gridIndex].nativeElement.click();
            fixture.detectChanges();

            expect(
              fixture.componentInstance.onSquareClicked
            ).toHaveBeenCalledOnceWith(gridIndex);
          });
        });
    });
  });
});
