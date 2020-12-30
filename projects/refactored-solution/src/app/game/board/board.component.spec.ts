import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BoardComponent } from './board.component';
import { BoardComponentModule } from './board.module';
import { SquareComponent } from './square/square.component';
import { SharedModule } from '../../shared/shared.module';

function rangeTo(size: number): number[] {
  return [...Array(size).keys()];
}

@Component({
  template: `<tic-tac-toe-board
    [size]="size"
    [squares]="[] | range: size * size"
    (squareClicked)="onSquareClicked($event)"
  ></tic-tac-toe-board>`,
})
class TestComponent {
  size: number;

  onSquareClicked(playIndex: number): void {}
}

describe('Board component', () => {
  beforeEach(
    async () =>
      await TestBed.configureTestingModule({
        imports: [BoardComponentModule, SharedModule],
        declarations: [TestComponent],
      }).compileComponents()
  );

  [
    [3, 9],
    [4, 16],
  ].forEach(([size, expectedElementsCount]) => {
    describe(`with size ${size} * ${size}`, () => {
      it('should be rendered', () => {
        const fixture = TestBed.createComponent(BoardComponent);

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
          fixture.debugElement.queryAll(By.directive(SquareComponent)).length
        ).toBe(expectedElementsCount);
      });

      rangeTo(expectedElementsCount)
        .map((playIndex) => [playIndex, playIndex + 1])
        .forEach(([gridIndex, playIndex]) => {
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
            ).toHaveBeenCalledTimes(1);
            expect(
              fixture.componentInstance.onSquareClicked
            ).toHaveBeenCalledWith(playIndex);
          });
        });
    });
  });
});
