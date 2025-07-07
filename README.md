# Reproduction: Jest Reporters run in different order after Jest 28

The Jest issue this belongs to: https://github.com/facebook/jest/issues/14052

```sh
npm install
npm test
```

There is a custom reporter in `reporter.js`, which wants to use the coverage information. But the coverage information is only collected _after_ the custom reporter is already finished.

Using a `setInterval`, we're polling until the CoverageReporter is done. This is the output:

```
> Starting in Jest 28, custom reporters run BEFORE the built-in CoverageReporter.
> At the moment, results.coverageMap is: undefined
> Waiting for CoverageReporter ...
  [actual output]
> Got results from CoverageReporter after polling!
> { total: 10, covered: 0, skipped: 0, pct: 0 }
```

However, this wasn't the case in Jest 27. If you downgrade, the output looks different because `results.coverageMap` is set from the very beginning, since it ran first:

```sh
npm install jest@27
npm test
```

```
> results.coverageMap is already set: CoverageMap {
  [some data]
}
```
