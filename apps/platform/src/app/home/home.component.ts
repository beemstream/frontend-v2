import { Component } from '@angular/core';
import { StreamCollectionService } from '../stream-collection.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'nbp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [StreamCollectionService],
})
export class HomeComponent {
  searchValue = new BehaviorSubject<string>('');

  streams = this.streamColllectionService.getStreams();

  availableLanguages = this.streamColllectionService.getAvailableLanguages();

  templateStreams = this.streams;

  constructor(
    private readonly streamColllectionService: StreamCollectionService
  ) {}

  forceRefresh() {
    this.templateStreams = this.streamColllectionService.refreshStreams();
  }
}
