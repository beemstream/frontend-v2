import { Component } from '@angular/core';
import { StreamCategoryService } from '../stream-category.service';

@Component({
  selector: 'nbp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [StreamCategoryService],
})
export class HomeComponent {
  streams = this.streamCategoryService.getStreams();

  availableLanguages = this.streamCategoryService.getAvailableLanguages();

  availableProgrammingLanguages = this.streamCategoryService.getAvailableProgrammingLanguages();

  templateStreams = this.streams;

  constructor(private readonly streamCategoryService: StreamCategoryService) {}

  forceRefresh() {
    this.templateStreams = this.streamCategoryService.refreshStreams();
  }
}
