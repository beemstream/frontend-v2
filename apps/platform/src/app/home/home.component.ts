import { Component } from '@angular/core';
import { StreamCollectionService } from '../stream-collection.service';

@Component({
  selector: 'nbp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [StreamCollectionService],
})
export class HomeComponent {
  streams = this.streamColllectionService.getStreams();

  availableLanguages = this.streamColllectionService.getAvailableLanguages();

  availableProgrammingLanguages = this.streamColllectionService.getAvailableProgrammingLanguages();

  templateStreams = this.streams;

  constructor(
    private readonly streamColllectionService: StreamCollectionService
  ) {}

  forceRefresh() {
    this.templateStreams = this.streamColllectionService.refreshStreams();
  }
}
