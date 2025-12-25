import { Component, output } from '@angular/core';

export interface BallInput {
  runs: number;
  isWide?: boolean;
  isNoBall?: boolean;
  isWicket?: boolean;
  isBye?: boolean;
  isLegBye?: boolean;
}

@Component({
  selector: 'app-ball-controls',
  standalone: true,
  imports: [],
  templateUrl: './ball-controls.component.html',
  styleUrls: ['./ball-controls.component.css']
})
export class BallControlsComponent {
  ballAdded = output<BallInput>();
  undoRequested = output<void>();

  addBall(runs: number, isWide = false, isNoBall = false, isWicket = false, isBye = false, isLegBye = false): void {
    this.ballAdded.emit({ runs, isWide, isNoBall, isWicket, isBye, isLegBye });
  }

  undo(): void {
    this.undoRequested.emit();
  }
}
