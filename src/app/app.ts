import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CricketScorerComponent } from './cricket-scorer/cricket-scorer.component/cricket-scorer.component';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { FooterComponent } from './components/footer/footer.component';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CricketScorerComponent, SplashScreenComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  title = 'cricket-scorer';
  updateAvailable = false;
  showSplash = true;

  constructor(private swUpdate: SwUpdate) {}

  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY')).subscribe(() => {
        this.updateAvailable = true;
      });
      setInterval(() => { this.swUpdate.checkForUpdate(); }, 6 * 60 * 60 * 1000);
    }
  }

  onSplashComplete(): void {
    this.showSplash = false;
  }

  updateApp(): void {
    this.swUpdate.activateUpdate().then(() => { window.location.reload(); });
  }
}