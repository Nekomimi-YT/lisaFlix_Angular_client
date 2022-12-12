// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { fetchApiDataService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent {
  movies: any[] = [];
  favorites: any[] = [];
  constructor(
    public fetchApiData: fetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        console.log(this.movies);
        return this.movies;
      });
    }

  // This is the function that will open the dialog when the genre button is clicked  
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '400px',
    });
  }

  // This is the function that will open the dialog when the director button is clicked  
  openDirectorDialog(name: string, bio: string, birth: string): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
      },
    width: '400px'
    });
  }

  // This is the function that will open the dialog when synopsis is clicked  
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        Title: title,
        Description: description
      },
    width: '400px'
    });
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
        this.favorites = resp.favoriteMovies;
        console.log(this.favorites);
        return this.favorites;
      });
    }

  isFavoriteMovie(movieId: string): boolean {
    return this.favorites.includes(movieId);
  }

  addFavoriteMovie(movieId: string): void {
    this.fetchApiData.addFavorite(movieId).subscribe((result) => {
      //this.dialogRef.close(); // This will close the modal on success!
      console.log(result)
      this.snackBar.open('You have added this movie to your favorites!', 'OK', {
          duration: 3000
      });
    this.ngOnInit();
    });
  }

  deleteFavoriteMovie(movieId: string): void {
    this.fetchApiData.deleteFavorite(movieId).subscribe((result) => {
      //this.dialogRef.close(); // This will close the modal on success!
      console.log(result)
      this.snackBar.open('You have deleted this movie from your favorites!', 'OK', {
          duration: 3000
      });
    this.ngOnInit();
    });
  }
}