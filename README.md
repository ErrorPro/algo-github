## Documentation

1. `npm install`
2. `npm run dev`
3. Open the URL that's printed in the console

## Architecture

Domain-based flat architecture. Every domain follows the same structure. Due to the simplicity of the project, there is only one domain, but as the project grows, more domains will be added inside the `src` folder.

## TODOs

1. **State management** - For the sake of the test and time constraints, I chose to store the state inside hooks as close to the components as possible. Ideally, I would use Redux (possibly with sagas for side-effects).
2. **Styles** - Used Tailwind CSS. Did not spend too much time on UI/UX design.
3. **Tests** - Jest is implemented. Currently, only one test exists for `src/repository/components/RepositoryPageDetails/`.
4. **Component size** - In a few places, components are too large and should be split into smaller components so the parent component fits on one screen.
5. **Caching** - Currently implemented using localStorage. A few considerations:
   - Only caches the last used API requests. More advanced caching strategies need to be implemented.
   - localStorage has its own limitations. Ideally, caching should be implemented using a different tool or approach (Service Worker or IndexedDB).
6. **Filtering and pagination** - The app currently only allows filtering by organization (username) and does not have pagination.
7. **useCallback usage** - In a few places, functions are used with or without `useCallback`. This is intentional, as the new React compiler should handle this automatically, but the underlying principle is still in place.
8. **Service Workers** - a basic SW is implemented but it needs more time to cover all the cases.
