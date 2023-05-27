import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  movies: any[] = [];
  currentPage = 1;

  constructor(
    private movieService: MovieService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.loadMovies();
  }

  async loadMovies(event?: any) {
    const loading = await this.loadingCtrl.create({
      message: 'loading...',
      spinner: 'bubbles',
    });

    await loading.present();
    this.movieService
      .getTopRatedMovies(this.currentPage)
      .subscribe((res: any) => {
        loading.dismiss();
        this.movies.push(...res.results);
        event?.target.complete();
      });
  }

  loadMore(event: any) {
    this.currentPage += 1;
    this.loadMovies(event);
  }
}
