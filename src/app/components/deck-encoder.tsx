import { DeckSlot } from '../page';
import { ShrineSlot } from '../cardlists/shrines';
import { shrines } from '../cardlists/shrines';
import { shrineImprovements } from '../cardlists/shrine-improvements';
import { baseCards } from '../cardlists/base-cards';
import { essences } from '../cardlists/essences';
import { useState, useEffect } from 'react';
import {
  CardHeader,
  Container,
  Divider,
  FormControl,
  Grid,
  Icon,
  IconButton,
  Modal,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { Button } from '@mui/material';
import { checkOrX } from './check-or-x';
import {
  Code,
  Delete,
  ImportExport,
  LibraryBooks,
  OpenInBrowser,
  SaveAs,
} from '@mui/icons-material';
import clipboardCopy from 'clipboard-copy';
import { Card, ImprovedShrine } from './card';
import { Placeholder } from './drag-context';
import { Element } from '../cardlists/enums';
import { SomeElements } from './element-buttons';
const BASE = 92;
const OFFSET = 35;
const EMPTY = '""';
const TERMINATOR = '!!';

function encodeNumber(x: number): string {
  let lower = (x % BASE) + OFFSET,
    upper = x / BASE + OFFSET;
  return String.fromCharCode(upper, lower);
}

function decodeString(s: string): number {
  if (s === EMPTY) {
    return NaN;
  } else {
    return (s.charCodeAt(0) - OFFSET) * BASE + s.charCodeAt(1) - OFFSET;
  }
}

function encodeShrine(shrineSlot: ShrineSlot): string {
  let code = '';
  code += shrineSlot.shrine ? encodeNumber(shrineSlot.shrine.id) : EMPTY;
  code += shrineSlot.shrineImprovement
    ? encodeNumber(shrineSlot.shrineImprovement.id)
    : EMPTY;
  return code;
}

function encodeDeck(deck: DeckSlot[]): string {
  let code = '';
  for (let i = 0; i < deck.length; i++) {
    let ds = deck[i];
    code += encodeNumber(ds.baseCard.id);
    code += ds.essence ? encodeNumber(ds.essence.id) : EMPTY;
  }
  return (code += TERMINATOR);
}

function decodeShrine(code: string): ShrineSlot {
  if (code.length >= 4) {
    return new ShrineSlot(
      shrines[decodeString(code.substring(0, 2))],
      shrineImprovements[decodeString(code.substring(2, 4))]
    );
  } else {
    return new ShrineSlot(null, null);
  }
}

function decodeDeck(code: string): DeckSlot[] {
  if (code) {
    let tokens =
      code.substring(0, code.indexOf(TERMINATOR)).match(/.{1,2}/g) || [];
    let deck = [] as DeckSlot[];
    let i = 0;
    while (i < tokens.length) {
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

class Deck {
  name: string;
  shrine: ShrineSlot;
  deck: DeckSlot[];
}

function decodeFullDeckCode(name: string, code: string): Deck {
  let ss = decodeShrine(code);
  let deck = decodeDeck(code.substring(4));
  return { name: name, shrine: ss, deck: deck };
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

const TOP_LEVEL_DECKS = 'decks';
const DEFAULT_DECK_LIBRARY = 'library1';

export function SaveDeck({
  shrine,
  deck,
  setShrine,
  setDeck,
}: {
  shrine: ShrineSlot;
  deck: DeckSlot[];
  setShrine: (ss: ShrineSlot) => void;
  setDeck: (deck: DeckSlot[]) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [nameQuery, setNameQuery] = useState('');
  const [warnModal, setWarnModal] = useState({
    open: false,
    action: '',
    deck: '',
  });

  let unlocked = true;
  let fallbackValue = {} as any;
  const [decks, setDecks] = useState(fallbackValue);
  useEffect(() => {
    unlocked = false;
    const stored = localStorage.getItem(TOP_LEVEL_DECKS);
    setDecks(
      stored ? (JSON.parse(stored) as any)[DEFAULT_DECK_LIBRARY] : fallbackValue
    );
    return () => {
      unlocked = true;
    };
  }, []);

  useEffect(() => {
    if (unlocked) {
      localStorage.setItem(
        TOP_LEVEL_DECKS,
        JSON.stringify({ [DEFAULT_DECK_LIBRARY]: decks })
      );
    }
  }, [decks]);

  function toggle() {
    setIsOpen(!isOpen);
    setNameQuery('');
  }

  function handleSubmitSave(name: string) {
    if (decks[name]) {
      setWarnModal({ open: true, action: 'overwrite', deck: name });
    } else {
      onConfirmSave(name);
    }
  }

  function onConfirmSave(name: string) {
    setDecks({
      ...decks,
      [name]: encodeShrine(shrine) + encodeDeck(deck),
    });
    toggle();
  }

  function handleSubmitDelete(name: string) {
    setWarnModal({ open: true, action: 'delete', deck: name });
  }

  function onConfirmDelete(name: string) {
    const { [name]: _, ...newDecks } = decks;
    setDecks(newDecks);
  }

  let deckObjects = [] as Deck[];
  for (const [key, value] of Object.entries(decks)) {
    if (key.indexOf(nameQuery) >= 0) {
      const cards = decodeFullDeckCode(key, value as string);
      deckObjects.push(cards);
    }
  }

  function handleSubmitLoad(name: string) {
    setWarnModal({ open: true, action: 'load', deck: name });
  }

  function onConfirmLoad(name: string) {
    const deckToLoad = deckObjects.find((d) => d.name === name);
    setShrine(deckToLoad!.shrine);
    setDeck(deckToLoad!.deck);
    toggle();
  }

  function onConfirmAction() {
    switch (warnModal.action) {
      case 'overwrite':
        onConfirmSave(warnModal.deck);
        break;
      case 'delete':
        onConfirmDelete(warnModal.deck);
        break;
      case 'load':
        onConfirmLoad(warnModal.deck);
        break;
    }
    hideWarnModal();
  }

  function hideWarnModal() {
    setWarnModal({ ...warnModal, open: false });
  }

  return (
    <div>
      <IconButton onClick={toggle}>
        <LibraryBooks></LibraryBooks>
      </IconButton>
      <Modal open={isOpen} className="modal-parent" onClick={toggle}>
        <div
          style={{
            width: '70vw',
            height: '65vh',
            padding: '1.5rem',
            // display: 'flex',
            // flexDirection: 'row',
          }}
          className="modal thin-bg"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && nameQuery !== '') {
              handleSubmitSave(
                deckObjects.length === 1 ? deckObjects[0].name : nameQuery
              );
            } else if (e.key === 'Escape') {
              toggle();
            }
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ margin: '1rem' }}>
            <Typography variant="h4">Local Library</Typography>
          </div>
          <div
            style={{
              margin: '1rem',
              display: 'flex',
              flexDirection: 'row',
              alignContent: 'center',
              justifyContent: 'start',
            }}
          >
            <TextField
              label="Deck Name"
              value={nameQuery}
              onChange={(e) => setNameQuery(e.target.value)}
              style={{ marginRight: '2rem' }}
            ></TextField>
            {nameQuery !== '' &&
              !(
                deckObjects.length === 1 && deckObjects[0].name === nameQuery
              ) && (
                <Button
                  style={{ marginInline: '1rem' }}
                  onClick={() => handleSubmitSave(nameQuery)}
                  disableFocusRipple
                >
                  Save New
                </Button>
              )}
            {deckObjects.length === 1 && (
              <Button
                style={{ marginInline: '1rem' }}
                disableFocusRipple
                onClick={() => handleSubmitSave(deckObjects[0].name)}
              >
                Save
              </Button>
            )}
            {/* <Button
              disableFocusRipple
              onClick={() => handleSubmitLoad(nameQuery)}
            >
              Load
            </Button> */}
          </div>
          <DeckSummaries
            decks={deckObjects}
            onSave={(d) => {
              handleSubmitSave(d.name);
            }}
            onDelete={(d) => {
              handleSubmitDelete(d.name);
            }}
            onLoad={(d) => {
              handleSubmitLoad(d.name);
            }}
          ></DeckSummaries>
        </div>
      </Modal>
      <Modal
        open={warnModal.open}
        className="modal-parent"
        onClick={hideWarnModal}
      >
        <div
          className="modal thin-bg"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            e.stopPropagation();
            if (e.key === 'Enter') {
              onConfirmAction();
            } else if (e.key === 'Escape') {
              hideWarnModal();
            }
          }}
        >
          Are you sure you&apos;d like to {warnModal.action} {warnModal.deck}?{' '}
          {warnModal.action === 'load' && 'This will clear your current deck.'}
          <button onClick={onConfirmAction}>Confirm</button>
          <button onClick={hideWarnModal}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
}

function DeckSummaries({
  decks,
  onSave,
  onDelete,
  onLoad,
}: {
  decks: Deck[];
  onSave: (d: Deck) => void;
  onDelete: (d: Deck) => void;
  onLoad: (d: Deck) => void;
}) {
  let cards = decks.map((deck) => {
    const colors = new Set<Element>();
    deck.deck.forEach((ds) => {
      if (ds.essence === null) {
        ds.baseCard.pips.forEach((p) => colors.add(p));
      } else if (ds.essence.id !== 69) {
        // souless
        ds.baseCard.pips.forEach((p) => colors.add(p));
        ds.essence.cost.forEach((p) => colors.add(p));
      }
    });

    const shrineSlot = deck.shrine;
    let thumbnail;
    if (shrineSlot.shrine) {
      thumbnail = shrineSlot.shrineImprovement ? (
        <ImprovedShrine shrineSlot={shrineSlot}></ImprovedShrine>
      ) : (
        <Card card={shrineSlot.shrine}></Card>
      );
    } else {
      thumbnail = shrineSlot.shrineImprovement ? (
        <Card card={shrineSlot.shrineImprovement}></Card>
      ) : (
        <Card card={new Placeholder()}></Card>
      );
    }

    return (
      <Grid item key={deck.name} className="deck-summary">
        <Typography variant="subtitle1" className="title">
          {deck.name}
        </Typography>
        <SomeElements elements={colors}></SomeElements>
        <div className="thumbnail">{thumbnail}</div>
        <div>
          <Tooltip
            title={`Overwrite ${deck.name} with current list`}
            enterDelay={200}
          >
            <IconButton onClick={() => onSave(deck)}>
              <SaveAs></SaveAs>
            </IconButton>
          </Tooltip>
          <Tooltip title={`Load ${deck.name} to deckbuilder`} enterDelay={200}>
            <IconButton onClick={() => onLoad(deck)}>
              <OpenInBrowser></OpenInBrowser>
            </IconButton>
          </Tooltip>
          <IconButton onClick={() => onDelete(deck)}>
            <Delete></Delete>
          </IconButton>
        </div>
      </Grid>
    );
  });
  return (
    <Grid container className="deck-summaries">
      {cards}
    </Grid>
  );
}

export function ExportDeck({
  shrine,
  deck,
  setShrine,
  setDeck,
}: {
  shrine: ShrineSlot;
  deck: DeckSlot[];
  setShrine: (ss: ShrineSlot) => void;
  setDeck: (deck: DeckSlot[]) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [pasteInput, setPasteInput] = useState('');
  const [importDeck, setImportDeck] = useState(null as Deck | null);

  const BLANK = '____________';
  const code = encodeFullDeckCode(shrine, deck);
  const lines = [] as string[];
  lines.push(
    (shrine.shrine?.name ?? BLANK) +
      ' / ' +
      (shrine.shrineImprovement?.name ?? BLANK)
  );
  deck.forEach((ds) => {
    lines.push(ds.baseCard.name + ' / ' + (ds.essence?.name ?? BLANK));
  });
  const decklist = lines.join('\n');
  const full = code + '\n' + decklist;

  function handlePasteFieldChange(val: string) {
    setPasteInput(val);
    try {
      let d = decodeFullDeckCode('', val);
      // setImportDeck(d);
      if (
        d.deck.every((ds) => {
          return ds.baseCard;
        })
      ) {
        setImportDeck(d);
      } else {
        setImportDeck(null);
      }
    } catch (e) {
      console.log(e);
      setImportDeck(null);
    }
  }

  function onImport() {
    setShrine(importDeck!.shrine);
    setDeck(importDeck!.deck);
    setIsOpen(false);
    setPasteInput('');
    setImportDeck(null);
  }

  const importDisabled = importDeck === null || pasteInput.length < 6;

  return (
    <div>
      <IconButton onClick={() => setIsOpen(true)}>
        <ImportExport></ImportExport>
      </IconButton>
      <Modal
        open={isOpen}
        className="modal-parent"
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            setIsOpen(false);
          }
        }}
        onClick={() => setIsOpen(false)}
      >
        <div
          style={{
            width: '70vw',
            height: '50vh',
            display: 'flex',
            flexDirection: 'row',
          }}
          className="modal thin-bg"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              width: '50%',
              padding: '2%',
              paddingBottom: '0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div style={{ width: '100%' }}>
              <TextField
                label="Paste deck code here to import"
                value={pasteInput}
                onChange={(e) => handlePasteFieldChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.stopPropagation();
                    e.preventDefault();
                    if (importDeck) {
                      onImport();
                    }
                  }
                }}
                className="multiline-input"
                fullWidth
                multiline
                rows="17"
                style={{ height: '100%' }}
              ></TextField>
            </div>
            <div
              style={{
                height: '15%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'end',
              }}
            >
              {pasteInput !== '' && importDisabled && (
                <span className="warn" style={{ padding: '2%' }}>
                  Invalid code
                </span>
              )}
              {!importDisabled && (
                <span className="warn" style={{ padding: '2%' }}>
                  This will overwrite your current deck.
                </span>
              )}
              <Button
                onClick={onImport}
                disabled={importDisabled}
                style={{ marginRight: '1%' }}
              >
                Import
              </Button>
            </div>
          </div>
          <Divider orientation="vertical" variant="middle"></Divider>
          <div
            style={{
              width: '50%',
              paddingTop: '2.75%',
              padding: '2%',
              paddingBottom: '0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Paper
              variant="outlined"
              onClick={() => clipboardCopy(full)}
              style={{
                whiteSpace: 'pre-line',
                background: 'inherit',
                height: '85.5%',
                overflow: 'auto',
                padding: '1rem',
                // background: '#97a1af',
                // border: 'black',
                // borderWidth: '1px',
                // borderStyle: 'solid',
                // borderRadius: '.25rem',
              }}
            >
              <p>{full}</p>
            </Paper>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                height: '15.5%',
              }}
            >
              <Button onClick={() => clipboardCopy(full)}>Copy Full</Button>
              <Button onClick={() => clipboardCopy(code)}>Code Only</Button>
              <Button onClick={() => clipboardCopy(decklist)}>List Only</Button>
            </div>
            {/* click to copy code only and list only button */}
          </div>
        </div>
      </Modal>
    </div>
  );
}
