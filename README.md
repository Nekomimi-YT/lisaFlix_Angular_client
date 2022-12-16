# LisFlixAngularClient

  [=> Jump to project details](#project-details)
  
  [=> Jump to project images](#images)

## Admin

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.1.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Project Details

### User Stories

As a user, I want to:
* Receive information on movies, directors, and genres to learn more about movies I’ve watched or am interested in.
* Create a profile so I can save my favorite movies.
* Update or delete my profile information.

### Key Features

* App displays a welcome view where users can either log in or register an account.
* Once authenticated, the user sees the main "all-movies" view, filter buttons and a personalized navbar.
* Navbar allows access to profile area view and logout options via a dropdown menu.
* User can filter movies by favorites.
* The individual movie cards container additional features:
    * A button that opens a dialog,​ where details about the director of that particular movie will be displayed.
    * A button that opens a dialog,​ where details about that particular genre of the movie will be displayed.
    * A button that opens a dialog,​ where details about plot synopsis of the movie will be displayed.
* App is fully responsive for use on laptop, tablet or mobile.

### Tech Specs

* Angular ^15.0.0
* Angular Material ^15.0.0
* Node.js/ npm ^16.18.0
* TypeDoc ^0.23.22
* Github Pages

### Images
![Welcome to LisFilx](/img/Welcome.png)

![Login to get started](/img/Login.png)

![Main page with navbar, filter buttons and movies](/img/Movies.jpg)
