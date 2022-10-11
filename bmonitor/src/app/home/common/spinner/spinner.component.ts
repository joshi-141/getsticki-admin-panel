import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  @Input() timeout: number | undefined;
  waiting: boolean | undefined;
  constructor() {
    this.waiting = true;
  }

  ngOnInit(): void {
    const time: number = this.timeout || 10000;
    setTimeout(() => {
      this.waiting = false;
    }, time)
  }

}
