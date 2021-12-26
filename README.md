# CblTaskAngular

Task Description:
1) Make one page with the help of Formcontrol include validations for products and assume any 4 to 5 entities  
2) make multiple variations of one product in the same Formcontrol with the help of formArray.
3) Variation names should be Product color, size, weight, quantity.

Follow this link to see the live project: [Live APP](https://mridul-angular.herokuapp.com/)

Follow this link to see code coverage:
[Code Coverage](https://code-coverage-cbl-task.herokuapp.com/)

Why it's built?

- This project is mainly built to demonstrate the FormArray class from forms API in angular.
This project fetches few products from database and uses them to demonstrate the FormArray features.

What does it have?
- A one page interface switching between seller and buyer (although this should be implemented through user management but that is out of scope of this task).
- Buyer can select single or multiple products to add and configure them based on color, size, weight, quantity
- Sellers can delete products from the view(in real world, should delete from database as well. But again out of scope of this task)
- Place order of selected products, which will return a order id with the details of ordered items.

**Note: If for any reason, backend service fails please turn on local mode by setting following variable to false in `app.module.ts` file.**
> `let loadFromLocal = false;`


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
