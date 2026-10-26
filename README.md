# KickOff Sports

A practice e-commerce store built for learning test automation with **Playwright** and **TypeScript**.
All brands and products are fictional.

## Stack
- React + Vite + Tailwind (front end)
- Express + Node's built-in SQLite (back end)
- Playwright Test (end-to-end tests)

## Run the store
```bash
npm install
npm run dev
```
Open http://localhost:5173

## Run the tests
```bash
npx playwright install chromium   # first time only
npm test                          # run all tests
npm run test:ui                   # Playwright UI mode
npm run test:report               # open the last HTML report
```

## Reset test data
```bash
npm run db:reset
```

## Roadmap
- [x] Iteration 1: browse, search, filter, sort, product pages, first test
- [ ] Iteration 2: cart
- [ ] Iteration 3: accounts (sign up, sign in, update profile)
- [ ] Iteration 4: favorites and writing reviews
- [ ] Iteration 5: checkout and mock payment page
- [ ] Iteration 6: confirmation, shipping and review emails
- [ ] Iteration 7: CI with GitHub Actions
