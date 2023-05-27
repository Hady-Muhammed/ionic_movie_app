import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  getTopRatedMovies(page = 1): Observable<any> {
    return this.http
      .get(
        environment.API_URL +
          `/movie/popular?api_key=${environment.apiKey}&page=${page}`
      )
      .pipe(
        map((response: any) => {
          response.results.forEach((movie: any) => {
            movie.poster_path = `${environment.images}/w92${movie.poster_path}`;
          });
          return response;
        })
      );
  }
  getMovieDetails(id: string | null): Observable<any> {
    return this.http
      .get(environment.API_URL + `/movie/${id}?api_key=${environment.apiKey}`)
      .pipe(
        map((movie: any) => {
          movie.poster_path = `${environment.images}/w400${movie.poster_path}`;
          return movie;
        })
      );
  }
}
