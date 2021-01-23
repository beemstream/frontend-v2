import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-stream-tag',
  templateUrl: './stream-tag.component.html',
  styleUrls: ['./stream-tag.component.css']
})
export class StreamTagComponent implements OnInit {

  @Input() tag: string;
  @Input() tagId: string;

  constructor() { }

  ngOnInit(): void {
  }

}
