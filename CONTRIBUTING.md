# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue,
email, or any other method with the owners of this repository before making a change. 

Please note we have a [code of conduct](CODE_OF_CONDUCT.md), please follow it in all your interactions with the project.

By contributing, you agree to release your modifications under the MIT license (see the file [LICENSE](LICENSE)).

## Pull Request Process

1. Ensure any install or build dependencies are removed before the end of the layer when doing a 
   build.
2. Update the README.md with details of changes to the interface, this includes new environment 
   variables, exposed ports, useful file locations and container parameters.
3. Increase the version numbers in any examples files and the README.md to the new version that this
   Pull Request would represent. The versioning scheme we use is [SemVer](http://semver.org/).
4. You may merge the Pull Request in once you have the sign-off of the project maintainer, or if you 
   do not have permission to do that, you may request the project maintainer to merge it for you.

## Building

To install all development dependencies needed for working on the project:

```sh
npm install
```

To run tests:

```sh
npm run test
```

Also, be sure to run `npx husky install` so that files are auto-formatted when committing changes.
