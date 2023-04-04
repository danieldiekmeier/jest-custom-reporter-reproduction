# Reproduction: Jest Reporters run in different order after Jest 28

```sh
npm install
npm test
```

There is a custom reporter in `reporter.js`, which wants to use the coverage information. But the coverage information is only collected after the custom reporter is already finished.

Using a `setInterval`, we can poll until the CoverageReporter is done.
