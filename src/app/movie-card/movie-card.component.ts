import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favorites: any[] = [];
  allMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  /**
   * @returns {array} all movies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  /**
   * Filter movies by favorites
   * @returns {array} favorite movies
   */
  displayFavorites(): any[] {
    this.getFavoriteMovies();
    this.allMovies = this.movies.slice();
    this.movies = this.allMovies.filter((obj) =>
      this.favorites.includes(obj._id)
    );
    return this.movies;
  }

  /**
   * Open the dialog when the genre button is clicked
   * @params {string} name - genre name
   * @params {string} description = genre description
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '400px',
    });
  }

  /**
   * Open the dialog when the director button is clicked
   * @params {string} name - director name
   * @params {string} bio = director description
   * @params {string} birth - director birth year
   */
  openDirectorDialog(name: string, bio: string, birth: string): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
      },
      width: '400px',
    });
  }

  /**
   * Open the dialog when the synopsis button is clicked
   * @params {string} title - movie name
   * @params {string} description = plot description
   * @params {string} cRating = critic rating
   * @params {string} aRating = audience rating
   */
  openSynopsisDialog(
    title: string,
    description: string,
    cRating: string,
    aRating: string
  ): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        Title: title,
        Description: description,
        CriticRating: cRating,
        AudienceRating: aRating,
      },
      width: '400px',
    });
  }

  /**
   * @returns {array} favorite movies IDs
   */
  getFavoriteMovies(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favorites = resp.favoriteMovies;
      return this.favorites;
    });
  }

  /**
   * Tests if a movie id is included in the favorites array
   * @params {string} movieID
   * @returns {boolean}
   */
  isFavoriteMovie(movieId: string): boolean {
    return this.favorites.includes(movieId);
  }

  /**
   * Adds a movie id to the favorites array
   * @params {string} movieID
   */
  addFavoriteMovie(movieId: string): void {
    this.fetchApiData.addFavorite(movieId).subscribe((result) => {
      this.snackBar.open('You have added this movie to your favorites!', 'OK', {
        duration: 3000,
      });
      this.ngOnInit();
    });
  }

  /**
   * Deletes a movie id to the favorites array
   * @params {string} movieID
   */
  deleteFavoriteMovie(movieId: string): void {
    this.fetchApiData.deleteFavorite(movieId).subscribe((result) => {
      this.snackBar.open(
        'You have deleted this movie from your favorites!',
        'OK',
        {
          duration: 3000,
        }
      );
      this.ngOnInit();
    });
  }
}
