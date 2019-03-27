# NG Bootstrap Extras - Angular powered Bootstrap widgets

[Angular](https://angular.io/) widgets built using [NG Bootstrap](https://ng-bootstrap.github.io) and [Bootstrap 4](https://getbootstrap.com/) CSS with APIs designed for the Angular ecosystem.

Please check the list of [issues](https://github.com/rumeth/ng-bootstrap-extras/issues) to see all the things we are working on. Feel free to make comments there.
 

## Table of Contents

- [Demo](#demo)
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Supported browsers](#supported-browsers)
- [Getting help](#getting-help)
- [You think you've found a bug?](#you-think-youve-found-a-bug)

## Demo

Please check all components we have in action at https://rumeth.github.io/ng-bootstrap-extras

## Dependencies

The only dependencies are [Angular](https://angular.io), [Bootstrap 4](https://getbootstrap.com) CSS and [NG Bootstrap](https://ng-bootstrap.github.io). 
Here is the list of minimal required versions:

| ng-bootstrap-extras | ng-bootstrap | Angular | Bootstrap CSS |
| ------------------- | ------------ | ------- | ------------- |
| 0.1.0               | 4.0.0        | 7.0.0   | 4.0.0         |


## Installation

You need to have an Angular project with the supported Angular version. We strongly recommend using [Angular CLI](https://cli.angular.io) for this.

You also need to add Bootstrap 4 CSS to your application by using your preferred way (it really depends on the setup you're using). Ex. for Angular CLI you can [get Bootstrap from npm](https://www.npmjs.com/package/bootstrap) and update your `angular.json` with something like:

```json
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css"
]
```

Please note that you need only CSS and **should not** add other JavaScript dependencies like `bootstrap.js`, `jQuery` or `popper.js` as ng-bootstrap's goal is to completely replace them.

You also need to add Ng Bootsrap to your application by using your preferred way (it really depends on the setup you're using). Ex. for Angular CLI you can [get NG Bootstrap from npm](https://www.npmjs.com/package/@ng-bootstrap/ng-bootstrap).

After installing the above dependencies, install `ng-bootstrap-extras` via:
```shell
npm install --save ng-bootstrap-extras
```
Once installed you need to import our main module:
```js
import {NgbxModule} from 'ng-bootstrap-extras';

@NgModule({
  ...
  imports: [NgbxModule, ...],
  ...
})
export class YourAppModule {
}
```

Alternatively you could only import modules with components you need, ex. confirmation. 
The resulting bundle will be smaller in this case.

```js
import {NgbxConfirmationModule} from 'ng-bootstrap-extras';

@NgModule({
  ...
  imports: [NgbxConfirmationModule, ...],
  ...
})
export class YourAppModule {
}
```


## Supported browsers

We support the same browsers and versions supported by both Bootstrap 4 and Angular, whichever is _more_ restrictive. See [Angular browser support](https://angular.io/guide/browser-support) and [Bootstrap browser support](https://getbootstrap.com/docs/4.0/getting-started/browsers-devices/#supported-browsers) for more details, but on the high-level it should be something like:  

* Chrome (45+)
* Firefox (40+)
* IE (10+) 
* Edge (20+)
* Safari (7+)


## Getting help

Please, do not open issues for the general support questions as we want to keep GitHub issues for bug reports and feature requests. You've got much better chances of getting your question answered on [StackOverflow](http://stackoverflow.com/questions/tagged/ng-bootstrap-extras).

StackOverflow is a much better place to ask questions since:
* there are hundreds of people willing to help on StackOverflow
* questions and answers stay available for public viewing so your question / answer might help someone else
* SO voting system assures that the best answers are prominently visible.

To save your and our time we will be systematically closing all the issues that are requests for general support and redirecting people to StackOverflow.


## You think you've found a bug?

We want to fix it ASAP! But before fixing a bug we need to reproduce and confirm it.

We ask you to respect two things:
* fill the GitHub issue template by providing the bug description and appropriate versions of Angular, ng-bootstrap and TypeScript
* provide a use-case that fails with a **minimal reproduction scenario** using [StackBlitz](https://stackblitz.com)

A minimal reproduction scenario allows us to quickly confirm a bug (or point out a coding problem) as well as confirm that we are fixing the right problem.

Please note that **we will be insisting on a minimal reproduce scenario** in order to save maintainers time and ultimately be able to fix more bugs. We'll mark the issue as non-actionable without it and close if not heard from the reporter. 

Interestingly, from our experience users often find coding problems themselves while preparing a minimal StackBlitz. We understand that sometimes it might be hard to extract essentials bits of code from a larger code-base but we really need to isolate the problem before we can fix it.