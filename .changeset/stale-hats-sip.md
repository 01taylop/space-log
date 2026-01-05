---
"space-log": major
---

Removed default export in favour of named exports only

```diff
- import spaceLog from 'space-log'
+ import { spaceLog } from 'space-log'
```
