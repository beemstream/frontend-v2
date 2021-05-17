import { Component } from '@angular/core';
import { StreamCategoryService } from '../stream-category.service';

@Component({
  selector: 'nbp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [StreamCategoryService],
})
export class HomeComponent {
  streams = this.streamCategoryServic.getStreams();

  availableLanguages = this.streamCategoryServic.getAvailableLanguages();

  availableProgrammingLanguages = this.streamCategoryServic.getAvailableProgrammingLanguages();

  templateStreams = this.streams;

  constructor(private readonly streamCategoryServic: StreamCategoryService) {}

  forceRefresh() {
    this.templateStreams = this.streamCategoryServic.refreshStreams();
  }
}
