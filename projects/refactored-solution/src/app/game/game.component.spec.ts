import { TestBed } from '@angular/core/testing';
import { GameComponent } from './game.component';
import { By } from '@angular/platform-browser';
import { HistoryComponent } from './history/history.component';
import { GameComponentModule } from './game.module';
import { GameService } from './game.service';

describe('Game component', () => {

  beforeEach(async () => {
    await TestBed
      .configureTestingModule({
        imports: [GameComponentModule]
      })
      .compileComponents();
  });

  it('should hide moves history if game has not yet started', () => {
    const fixture = TestBed.createComponent(GameComponent);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.directive(HistoryComponent))).toBeFalsy();
  });

  it('should show moves history if game has started', () => {
    const fixture = TestBed.createComponent(GameComponent);
    fixture.detectChanges();

    // Programmatically triggering a play
    fixture.debugElement.injector.get(GameService).play(1);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.directive(HistoryComponent))).toBeTruthy();
  });
});
