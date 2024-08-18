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
  FormControl,
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
import { essences, Essence, EssenceFilters } from './cardlists/essences';
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
import { TertiaryButton } from './components/tertiary-button';
import { TernaryButton } from './components/ternary-button';

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
  // Shrine Improvement Filters
  // Base Card Filters
  const [bcType, setBcType] = useState(BaseCardType.Any);
  const [bcRarity, setBcRarity] = useState(Rarity.Any);
  const [bcElements, setBcElements] = useState([] as Element[]);
  const [bcElementAnd, setBcElementAnd] = useState(false);
  const [bcCostValOne, setBcCostValOne] = useState(NaN);
  const [bcCostValTwo, setBcCostValTwo] = useState(NaN);
  const [bcCostOperator, setBcCostOperator] = useState('=');
  const [bcQuery, setBcQuery] = useState('');
  // Essence Filters
  const [eElements, setEElements] = useState([] as Element[]);
  const [eElementAnd, setEElementAnd] = useState(true);
  const [eSpeed, setESpeed] = useState(false);
  const [ePower, setEPower] = useState(false);
  const [eHp, setEHp] = useState(false);
  const [eCost, setECost] = useState(undefined as boolean | undefined);
  const [eCcc, setECcc] = useState(NaN);
  const [eCccOperator, setECccOperator] = useState('<=');
  const [eUnlimited, setEUnlimited] = useState(
    undefined as boolean | undefined
  );

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

  const sortedDeck = sortDeck();

  function filterAndSortShrines() {
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

  const filteredAndSortedShrines = filterAndSortShrines();

  function filterAndSortShrineImprovements() {
    return shrineImprovements;
  }

  const filteredAndSortedShrineImprovements = filterAndSortShrineImprovements();

  function filterAndSortBaseCards() {
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
      .filter((c) => filters.keep(c))
      .sort((a, b) => a.cost - b.cost || a.name.localeCompare(b.name));
  }

  const filteredAndSortedBaseCards = filterAndSortBaseCards();

  function filterAndSortEssences() {
    const filters = new EssenceFilters({
      elementChoices: eElements,
      elementAnd: eElementAnd,
      speedChoice: eSpeed,
      powerChoice: ePower,
      hpChoice: eHp,
      hasCost: eCost,
      cccChoice: eCcc,
      cccOperator: eCccOperator,
      unlimitedChoice: eUnlimited,
    });
    return essences
      .filter((e) => filters.keep(e))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  const filteredAndSortedEssences = filterAndSortEssences();

  function handleElementFilterClicked(
    e: Element,
    currentFilters: Element[],
    setFilters: (a: Element[]) => void
  ) {
    if (currentFilters.includes(e)) {
      setFilters(currentFilters.filter((el) => el !== e));
    } else {
      setFilters([...currentFilters, e]);
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
                    onElementClicked={(e: Element) =>
                      handleElementFilterClicked(e, sElements, setSElements)
                    }
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
                      onElementClicked={(e: Element) =>
                        handleElementFilterClicked(e, bcElements, setBcElements)
                      }
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
                shrines={filteredAndSortedShrines}
                onClickShrine={(s) =>
                  setShrine(new ShrineSlot(s, shrine.shrineImprovement))
                }
              ></ShrineList>
            ) : (
              <BaseCardList
                cards={filteredAndSortedBaseCards}
                onClickBaseCard={(card_name) => addBaseCard(card_name)}
              ></BaseCardList>
            )}
          </div>
          <div className="overlay-card-container" {...collectionDropProps}>
            {shrineMode ? (
              <div className="overlay-card-widget-container">
                <FormGroup className="element-filter">
                  {/* <ElementButtons
                    selected={sElements}
                    onElementClicked={(e: Element) =>
                      handleElementFilterClicked(e, eElements, setEElements)
                    }
                  ></ElementButtons> */}
                </FormGroup>
              </div>
            ) : (
              <div className="overlay-card-widget-container">
                <FormGroup className="element-filter">
                  <ElementButtons
                    selected={sElements}
                    onElementClicked={(e: Element) =>
                      handleElementFilterClicked(e, eElements, setEElements)
                    }
                  ></ElementButtons>
                  <Stack
                    direction="row"
                    alignItems="center"
                    sx={{ marginLeft: '.5em' }}
                  >
                    <Typography>Or</Typography>
                    <Switch
                      checked={eElementAnd}
                      onChange={(e) => setEElementAnd(e.target.checked)}
                    />
                    <Typography>And</Typography>
                  </Stack>
                </FormGroup>
                <div className="stat-filters">
                  <button onClick={() => setESpeed(!eSpeed)}>
                    <Box className="stat-filter">Spd</Box>
                  </button>
                  <button onClick={() => setEPower(!ePower)}>
                    <Box className="stat-filter">Pwr</Box>
                  </button>
                  <button onClick={() => setEHp(!eHp)}>
                    <Box className="stat-filter">Hp</Box>
                  </button>
                </div>
                <TertiaryButton
                  state={eCost}
                  labels={['Cost', '+1', '+0']}
                  setState={setECost}
                ></TertiaryButton>
                <FormGroup className="cost-filter">
                  <Select
                    value={eCccOperator}
                    onChange={(e) => setECccOperator(e.target.value)}
                  >
                    <MenuItem value={'='}>=</MenuItem>
                    <MenuItem value={'<='}>&lt;=</MenuItem>
                    <MenuItem value={'>='}>&gt;=</MenuItem>
                  </Select>
                  <PipButtons
                    count={7}
                    selectedOne={eCcc}
                    onClick={(num: number) => setECcc(num === eCcc ? NaN : num)}
                    zeroIndex={true}
                  ></PipButtons>
                </FormGroup>
                <TertiaryButton
                  state={eUnlimited}
                  labels={['Quantity', 'Quantity: ∞', 'Quantity: 3']}
                  setState={setEUnlimited}
                ></TertiaryButton>
              </div>
            )}
            {shrineMode ? (
              <ShrineImprovementList
                shrineImprovements={filteredAndSortedShrineImprovements}
                onClickShrineImprovement={(si) =>
                  setShrine(new ShrineSlot(shrine.shrine, si))
                }
              ></ShrineImprovementList>
            ) : (
              <EssenceList essences={filteredAndSortedEssences}></EssenceList>
            )}
          </div>
        </DeckContext.Provider>
      </AlertPickup.Provider>
    </Box>
  );
}
