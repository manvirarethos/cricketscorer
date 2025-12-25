import { Component, output } from '@angular/core';

import { FormsModule } from '@angular/forms';

interface MatchSetup {
  team1: string;
  team2: string;
  location: string;
  date: string;
  time: string;
}

@Component({
  selector: 'app-setup-screen',
  standalone: true,
  imports: [ FormsModule],
  templateUrl: './setup-screen.component.html',
  styleUrls: ['./setup-screen.component.css']
})
export class SetupScreenComponent {
  // Output event for when setup is complete
  setupComplete = output<MatchSetup>();

  // Form data for match setup
  setupForm = {
    team1: '',
    team2: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5)
  };

  handleMatchSetup(): void {
    if (!this.setupForm.team1 || !this.setupForm.team2 || !this.setupForm.location) {
      alert('Please fill in all required fields');
      return;
    }
    this.setupComplete.emit({ ...this.setupForm });
  }
}
