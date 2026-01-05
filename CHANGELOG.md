# space-log

## 2.0.0

### Major Changes

- 648238c: Removed default export in favour of named exports only

  ```diff
  - import spaceLog from 'space-log'
  + import { spaceLog } from 'space-log'
  ```

- 648238c: Removed error-swallowing try/catch block

  Errors are now thrown instead of being silently logged to `console.error`, allowing proper error handling by callers.

  If you were relying on `spaceLog` never throwing, wrap calls in your own try/catch:

  ```diff
  + try {
      spaceLog(config, data)
  + } catch (error) {
  +   // Handle error
  + }
  ```
