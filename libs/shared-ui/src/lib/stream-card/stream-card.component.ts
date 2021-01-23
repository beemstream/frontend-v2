import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-stream-card',
  templateUrl: './stream-card.component.html',
  styleUrls: ['./stream-card.component.css']
})
export class StreamCardComponent implements OnInit {

  @Input() tags: string[];
  @Input() streamTitle: string;
  @Input() img: string;
  @Input() username: string;
  @Input() viewerNo: number;

  constructor() { }

  ngOnInit(): void {
  }

}
