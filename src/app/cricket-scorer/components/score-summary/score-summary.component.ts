import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-score-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score-summary.component.html',
  styleUrls: ['./score-summary.component.css']
})
export class ScoreSummaryComponent {
  battingTeam = input.required<string>();
  bowlingTeam = input.required<string>();
  runs = input.required<number>();
  wickets = input.required<number>();
  overs = input.required<string>();
  runRate = input.required<string>();
  target = input<{ target: number; needed: number } | null>(null);
  matchResult = input<string | null>(null);
}
