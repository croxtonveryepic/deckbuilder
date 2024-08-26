import { DeckSlot } from '../page';
import { ShrineSlot } from '../cardlists/shrines';
import { shrines } from '../cardlists/shrines';
import { shrineImprovements } from '../cardlists/shrine-improvements';
import { baseCards } from '../cardlists/base-cards';
import { essences } from '../cardlists/essences';
import { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  Container,
  FormControl,
  Grid,
  IconButton,
  Modal,
  Paper,
  TextField,
} from '@mui/material';
import { Button } from '@mui/material';
import { checkOrX } from './check-or-x';
import { SaveAs } from '@mui/icons-material';
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

function encodeFullDeckCode(ss: ShrineSlot, deck: DeckSlot[]): string {
  return encodeShrine(ss) + encodeDeck(deck);
}

export function SaveDeck({
  shrine,
  deck,
}: {
  shrine: ShrineSlot;
  deck: DeckSlot[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [nameQuery, setNameQuery] = useState('');
  const [warnModal, setWarnModal] = useState({
    open: false,
    name: '',
    decks: {} as any,
  });

  let decks = new Map<string, string>();
  useEffect(() => {
    const stored = localStorage.getItem('decks');
    if (stored) {
      decks = new Map<string, string>(JSON.parse(stored));
    }
  }, []);

  function toggle() {
    setIsOpen(!isOpen);
  }

  function handleSubmit(name: string) {
    if (decks.has(name)) {
      setWarnModal({ open: true, name: name, decks: decks });
    } else {
      onConfirm(name);
      toggle();
    }
  }

  function onConfirm(name: string) {
    decks.set(name, encodeShrine(shrine) + ' ' + encodeDeck(deck));
    localStorage.setItem('decks', JSON.stringify(decks));
  }

  return (
    <div>
      <IconButton onClick={toggle}>
        <SaveAs></SaveAs>
      </IconButton>
      <Modal open={isOpen} className="modal-parent">
        <div
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              toggle();
            }
          }}
        >
          <div className="modal thin-bg">
            <FormControl onSubmit={(e) => handleSubmit(nameQuery)}>
              <TextField
                label="Deck Name"
                value={nameQuery}
                onChange={(e) => setNameQuery(e.target.value)}
                // color="secondary"
              ></TextField>
              {/* <TextField label="Deck Name" name="deckname"></TextField> */}
              <button type="submit">Submit</button>
              <DeckSummaries
                decks={decks}
                onClick={(d) => handleSubmit(d.name)}
              ></DeckSummaries>
            </FormControl>
          </div>
        </div>
      </Modal>
    </div>
  );
}

class Deck {
  name: string;
  shrine: ShrineSlot;
  deck: DeckSlot[];
}

function decodeFullDeckCode(name: string, code: string): Deck {
  let ss = decodeShrine(code);
  let deck = decodeDeck(code.substring(7));
  return { name: name, shrine: ss, deck: deck };
}

function DeckSummaries({
  decks,
  onClick,
}: {
  decks: Map<string, string>;
  onClick: (d: Deck) => void;
}) {
  let deckObjects = [] as Deck[];
  for (const [key, value] of decks) {
    let cards = decodeFullDeckCode(key, value);
    deckObjects.push(cards);
  }
  let cards = deckObjects.map((deck) => {
    let src, media;
    if (deck.shrine.shrine?.filename) {
      src = `/assets/shrines/${deck.shrine.shrine?.filename}.png`;
    } else if (deck.deck[0]) {
      src = `/assets/base-card/${deck.deck[0].baseCard.filename}.png`;
    }
    if (src) {
      media = <img src={src}></img>;
    }
    return (
      <Grid
        item
        key={deck.name}
        className="deck-summary"
        onClick={() => onClick(deck)}
      >
        <div>{media}</div>
        <div>{deck.name}</div>
      </Grid>
    );
  });
  return <Grid container>{cards}</Grid>;
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
    for (const [key, value] of Object.entries(deckCodes)) {
      let cards = decodeFullDeckCode(key, value as string);
      deckObjects.push(cards);
    }
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
