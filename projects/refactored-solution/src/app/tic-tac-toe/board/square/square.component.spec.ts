import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SquareComponent } from './square.component';

@Component({
  template: `<tic-tac-toe-square
    [value]="'O'"
    (clicked)="onSquareClicked()"
  ></tic-tac-toe-square>`,
})
class TestComponent {
  onSquareClicked(): void {}
}

describe('Square component', () => {
  beforeEach(
    async () =>
      await TestBed.configureTestingModule({
        declarations: [SquareComponent, TestComponent],
        imports: [CommonModule],
      }).compileComponents()
  );

  it('should be initialized properly', () => {
    const fixture = TestBed.createComponent(SquareComponent);

    expect(fixture).toBeTruthy();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display a button with a value', () => {
    const fixture = TestBed.createComponent(TestComponent);

    fixture.detectChanges();

    const squareButton = fixture.debugElement.query(By.css('button.square'));
    expect(squareButton.nativeElement.innerText).toEqual('O');
  });

  it('should notify parent component when clicking on the button', () => {
    const fixture = TestBed.createComponent(TestComponent);
    spyOn(fixture.componentInstance, 'onSquareClicked');
    fixture.detectChanges();

    fixture.debugElement.query(By.css('button.square')).nativeElement.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.onSquareClicked).toHaveBeenCalledTimes(1);
    expect(fixture.componentInstance.onSquareClicked).toHaveBeenCalledWith();
  });
});
