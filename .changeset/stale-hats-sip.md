---
"space-log": major
---

Removed default export - Use named exports instead:

```diff
- import spaceLog from 'space-log'
+ import { spaceLog } from 'space-log'
```
