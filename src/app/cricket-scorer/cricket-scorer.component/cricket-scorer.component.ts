import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SetupScreenComponent } from '../components/setup-screen/setup-screen.component';
import { ScoreSummaryComponent } from '../components/score-summary/score-summary.component';
import { BallControlsComponent, BallInput } from '../components/ball-controls/ball-controls.component';
import { OverCardComponent } from '../components/over-card/over-card.component';

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
  id: number;
  overNo: number;
  bowlerName: string;
  balls: Ball[];
}

interface InningsData {
  overs: Over[];
  currentOver: {
    overNo: number;
    bowlerName: string;
    balls: Ball[];
  };
  showBowlerInput: boolean;
}

interface MatchSetup {
  team1: string;
  team2: string;
  location: string;
  date: string;
  time: string;
}

interface MatchData {
  matchSetup: MatchSetup | null;
  currentInnings: number;
  innings: {
    1: InningsData;
    2: InningsData;
  };
}

@Component({
  selector: 'app-cricket-scorer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SetupScreenComponent,
    ScoreSummaryComponent,
    BallControlsComponent,
    OverCardComponent
  ],
  templateUrl: './cricket-scorer.component.html',
  styleUrls: ['./cricket-scorer.component.css']
})
export class CricketScorerComponent implements OnInit {
  // Signals for reactive state management
  matchSetup = signal<MatchSetup | null>(null);
  currentInnings = signal<number>(1);
  innings = signal<{
    1: InningsData;
    2: InningsData;
  }>({
    1: {
      overs: [],
      currentOver: { overNo: 1, bowlerName: '', balls: [] },
      showBowlerInput: true
    },
    2: {
      overs: [],
      currentOver: { overNo: 1, bowlerName: '', balls: [] },
      showBowlerInput: true
    }
  });

  // Form data for match setup
  setupForm = {
    team1: '',
    team2: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5)
  };

  // Computed signals
  currentInningsData = computed(() => this.innings()[this.currentInnings() as 1 | 2]);

  ngOnInit(): void {
    this.loadFromLocalStorage();
  }

  loadFromLocalStorage(): void {
    const savedData = localStorage.getItem('cricketMatch');
    if (savedData) {
      try {
        const data: MatchData = JSON.parse(savedData);
        this.matchSetup.set(data.matchSetup || null);
        this.currentInnings.set(data.currentInnings || 1);
        this.innings.set(data.innings || this.innings());
      } catch (e) {
        console.error('Error loading data:', e);
      }
    }
  }

  saveToLocalStorage(): void {
    const data: MatchData = {
      matchSetup: this.matchSetup(),
      currentInnings: this.currentInnings(),
      innings: this.innings()
    };
    localStorage.setItem('cricketMatch', JSON.stringify(data));
  }

  handleMatchSetup(setupData: MatchSetup): void {
    this.matchSetup.set(setupData);
    this.saveToLocalStorage();
  }

  handleBowlerSubmit(): void {
    const inningsData = this.innings()[this.currentInnings() as 1 | 2];
    if (!inningsData.currentOver.bowlerName.trim()) {
      alert('Please enter bowler name');
      return;
    }
    inningsData.showBowlerInput = false;
    this.innings.set({ ...this.innings() });
    this.saveToLocalStorage();
  }

  handleBallInput(ballInput: BallInput): void {
    this.addBall(
      ballInput.runs,
      ballInput.isWide,
      ballInput.isNoBall,
      ballInput.isWicket,
      ballInput.isBye,
      ballInput.isLegBye
    );
  }

  addBall(runs: number, isWide = false, isNoBall = false, isWicket = false, isBye = false, isLegBye = false): void {
    const inningsData = this.innings()[this.currentInnings() as 1 | 2];

    const newBall: Ball = {
      id: Date.now(),
      runs,
      isWide,
      isNoBall,
      isWicket,
      isBye,
      isLegBye,
      label: this.getBallLabel(runs, isWide, isNoBall, isWicket, isBye, isLegBye)
    };

    inningsData.currentOver.balls.push(newBall);

    const legalBalls = inningsData.currentOver.balls.filter(b => !b.isWide && !b.isNoBall).length;

    if (legalBalls === 6) {
      const completedOver: Over = {
        id: Date.now(),
        overNo: inningsData.currentOver.overNo,
        bowlerName: inningsData.currentOver.bowlerName,
        balls: [...inningsData.currentOver.balls]
      };

      inningsData.overs.push(completedOver);
      inningsData.currentOver = {
        overNo: inningsData.currentOver.overNo + 1,
        bowlerName: '',
        balls: []
      };
      inningsData.showBowlerInput = true;
    }

    this.innings.set({ ...this.innings() });
    this.saveToLocalStorage();
  }

  getBallLabel(runs: number, isWide: boolean, isNoBall: boolean, isWicket: boolean, isBye: boolean, isLegBye: boolean): string {
    if (isWide) return `WD+${runs}`;
    if (isNoBall) return `NB+${runs}`;
    if (isWicket) return 'W';
    if (isBye) return `${runs}b`;
    if (isLegBye) return `${runs}lb`;
    return runs.toString();
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

  calculateInningsTotal(inningsNum: number): { runs: number; wickets: number; overs: string } {
    const inningsData = this.innings()[inningsNum as 1 | 2];
    let totalRuns = 0;
    let totalWickets = 0;
    let totalBalls = 0;

    inningsData.overs.forEach((over: Over) => {
      const stats = this.calculateOverStats(over.balls);
      totalRuns += stats.runs;
      totalWickets += stats.wickets;
      totalBalls += stats.balls;
    });

    if (inningsData.currentOver.balls.length > 0) {
      const stats = this.calculateOverStats(inningsData.currentOver.balls);
      totalRuns += stats.runs;
      totalWickets += stats.wickets;
      totalBalls += stats.balls;
    }

    const totalOvers = Math.floor(totalBalls / 6) + (totalBalls % 6) / 10;
    return { runs: totalRuns, wickets: totalWickets, overs: totalOvers.toFixed(1) };
  }

  deleteLastBall(): void {
    const inningsData = this.innings()[this.currentInnings() as 1 | 2];

    if (inningsData.currentOver.balls.length > 0) {
      inningsData.currentOver.balls.pop();
    } else if (inningsData.overs.length > 0) {
      const lastOver = inningsData.overs.pop()!;
      inningsData.currentOver = {
        overNo: lastOver.overNo,
        bowlerName: lastOver.bowlerName,
        balls: [...lastOver.balls]
      };
      inningsData.showBowlerInput = false;
    }

    this.innings.set({ ...this.innings() });
    this.saveToLocalStorage();
  }

  switchInnings(inningsNum: number): void {
    this.currentInnings.set(inningsNum);
    this.saveToLocalStorage();
  }

  getMatchResult(): string | null {
    const innings1 = this.calculateInningsTotal(1);
    const innings2 = this.calculateInningsTotal(2);

    if (innings2.runs === 0 && innings2.wickets === 0) {
      return null;
    }

    if (innings2.runs > innings1.runs) {
      const margin = 10 - innings2.wickets;
      return `${this.matchSetup()?.team2} won by ${margin} wicket${margin !== 1 ? 's' : ''}`;
    } else if (innings1.runs > innings2.runs) {
      const margin = innings1.runs - innings2.runs;
      return `${this.matchSetup()?.team1} won by ${margin} run${margin !== 1 ? 's' : ''}`;
    } else if (innings2.wickets === 10) {
      return 'Match Tied';
    }

    return null;
  }

  handleReset(): void {
    if (confirm('Are you sure you want to reset the entire match?')) {
      this.matchSetup.set(null);
      this.currentInnings.set(1);
      this.innings.set({
        1: { overs: [], currentOver: { overNo: 1, bowlerName: '', balls: [] }, showBowlerInput: true },
        2: { overs: [], currentOver: { overNo: 1, bowlerName: '', balls: [] }, showBowlerInput: true }
      });
      localStorage.removeItem('cricketMatch');
    }
  }

  getBattingTeam(): string {
    return this.currentInnings() === 1 ? this.matchSetup()?.team1 || '' : this.matchSetup()?.team2 || '';
  }

  getBowlingTeam(): string {
    return this.currentInnings() === 1 ? this.matchSetup()?.team2 || '' : this.matchSetup()?.team1 || '';
  }

  getTarget(): { target: number; needed: number } | null {
    if (this.currentInnings() !== 2) return null;

    const innings1Total = this.calculateInningsTotal(1);
    const innings2Total = this.calculateInningsTotal(2);
    const target = innings1Total.runs + 1;
    const needed = target - innings2Total.runs;

    return { target, needed };
  }

  getBallClass(ball: Ball): string {
    if (ball.isWicket) return 'ball-wicket';
    if (ball.isWide || ball.isNoBall) return 'ball-extra';
    if (ball.runs === 6) return 'ball-six';
    if (ball.runs === 4) return 'ball-four';
    return 'ball-normal';
  }

  getRunRate(inningsNum: number): string {
    const total = this.calculateInningsTotal(inningsNum);
    const oversDecimal = parseFloat(total.overs);
    if (oversDecimal === 0) return '0.00';
    const runRate = total.runs / oversDecimal;
    return runRate.toFixed(2);
  }
}