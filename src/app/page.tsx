'use client';
import {
  Box,
  Container,
  MenuItem,
  Select,
  Switch,
  Typography,
  Stack,
  FormGroup,
  IconButton,
  TextField,
  InputAdornment,
  InputLabel,
} from '@mui/material';
import {
  ShrineList,
  ShrineImprovementList,
  BaseCardList,
  EssenceList,
} from './components/card-list';
import { baseCards, BaseCardFilters, BaseCard } from './cardlists/base-cards';
import { Element, BaseCardType, Rarity } from './cardlists/enums';
import { shrines, ShrineSlot } from './cardlists/shrines';
import { essences, Essence } from './cardlists/essences';
import { shrineImprovements } from './cardlists/shrine-improvements';
import { CardType } from './components/card';
import { useState } from 'react';
import { Deck } from './components/card-list';
import { idGenerator } from './utils';
import { PipButtons } from './components/pip-button';
import { ElementButtons } from './components/element-buttons';
import {
  HighlightOff,
  SaveAs,
  LibraryBooks,
  Search,
} from '@mui/icons-material';
import {
  LoadDeckModal,
  SaveDeckModal,
  useLocalStorageDeck,
  useLocalStorageShrine,
} from './components/deck-encoder';
import { ResourceTracker } from './components/resource-tracker';
import { HeldCard, AlertPickup } from './components/drag-context';
import { DeckContext } from './components/decklist-context';
import { ConditionalDroppable } from './components/conditional-droppable';

export class DeckSlot {
  baseCard: BaseCard;
  essence: Essence | null;
  id: number;

  constructor(baseCard: BaseCard, essence: Essence | null) {
    this.baseCard = baseCard;
    this.essence = essence;
    this.id = newId();
  }
}

const newId = idGenerator();

export default function Home() {
  const [shrineMode, setShrineMode] = useState(true);
  const [shrine, setShrine] = useLocalStorageShrine('tempShrine');
  const [deck, setDeck] = useLocalStorageDeck();
  const [sElements, setSElements] = useState([] as Element[]);
  const [bcType, setBcType] = useState(BaseCardType.Any);
  const [bcRarity, setBcRarity] = useState(Rarity.Any);
  const [bcElements, setBcElements] = useState([] as Element[]);
  const [bcElementAnd, setBcElementAnd] = useState(false);
  const [bcCostValOne, setBcCostValOne] = useState(NaN);
  const [bcCostValTwo, setBcCostValTwo] = useState(NaN);
  const [bcCostOperator, setBcCostOperator] = useState('=');
  const [bcQuery, setBcQuery] = useState('');
  const [deckDataModal, setDeckDataModal] = useState(false);
  const [saveDeckModal, setSaveDeckModal] = useState(false);
  const [loadDeckModal, setLoadDeckModal] = useState(false);
  const [heldCard, setHeldCard] = useState(null as HeldCard);

  function addBaseCard(card: BaseCard) {
    setDeck([...deck, new DeckSlot(card, null)]);
  }

  function toggleShrineMode() {
    setShrineMode(!shrineMode);
  }

  function removeLayer(id: number) {
    const c = deck.find((ds) => ds.id === id);
    if (!c) {
      console.warn('missing card');
    } else if (!c.essence) {
      setDeck(
        deck.filter((card) => {
          return id !== card.id;
        })
      );
    } else {
      setDeck(
        deck.map((ds) => {
          if (ds.id === id) {
            return { ...ds, essence: null };
          } else {
            return ds;
          }
        })
      );
    }
  }

  function filteredAndSortedShrines() {
    let filtered =
      sElements.length === 0
        ? shrines
        : shrines.filter((s) => {
            return sElements.includes(s.identity);
          });
    return filtered.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  }

  function sortDeck() {
    return Array.from(deck).sort((a, b) => {
      let ac = a.baseCard;
      let bc = b.baseCard;
      return (
        a.baseCard.supertype - b.baseCard.supertype ||
        ac.cost + ac.pips.length - (bc.cost + bc.pips.length) ||
        ac.name.localeCompare(bc.name)
      );
    });
  }

  let sortedDeck = sortDeck();

  function handleShrineElementFilterClicked(e: Element) {
    if (sElements.includes(e)) {
      setSElements(sElements.filter((el) => el !== e));
    } else {
      setSElements([...sElements, e]);
    }
  }

  function handleBaseCardElementFilterClicked(e: Element) {
    if (bcElements.includes(e)) {
      setBcElements(bcElements.filter((el) => el !== e));
    } else {
      setBcElements([...bcElements, e]);
    }
  }

  function handleCostFilterClicked(x: number) {
    if (bcCostOperator === '<=>') {
      if (!bcCostValOne) {
        setBcCostValOne(x);
      } else if (bcCostValOne === x) {
        setBcCostValOne(bcCostValTwo);
        setBcCostValTwo(NaN);
      } else if (!bcCostValTwo) {
        if (x > bcCostValOne) {
          setBcCostValTwo(x);
        } else {
          setBcCostValTwo(bcCostValOne);
          setBcCostValOne(x);
        }
      } else if (bcCostValTwo === x) {
        setBcCostValTwo(NaN);
      } else {
        // could do some other logic here to decide how to move them instead of reseting
        setBcCostValOne(x);
        setBcCostValTwo(NaN);
      }
    } else {
      if (bcCostValOne === x) {
        setBcCostValOne(NaN);
      } else {
        setBcCostValOne(x);
      }
    }
  }

  function filteredAndSortedBaseCards() {
    const filters = new BaseCardFilters({
      typeChoice: bcType,
      elementChoices: bcElements,
      elementAnd: bcElementAnd,
      costChoiceOne: bcCostValOne,
      costChoiceTwo: bcCostValTwo,
      costOperator: bcCostOperator,
      query: bcQuery,
      rarityFilter: bcRarity,
    });
    return baseCards
      .filter((c) => {
        return (
          filters.type(c.supertype) &&
          filters.identity(c.pips) &&
          filters.cost(c.cost) &&
          filters.query([c.name, c.subtype, c.text, c.artist]) &&
          filters.rarity(c.rarity)
        );
      })
      .sort((a, b) => a.cost - b.cost || a.name.localeCompare(b.name));
  }

  function getCardByFilename(filename: string, list: any[]) {
    return list.find((obj) => {
      return obj.filename === filename;
    });
  }

  function applyEssence(id: number, incomingEssence: Essence) {
    // from collection
    if (Number.isNaN(heldCard?.id)) {
      setDeck(
        deck.map((ds) => {
          if (ds.id === id) {
            return { ...ds, essence: incomingEssence };
          } else {
            return ds;
          }
        })
      );
    } else {
      // from elsewhere in the deck zone
      const targetDeckSlot = deck.find((ds) => ds.id === id);
      const sourceDeckSlot = deck.find((ds) => ds.id === heldCard?.id);
      const essenceToTransfer =
        targetDeckSlot?.essence &&
        sourceDeckSlot?.baseCard.validEssences.has(targetDeckSlot.essence.id)
          ? targetDeckSlot.essence
          : null;
      setDeck(
        deck.map((ds) => {
          if (ds.id === id) {
            return { ...ds, essence: incomingEssence };
          } else if (ds.id === heldCard?.id) {
            return { ...ds, essence: essenceToTransfer };
          } else {
            return ds;
          }
        })
      );
      setHeldCard(null); // must re-do here because the source will re-render, which will cause heldCard state to hang if it's a transfer instead of a swap
    }
  }

  function toggleDeckDataModal() {
    setDeckDataModal(!deckDataModal);
  }

  function toggleSaveDeckModal() {
    setSaveDeckModal(!saveDeckModal);
  }

  function toggleLoadDeckModal() {
    setLoadDeckModal(!loadDeckModal);
  }

  let cards = new Map<number, number>();
  deck.forEach((ds) => {
    let id = ds.baseCard.id;
    let count = cards.get(id);
    cards.set(id, count ? count + 1 : 1);
  });
  let essenceCounts = new Map<number, number>();
  deck.forEach((ds) => {
    let id = ds.essence?.id;
    if (id) {
      let count = essenceCounts.get(id);
      essenceCounts.set(id, count ? count + 1 : 1);
    }
  });

  const handleCollectionDrop = (e: React.DragEvent) => {
    e.preventDefault();
    switch (heldCard?.card.type) {
      case CardType.BaseCard:
      case CardType.Essence:
        removeLayer(heldCard.id);
        break;
      case CardType.Shrine:
        setShrine({ ...shrine, shrine: null });
        break;
      case CardType.ShrineImprovement:
        setShrine({ ...shrine, shrineImprovement: null });
        break;
    }
  };

  const collectionDropProps = new ConditionalDroppable(
    (heldCard && !Number.isNaN(heldCard.id)) as boolean,
    handleCollectionDrop
  );
  return (
    <Box>
      <AlertPickup.Provider
        value={(c) => {
          setHeldCard(c);
        }}
      >
        <DeckContext.Provider
          value={{
            shrine: shrine,
            cards: cards,
            essences: essenceCounts,
          }}
        >
          <Container className="deck-container">
            <Container className="deck-widget-container">
              <Stack direction="row" alignItems="center">
                <Typography>Shrine</Typography>
                <Switch checked={!shrineMode} onChange={toggleShrineMode} />
                <Typography>Deck</Typography>
              </Stack>
              {/* save deck */}
              <IconButton onClick={toggleSaveDeckModal}>
                <SaveAs></SaveAs>
              </IconButton>
              <SaveDeckModal
                open={saveDeckModal}
                toggle={toggleSaveDeckModal}
                deck={sortedDeck}
                shrine={shrine}
              ></SaveDeckModal>
              {/* load deck */}
              <IconButton onClick={toggleLoadDeckModal}>
                <LibraryBooks></LibraryBooks>
              </IconButton>
              <LoadDeckModal
                open={loadDeckModal}
                toggle={toggleLoadDeckModal}
                setShrineAndDeck={(ss, ds) => {
                  setShrine(ss);
                  setDeck(ds);
                }}
              ></LoadDeckModal>
              <ResourceTracker
                deck={deck}
                shrine={shrine.shrine}
              ></ResourceTracker>
            </Container>
            <Deck
              shrineSlot={shrine}
              mainDeck={sortedDeck}
              heldCard={heldCard}
              onClickDeckSlot={removeLayer}
              applyEssence={applyEssence}
              setShrine={(s) =>
                setShrine(new ShrineSlot(s, shrine.shrineImprovement))
              }
              setShrineImprovement={(si) =>
                setShrine(new ShrineSlot(shrine.shrine, si))
              }
              addBaseCard={addBaseCard}
            ></Deck>
          </Container>
          <div className="base-card-container" {...collectionDropProps}>
            <div className="base-card-widget-container">
              {/* <FormGroup>
              <FormControlLabel label={} control={<Switch></Switch>}>
                
              </FormControlLabel>
            </FormGroup> */}
              {shrineMode ? (
                <FormGroup className="element-filter">
                  <ElementButtons
                    selected={sElements}
                    onElementClicked={handleShrineElementFilterClicked}
                  ></ElementButtons>
                </FormGroup>
              ) : (
                <div>
                  <FormGroup>
                    <div className="search-filter-container">
                      <TextField
                        label="Search"
                        value={bcQuery}
                        onChange={(e) => setBcQuery(e.target.value)}
                        className="query"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Search />
                            </InputAdornment>
                          ),
                        }}
                        color="secondary"
                      ></TextField>
                      <IconButton onClick={() => setBcQuery('')}>
                        <HighlightOff></HighlightOff>
                      </IconButton>
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <div className="type-rarity-container">
                      <Select
                        label="Type"
                        value={bcType}
                        onChange={(e) => {
                          setBcType(e.target.value as BaseCardType);
                        }}
                      >
                        <MenuItem value={BaseCardType.Any}>Any</MenuItem>
                        <MenuItem value={BaseCardType.Unit}>Unit</MenuItem>
                        <MenuItem value={BaseCardType.Event}>Event</MenuItem>
                        <MenuItem value={BaseCardType.ContinuousEvent}>
                          Continuous Event
                        </MenuItem>
                        <MenuItem value={BaseCardType.Item}>Item</MenuItem>
                        <MenuItem value={BaseCardType.Structure}>
                          Structure
                        </MenuItem>
                      </Select>

                      <Select
                        label="Rarity"
                        value={bcRarity}
                        onChange={(e) => {
                          setBcRarity(e.target.value as Rarity);
                        }}
                      >
                        <InputLabel>Rarity</InputLabel>
                        <MenuItem value={Rarity.Any}>Any</MenuItem>
                        <MenuItem value={Rarity.Common}>Common</MenuItem>
                        <MenuItem value={Rarity.Uncommon}>Uncommon</MenuItem>
                        <MenuItem value={Rarity.Rare}>Rare</MenuItem>
                        <MenuItem value={Rarity.Epic}>Epic</MenuItem>
                      </Select>
                    </div>
                  </FormGroup>
                  <FormGroup className="element-filter">
                    <ElementButtons
                      selected={bcElements}
                      onElementClicked={handleBaseCardElementFilterClicked}
                    ></ElementButtons>
                    <Stack
                      direction="row"
                      alignItems="center"
                      sx={{ marginLeft: '.5em' }}
                    >
                      <Typography>Or</Typography>
                      <Switch
                        checked={bcElementAnd}
                        onChange={(e) => setBcElementAnd(e.target.checked)}
                      />
                      <Typography>And</Typography>
                    </Stack>
                  </FormGroup>
                  <FormGroup className="cost-filter">
                    <Select
                      value={bcCostOperator}
                      onChange={(e) => {
                        let val = e.target.value;
                        if (bcCostOperator === '<=>') {
                          setBcCostValTwo(NaN);
                        }
                        setBcCostOperator(val);
                      }}
                    >
                      <MenuItem value={'='}>=</MenuItem>
                      <MenuItem value={'<='}>&lt;=</MenuItem>
                      <MenuItem value={'>='}>&gt;=</MenuItem>
                      <MenuItem value={'<=>'}>&lt;=&gt;</MenuItem>
                    </Select>
                    <PipButtons
                      count={7}
                      selectedOne={bcCostValOne}
                      selectedTwo={bcCostValTwo}
                      onClick={handleCostFilterClicked}
                    ></PipButtons>
                  </FormGroup>
                </div>
              )}
            </div>
            {shrineMode ? (
              <ShrineList
                shrines={filteredAndSortedShrines()}
                onClickShrine={(s) =>
                  setShrine(new ShrineSlot(s, shrine.shrineImprovement))
                }
              ></ShrineList>
            ) : (
              <BaseCardList
                cards={filteredAndSortedBaseCards()}
                onClickBaseCard={(card_name) => addBaseCard(card_name)}
              ></BaseCardList>
            )}
          </div>
          <div className="overlay-card-container" {...collectionDropProps}>
            <Container className="overlay-card-widget-container">
              button stuff
            </Container>
            {shrineMode ? (
              <ShrineImprovementList
                shrineImprovements={shrineImprovements}
                onClickShrineImprovement={(si) =>
                  setShrine(new ShrineSlot(shrine.shrine, si))
                }
              ></ShrineImprovementList>
            ) : (
              <EssenceList essences={essences}></EssenceList>
            )}
          </div>
        </DeckContext.Provider>
      </AlertPickup.Provider>
    </Box>
  );
}
