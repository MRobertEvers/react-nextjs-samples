# Nextjs Client

## Redux

The client uses redux to manage much of the state.

The root redux state is in `src/root-state.types.ts`.

For each slice, the slice is in a `redux` folder.

It is organized

```
redux\
    [slice-name].types.ts
    [slice-name].actions.ts
    [slice-name].slice.ts
```

The root state imports `[slice-name].types.ts`.

The order of imports below

```
root-state.types.ts < [slice-name].types.ts
[slice-name].slice.ts < [slice-name].actions.ts < [slice-name].types.ts
[slice-name].slice.ts < [slice-name].types.ts
```
