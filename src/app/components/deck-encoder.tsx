import { ShrineSlot, DeckSlot } from '../page';
import { shrines } from '../cardlists/shrines';
import { shrineImprovements } from '../cardlists/shrine-improvements';
import { baseCards } from '../cardlists/base-cards';
import { essences } from '../cardlists/essences';
import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Modal,
  Paper,
  TextField,
} from '@mui/material';
import { ClickAwayListener, Button } from '@mui/material';
import { checkOrX } from './check-or-x';
import { Check, Toll } from '@mui/icons-material';
import { json } from 'stream/consumers';
const BASE = 92;
const OFFSET = 35;
const EMPTY = '"" ';

function encodeNumber(x: number): string {
  let lower = (x % BASE) + OFFSET,
    upper = x / BASE + OFFSET;
  return String.fromCharCode(upper, lower) + ' ';
}

function decodeString(s: string): number {
  if (s === '""') {
    return NaN;
  } else {
    return (s.charCodeAt(0) - OFFSET) * BASE + s.charCodeAt(1) - OFFSET;
  }
}

function encodeShrine(shrineSlot: ShrineSlot) {
  let code = '';
  code += shrineSlot.shrine ? encodeNumber(shrineSlot.shrine.id) : EMPTY;
  code += shrineSlot.shrineImprovement
    ? encodeNumber(shrineSlot.shrineImprovement.id)
    : EMPTY;
  return code;
}

function encodeDeck(deck: DeckSlot[]) {
  let code = '';
  for (let i = 0; i < deck.length; i++) {
    let ds = deck[i];
    code += encodeNumber(ds.baseCard.id);
    code += ds.essence ? encodeNumber(ds.essence.id) : EMPTY;
  }
  return (code += '!');
}

function decodeShrine(code: string): ShrineSlot {
  if (code) {
    let tokens = code.split(' ');
    return new ShrineSlot(
      shrines[decodeString(tokens[0])],
      shrineImprovements[decodeString(tokens[1])]
    );
  } else {
    return new ShrineSlot(null, null);
  }
}

function decodeDeck(code: string): DeckSlot[] {
  if (code) {
    let tokens = code.split(' ');
    let deck = [] as DeckSlot[];
    // let i = 2; //skip over shrine
    let i = 0;
    while (i < tokens.length && tokens[i] !== '!') {
      deck.push(
        new DeckSlot(
          baseCards[decodeString(tokens[i])],
          essences[decodeString(tokens[i + 1])] || null
        )
      );
      i += 2;
    }
    return deck;
  } else {
    return new Array<DeckSlot>();
  }
}

export function useLocalStorageShrine(key: string) {
  let fallbackValue = new ShrineSlot(null, null);
  let unlocked = true;
  const [value, setValue] = useState(fallbackValue);
  useEffect(() => {
    unlocked = false;
    const stored = localStorage.getItem(key);
    setValue(stored ? decodeShrine(stored) : fallbackValue);
    return () => {
      unlocked = true;
    };
  }, []);

  useEffect(() => {
    if (unlocked) {
      localStorage.setItem(key, encodeShrine(value));
    }
  }, [value]);

  return [value, setValue] as const;
}

export function useLocalStorageDeck() {
  let unlocked = true;
  let fallbackValue = new Array<DeckSlot>();
  const [value, setValue] = useState(fallbackValue);
  useEffect(() => {
    unlocked = false;
    const stored = localStorage.getItem('tempDeck');
    setValue(stored ? decodeDeck(stored) : fallbackValue);
    return () => {
      unlocked = true;
    };
  }, []);

  useEffect(() => {
    if (unlocked) {
      localStorage.setItem('tempDeck', encodeDeck(value));
    }
  }, [value]);

  return [value, setValue] as const;
}

export function ImportExportDeckModal({
  open,
  toggle,
}: {
  open: boolean;
  toggle: () => void;
}) {
  function saveDeck(name: string) {}

  return (
    <Modal open={open}>
      <ClickAwayListener onClickAway={toggle}>
        <div
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              toggle();
            }
          }}
        >
          <Paper>
            <button>Save Deck</button>
            <button>Load Deck</button>
            <button>Import Deck</button>
            <button>Export Deck</button>
          </Paper>
        </div>
      </ClickAwayListener>
    </Modal>
  );
}

export function SaveDeckModal({
  open,
  toggle,
  shrine,
  deck,
}: {
  open: boolean;
  toggle: () => void;
  shrine: ShrineSlot;
  deck: DeckSlot[];
}) {
  const [warnModal, setWarnModal] = useState({
    open: false,
    name: '',
    decks: {} as any,
  });

  function handleSubmit(e: any) {
    e.preventDefault();
    let name = e.target.deckname.value;
    let decks = JSON.parse(localStorage.getItem('decks') || '{}');
    if (decks[name]) {
      setWarnModal({ open: true, name: name, decks: decks });
    } else {
      onConfirm(name, decks);
      toggle();
    }
  }

  function onConfirm(name: string, decks: any) {
    decks[name] = encodeShrine(shrine) + ' ' + encodeDeck(deck);
    localStorage.setItem('decks', JSON.stringify(decks));
  }

  const essences = deck.reduce((sum, ds) => {
    return ds.essence ? sum + 1 : sum;
  }, 0);

  return (
    <Modal open={open}>
      <div
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            toggle();
          }
        }}
      >
        <Modal open={warnModal.open}>
          <Paper>
            <span>
              Deck '{warnModal.name}' already exists. Would you like to replace
              it?
            </span>
            <span>
              <Button
                onClick={() => {
                  onConfirm(warnModal.name, warnModal.decks);
                  setWarnModal({ ...warnModal, open: false });
                  toggle();
                }}
              >
                Confirm
              </Button>
              <Button
                onClick={() => setWarnModal({ ...warnModal, open: false })}
              >
                Cancel
              </Button>
            </span>
          </Paper>
        </Modal>
        <Paper>
          Deck Legality: <br></br>Shrine and Shrine Improvement present:
          {checkOrX(
            shrine.shrine !== null && shrine.shrineImprovement !== null
          )}
          <br></br>
          Exactly 50 cards:
          {checkOrX(deck.length === 50, `${deck.length} cards`)}
          <br></br>
          Essences for all cards:{' '}
          {checkOrX(essences === 50, `${deck.length - essences} missing`)}
          <br></br>
          <form onSubmit={handleSubmit}>
            <TextField label="Deck Name" name="deckname"></TextField>
            <button type="submit">Submit</button>
          </form>
        </Paper>
      </div>
    </Modal>
  );
}

class Deck {
  name: string;
  shrine: ShrineSlot;
  deck: DeckSlot[];
}

function decodeFullDeckCode(name: string, code: string): Deck {
  // console.log('deck code: ' + code);
  let ss = decodeShrine(code);
  // console.log('deck substring: ' + code.substring(7));
  let deck = decodeDeck(code.substring(7));
  // console.log(ss);
  // console.log(deck);
  return { name: name, shrine: ss, deck: deck };
}

export function LoadDeckModal({
  open,
  toggle,
  setShrineAndDeck,
}: {
  open: boolean;
  toggle: () => void;
  setShrineAndDeck: (ss: ShrineSlot, ds: DeckSlot[]) => void;
}) {
  const [decks, setDecks] = useState(new Array<Deck>());

  useEffect(() => {
    let deckCodes = JSON.parse(localStorage.getItem('decks') || '{}');
    let deckObjects = [] as Deck[];
    // console.log(deckCodes);
    for (const [key, value] of Object.entries(deckCodes)) {
      // console.log(key);
      // console.log(value);
      let cards = decodeFullDeckCode(key, value as string);
      // console.log(cards);
      deckObjects.push(cards);
    }
    // console.log(deckObjects);
    setDecks(deckObjects);
  }, []);

  let cards = decks.map((deck) => {
    let src, media;
    if (deck.shrine.shrine?.filename) {
      src = `/assets/shrines/${deck.shrine.shrine?.filename}.png`;
    } else if (deck.shrine.shrine?.filename) {
      src = `/assets/base-card/${deck.shrine.shrine?.filename}.png`;
    }
    if (src) {
      media = <img src={src}></img>;
    }

    return (
      <button
        onClick={() => {
          // console.log(JSON.stringify(deck));
          // console.log(deck);
          // console.log(deck.shrine);
          // console.log(deck.deck);
          setShrineAndDeck(deck.shrine, deck.deck);
          toggle();
        }}
        key={deck.name}
      >
        <Card>
          <CardHeader>{deck.name}</CardHeader>
          {media}
        </Card>
      </button>
    );
  });

  function handleSubmit(e: any) {
    e.preventDefault();
    let name = e.target.deckname.value;
  }

  return (
    <Modal open={open}>
      <div
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            toggle();
          }
        }}
      >
        {/* <Modal open={warnModal.open}>
          <Paper>
            <span>
              Deck '{warnModal.name}' already exists. Would you like to replace
              it?
            </span>
            <span>
              <Button
                onClick={() => {
                  onConfirm(warnModal.name, warnModal.decks);
                  setWarnModal({ ...warnModal, open: false });
                  toggle();
                }}
              >
                Confirm
              </Button>
              <Button
                onClick={() => setWarnModal({ ...warnModal, open: false })}
              >
                Cancel
              </Button>
            </span>
          </Paper>
        </Modal> */}
        <Paper>
          <span>Load deck from browser storage</span>
          <span className="warn">This will overwrite your current deck.</span>
          <br></br>
          {cards}
        </Paper>
      </div>
    </Modal>
  );
}
