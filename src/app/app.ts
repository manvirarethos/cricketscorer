import { Component, OnInit } from '@angular/core';
import { CricketScorerComponent } from './cricket-scorer/cricket-scorer.component/cricket-scorer.component';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CricketScorerComponent],
  template: '<app-cricket-scorer></app-cricket-scorer>',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  title = 'cricket-scorer';
  updateAvailable = false;

  constructor(private swUpdate: SwUpdate) {}

  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY')).subscribe(() => {
        this.updateAvailable = true;
      });
      setInterval(() => { this.swUpdate.checkForUpdate(); }, 6 * 60 * 60 * 1000);
    }
  }

  updateApp(): void {
    this.swUpdate.activateUpdate().then(() => { window.location.reload(); });
  }
}