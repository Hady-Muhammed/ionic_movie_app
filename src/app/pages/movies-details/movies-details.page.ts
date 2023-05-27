import { MovieService } from 'src/app/services/movie.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/Movie';

@Component({
  selector: 'app-movies-details',
  templateUrl: './movies-details.page.html',
  styleUrls: ['./movies-details.page.scss'],
})
export class MoviesDetailsPage implements OnInit {
  movie!: Movie
  constructor(private route: ActivatedRoute, private movieServie: MovieService) {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    this.movieServie.getMovieDetails(id).subscribe((movie: Movie) => {
      this.movie = movie
      console.log(movie)
    })
  }

  ngOnInit() {}

  openHomepage() {
    window.open(this.movie.homepage)
  }
}
