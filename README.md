# AngularForms
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.8.

## Goal
This project should provide a simple but powerful real world solution of reactive forms in Angular, where are used reusable and configurable components. It should also be test-driven.  :raised_hands:



## Status

[![Build Status](https://travis-ci.org/willi84/angular-forms.svg?branch=master)](https://ng-girls.gitbook.io/todo-list-tutorial/)
[![BrowserStack Status](https://www.browserstack.com/automate/badge.svg?badge_key=https://www.browserstack.com/automate/public-build/TG5PN1BVYUhCU2R0Q0FRKzMyN3Z2bkhSUEtkRmYzQWFRK08rWXNnWDJ6OD0tLTBpbWxsL0hYUU8yVzI2T2hrWXBlSkE9PQ==--6e79f2d6d21fa6b97a2eb420107548a224d6c0e8)](https://www.browserstack.com/automate/public-build/TG5PN1BVYUhCU2R0Q0FRKzMyN3Z2bkhSUEtkRmYzQWFRK08rWXNnWDJ6OD0tLTBpbWxsL0hYUU8yVzI2T2hrWXBlSkE9PQ==--6e79f2d6d21fa6b97a2eb420107548a224d6c0e8)

## Demo
[https://willi84.github.io/angular-forms/](https://willi84.github.io/angular-forms/)

## Credits
To my company STRATO and to Travis and Browserstack for supporting OpenSource projects.

## Folder structure

* _shared: every building block for a component like input/textarea/select and status message
* framework: reusable components
* features: helping services and validators
```
├── app
│   ├── _shared/
│   │   ├── <basic for component>
│   ├── framework/
│   │   ├── <reusable component>
│   ├── features/
│   │   ├── services
│   │   └── validators
│   ├── app.module.ts
│   └── contact.component (root component)
├── environments
├── utils
└── index.html
```

## App Structure

![App Structure](./docs/folder_structure.svg)

## Content
  * [basic idea](./docs/basic_idea.md)
  * [create a new component](./docs/new_component.md)
  * [create new unit tests](./docs/unit_test.md)
  * [npm task overview](./doc/npm_tasks.md)
  * [Coding Styleguide](./docs/CODE_STYLEGUIDE.md)
  * [License](./LICENSE)

## setup
  * node 8.9.1
  * typescript

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


# COPYRIGHT AND LICENSE

This software is copyright (c) 2018 by Robert Willemelis.

This is free software using the MIT license.

## ACKNOWLEDGEMENT

This software has been developed with support from STRATO.
In German: Diese Software wurde mit Unterstützung von STRATO entwickelt.

## Credits
* https://medium.com/from-the-couch/angular-2-with-travis-ci-922040e01937
* Folder Structure
  * basics: @webdave_de with his [talk](https://docs.google.com/presentation/d/1w3Icstdkou9Ri9jX5-onUEB2jgdFV_3hl43dHgKbhMo/present?slide=id.p)
  * namespaces: @maxim_koretskyi

