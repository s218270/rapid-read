import { Injectable } from '@angular/core';
import { ReadComponent } from '../components/reader/read/read.component';
@Injectable({
  providedIn: 'root',
})
export class ReadingSpeedService {
  increaseSpeed(context: ReadComponent) {
    if (context.readingSpeed < 1000) {
      context.readingSpeed += 50;
      if (context.isReading) {
        clearInterval(context.intervalId);
        this.startStopReading(context);
      }
    }
  }

  decreaseSpeed(context: ReadComponent) {
    if (context.readingSpeed > 100) {
      context.readingSpeed -= 50;
      if (context.isReading) {
        clearInterval(context.intervalId);
        this.startStopReading(context);
      }
    }
  }

  goBackWords(context: ReadComponent) {
    context.currentWordIndex = Math.max(0, context.currentWordIndex - 10);
    //context.scrollToCurrentWord();
  }

  startStopReading(context: ReadComponent) {
    if (context.isReading) {
      clearInterval(context.intervalId);
      context.isReading = false;
    } else {
      context.isReading = true;
      context.intervalId = setInterval(() => {
        if (
          context.currentWordIndex < context.pages.join(' ').split(' ').length
        ) {
          context.currentWord = context.pages.join(' ').split(' ')[
            context.currentWordIndex
          ];
          context.currentWordIndex++;
          //context.scrollToCurrentWord();
        } else {
          this.startStopReading(context);
        }
      }, 60000 / context.readingSpeed);
    }
  }
  constructor() {}
}
