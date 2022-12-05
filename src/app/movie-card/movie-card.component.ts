// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { fetchApiDataService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { AddToFavoritesComponent } from '../add-to-favorites/add-to-favorites.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent {
  movies: any[] = [];
  constructor(
    public fetchApiData: fetchApiDataService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        console.log(this.movies);
        return this.movies;
      });
    }

  // This is the function that will open the dialog when the genre button is clicked  
  openGenreDialog(): void {
    this.dialog.open(GenreComponent, {
    // Assigning the dialog a width
    width: '280px'
    });
  }

  // This is the function that will open the dialog when the director button is clicked  
  openDirectorDialog(): void {
    this.dialog.open(DirectorComponent, {
    // Assigning the dialog a width
    width: '280px'
    });
  }


  // This is the function that will open the dialog when the heart icon is clicked  
  openSynopsisDialog(): void {
    this.dialog.open(SynopsisComponent, {
    // Assigning the dialog a width
    width: '280px'
    });
  }

  // This is the function that will open the dialog when the heart icon is clicked  
  openAddToFavoritesDialog(): void {
    this.dialog.open(AddToFavoritesComponent, {
    // Assigning the dialog a width
    width: '280px'
    });
  }
}