import { ShrineSlot, DeckSlot } from '../page';
import { shrines } from '../cardlists/shrines';
import { shrineImprovements } from '../cardlists/shrine-improvements';
import { baseCards } from '../cardlists/base-cards';
import { essences } from '../cardlists/essences';
import { useState, useEffect } from 'react';
import { Modal, Paper, TextField } from '@mui/material';
import { ClickAwayListener } from '@mui/material';
import { checkOrX } from './check-or-x';
import { Check } from '@mui/icons-material';
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
  function handleSubmit() {
    console.log('blep');
  }

  const essences = deck.reduce((sum, ds) => {
    return ds.essence ? sum + 1 : sum;
  }, 0);

  return (
    <Modal open={open}>
      {/* <ClickAwayListener onClickAway={toggle}> */}
      <div
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            toggle();
          }
        }}
      >
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
            <TextField></TextField>
            <button type="submit">Submit</button>
          </form>
        </Paper>
      </div>
      {/* </ClickAwayListener> */}
    </Modal>
  );
}
