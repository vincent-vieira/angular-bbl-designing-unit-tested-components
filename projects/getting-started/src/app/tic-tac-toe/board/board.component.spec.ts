import { Component } from '@angular/core';

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

describe('Tic-tac-toe board component', () => {
  beforeEach(async () => {
    throw new Error('implement');
  });

  [
    [3, 9],
    [4, 16],
  ].forEach(([size, expectedElementsCount]) => {
    describe(`with size ${size} * ${size}`, () => {
      it('should be rendered', () => {
        fail('implement');
      });

      it(`should render ${size} rows`, () => {
        fail('implement');
      });

      it(`should render ${expectedElementsCount} cells`, () => {
        fail('implement');
      });

      rangeTo(expectedElementsCount)
        .forEach((gridIndex) => {
          it(`should notify parent component when clicking on square number ${gridIndex}`, () => {
            fail('implement');
          });
        });
    });
  });
});
