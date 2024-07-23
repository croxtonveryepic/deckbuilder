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
  FormControlLabel,
  IconButton,
  Icon,
  TextField,
  Paper,
  Button,
  InputAdornment,
  InputLabel,
} from '@mui/material';
import {
  ShrineList,
  ShrineImprovementList,
  BaseCardList,
  EssenceList,
} from './components/card-list';
import {
  baseCards,
  BaseCardFilters,
  BaseCard,
  Element,
  BaseCardType,
  Rarity,
} from './cardlists/base-cards';
import { shrines, Shrine } from './cardlists/shrines';
import { essences, Essence } from './cardlists/essences';
import {
  shrineImprovements,
  ShrineImprovement,
} from './cardlists/shrine-improvements';
import { CardType, ImprovedShrine } from './components/card';
import { useState } from 'react';
import Card from './components/card';
import { Deck } from './components/card-list';
import { idGenerator } from './utils';
import Image from 'next/image';
import { DndContext } from '@dnd-kit/core';
import { PipButtons } from './components/pip-button';
import { ElementButtons } from './components/element-buttons';
import {
  HighlightOff,
  SaveAs,
  LibraryBooks,
  Search,
  ImportExport,
} from '@mui/icons-material';
import {
  LoadDeckModal,
  SaveDeckModal,
  useLocalStorageDeck,
  useLocalStorageShrine,
} from './components/deck-encoder';
import { useEffect } from 'react';
import { ResourceTracker } from './components/resource-tracker';

export class ShrineSlot {
  shrine: Shrine | null;
  shrineImprovement: ShrineImprovement | null;

  constructor(shrine: Shrine | null, improvement: ShrineImprovement | null) {
    this.shrine = shrine;
    this.shrineImprovement = improvement;
  }
}

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

// typeChoice?: BaseCardType;
//     elementChoices?: Element[];
//     elementAnd: boolean;
//     costChoiceOne?: number;
//     costChoiceTwo?: number;
//     costOperator: string;
//     query?: string;
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

  // useEffect(() => {
  //   setShrine(decodeShrine('tempDeck'));
  // }, []);

  // useEffect(() => {
  //   window.localStorage.setItem(
  //     'tempDeck',
  //     encode({ shrineSlot: shrine, deck: deck })
  //   );
  // }, [deck, shrine]);

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
    if (bcCostOperator === '<>') {
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

  // handleCostFilterLineT

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

  function applyEssence(id: number, essence: string) {
    setDeck(
      deck.map((ds) => {
        if (ds.id === id) {
          return { ...ds, essence: getCardByFilename(essence, essences) };
        } else {
          return ds;
        }
      })
    );
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

  return (
    <Box>
      <DndContext>
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
                // console.log(ss);
                setShrine(ss);
                // console.log(shrine);
                // console.log(ds);
                setDeck(ds);
                // console.log(deck);
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
            onClickDeckSlot={removeLayer}
            applyEssence={applyEssence}
            setShrine={(s) =>
              setShrine(
                new ShrineSlot(
                  getCardByFilename(s, shrines),
                  shrine.shrineImprovement
                )
              )
            }
            setShrineImprovement={(si) =>
              setShrine(
                new ShrineSlot(
                  shrine.shrine,
                  getCardByFilename(si, shrineImprovements)
                )
              )
            }
          ></Deck>
        </Container>
        <Container className="base-card-container">
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
                    sx={{ marginLeft: '5px' }}
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
                      if (bcCostOperator === '<>') {
                        setBcCostValTwo(NaN);
                      }
                      setBcCostOperator(val);
                    }}
                    // sx={{ width = '20%' }}
                  >
                    <MenuItem value={'='}>=</MenuItem>
                    <MenuItem value={'<='}>&lt;=</MenuItem>
                    <MenuItem value={'>='}>&gt;=</MenuItem>
                    <MenuItem value={'<>'}>&lt;&gt;</MenuItem>
                  </Select>
                  <PipButtons
                    count={8}
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
        </Container>
        <Container className="overlay-card-container">
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
        </Container>
      </DndContext>
    </Box>
  );
}
