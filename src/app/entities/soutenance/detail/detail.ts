import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';

@Component({
  selector: 'app-detail-soutenance',
  imports: [
  ],
  templateUrl: './detail.html',
  styleUrl: './detail.scss'
})


export class Detail implements OnInit {
  constructor(private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    console.log("ngOnInit");
  }
}
