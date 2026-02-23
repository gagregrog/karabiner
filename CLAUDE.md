# Karabiner Config

This project uses **yarn** (not npm) for package management.

```
yarn build
```

# Code Style

Order functions by abstraction level: higher-level functions (callers) come first, lower-level primitives come last. The public API / entry point should be at the top of the file, with the implementation details descending below it.
