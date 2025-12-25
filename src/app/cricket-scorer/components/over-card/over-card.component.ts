import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Ball {
  id: number;
  runs: number;
  isWide: boolean;
  isNoBall: boolean;
  isWicket: boolean;
  isBye: boolean;
  isLegBye: boolean;
  label: string;
}

interface Over {
  id?: number;
  overNo: number;
  bowlerName: string;
  balls: Ball[];
}

@Component({
  selector: 'app-over-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './over-card.component.html',
  styleUrls: ['./over-card.component.css']
})
export class OverCardComponent {
  over = input<Over>();
  isCompleted = input<boolean>(false);

  getBallClass(ball: Ball): string {
    if (ball.isWicket) return 'ball-wicket';
    if (ball.isWide || ball.isNoBall) return 'ball-extra';
    if (ball.runs === 6) return 'ball-six';
    if (ball.runs === 4) return 'ball-four';
    return 'ball-normal';
  }

  calculateOverStats(balls: Ball[]): { runs: number; wickets: number; balls: number } {
    let runs = 0;
    let wickets = 0;

    balls.forEach(ball => {
      runs += ball.runs;
      if (ball.isWide || ball.isNoBall) runs += 1;
      if (ball.isWicket) wickets++;
    });

    return {
      runs,
      wickets,
      balls: balls.filter(b => !b.isWide && !b.isNoBall).length
    };
  }
}
