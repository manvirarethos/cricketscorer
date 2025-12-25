import { Component, output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-splash-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.css']
})
export class SplashScreenComponent implements OnInit {
  splashComplete = output<void>();
  isVisible = true;

  ngOnInit(): void {
    // Auto-hide splash screen after 3 seconds
    setTimeout(() => {
      this.isVisible = false;
      setTimeout(() => {
        this.splashComplete.emit();
      }, 500); // Wait for fade out animation
    }, 3000);
  }
}
