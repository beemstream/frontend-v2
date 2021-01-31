import { Component, OnInit } from '@angular/core';
import { StreamDetailService } from '../stream-detail.service';

@Component({
  selector: 'nbp-stream-detail',
  templateUrl: './stream-detail.component.html',
  styleUrls: ['./stream-detail.component.css'],
  providers: [StreamDetailService]
})
export class StreamDetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
