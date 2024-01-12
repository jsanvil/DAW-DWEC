import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})
export class StarRatingComponent {
  auxRating!: number;
  @Input() rating!: number;

  @Output() ratingChanged = new EventEmitter<number>();

  setRating() {
    this.ratingChanged.emit(this.auxRating);
  }

  ngOnInit() {
    this.restoreRating();
  }

  restoreRating() {
    this.auxRating = this.rating;
  }
}