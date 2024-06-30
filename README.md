This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Using The Deckbuilder

There are three main sections to the app:

- In the top right is your deck. You can click on cards to remove their overlay card (if applicable) or remove them.
- To the left is base card library. This holds Shrines and all the regular cards (Unit, Event, etc.). You can click on base cards to add them to you deck, or you can drag them in.
- Along the bottom right is the overlay library. This hold Shrine Improvements and Essences. You can click a Shrine Improvement to select it, and you can drag overlay cards onto base cards in your deck to apply them.

Initially you will be in Shrine mode, meaning the libraries will contain Shrine and Shrine Improvements. Click the Toggle Shrine Mode button above the Deck section to see regular base cards and Essences instead.

You can right click any card to see it closer. In this state, you can click the arrow buttons (or use the left and right arrow keys) to browse through other cards in that section. If you are browsing the base card library, pressing Enter adds the card to your deck. Click away or press Esc to exit.
