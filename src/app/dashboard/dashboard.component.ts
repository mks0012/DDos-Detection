import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  entropyValue: number = 0;  // Variable to track the entropy value

  // Function to calculate entropy from traffic data
  calculateEntropy(data: number[]): number {
    const total = data.length;
    const frequencies = new Map<number, number>();

    // Count frequencies of each data point
    for (const value of data) {
      frequencies.set(value, (frequencies.get(value) || 0) + 1);
    }

    // Calculate entropy using the Shannon entropy formula
    let entropy = 0;
    for (const freq of frequencies.values()) {
      const probability = freq / total;
      entropy -= probability * Math.log2(probability);
    }

    return entropy;
  }

  // Method to simulate DDoS detection and entropy changes
  detectAttack() {
    console.log('Running DDoS detection...');
    
    let counter = 0;
    const intervalId = setInterval(() => {
      // Simulate random traffic data (e.g., packet sizes, request counts, etc.)
      const simulatedTraffic = Array.from({ length: 100 }, () => Math.floor(Math.random() * 100));

      // Calculate entropy based on simulated traffic data
      const entropy = this.calculateEntropy(simulatedTraffic);

      // Update the entropy value
      this.entropyValue = entropy;

      counter++;
      console.log(`Iteration ${counter}: Entropy = ${entropy}`);

      if (counter > 10) {  // Stop after 10 iterations (for demo)
        clearInterval(intervalId);
        console.log('DDoS detection completed.');
      }
    }, 3000);  // Update every 3 seconds
  }
}
