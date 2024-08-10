'use client';
<<<<<<< HEAD
import { Alert, Box, Button, Fade, IconButton } from '@mui/material';
import { baseCards, BaseCard } from './cardlists/base-cards';
import { shrines, ShrineSlot } from './cardlists/shrines';
import { essences, Essence } from './cardlists/essences';
import { shrineImprovements } from './cardlists/shrine-improvements';
import { CardType } from './components/card';
=======
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
import { shrines, ShrineSlot } from './cardlists/shrines';
import { essences, Essence } from './cardlists/essences';
import { shrineImprovements } from './cardlists/shrine-improvements';
import { CardType, DisplayData, ImprovedShrine } from './components/card';
>>>>>>> 852dd52 (dragging improvements)
import { useState } from 'react';
import { idGenerator } from './utils';
import {
  useLocalStorageDeck,
  useLocalStorageShrine,
} from './components/deck-encoder';
<<<<<<< HEAD
import { HeldCard, AlertPickup } from './components/drag-context';
import { DeckContext } from './components/decklist-context';
import { ConditionalDroppable } from './components/conditional-droppable';
import { ShrineSection } from './shrine-section';
import { BaseCardSection } from './base-card-section';
import { ShrineImprovementSection } from './shrine-improvement-section';
import { EssenceSection } from './essence-section';
import { DeckSection } from './deck-section';
import { Check } from '@mui/icons-material';
import zIndex from '@mui/material/styles/zIndex';
import { styleText } from 'util';
=======
import { useEffect } from 'react';
import { ResourceTracker } from './components/resource-tracker';
import { HeldCard, AlertPickup } from './components/drag-context';
import { createContext } from 'vm';
import { DeckContext } from './components/decklist-context';
>>>>>>> 852dd52 (dragging improvements)

export class DeckSlot {
  baseCard: BaseCard;
  essence: Essence | null;
  id: number;

  constructor(baseCard: BaseCard, essence: Essence | null) {
    this.baseCard = baseCard;
    this.essence = essence;
    this.id = newCardSlotId();
  }
}

const newCardSlotId = idGenerator();
// const newAlertId = idGenerator();
export default function Home() {
  const [shrineMode, setShrineMode] = useState(true);
  const [shrine, setShrine] = useLocalStorageShrine('tempShrine');
  const [deck, setDeck] = useLocalStorageDeck();
<<<<<<< HEAD
  const [heldCard, setHeldCard] = useState(null as HeldCard);
  const [maxView, setMaxView] = useState(false);
  // const [alertMessages, setAlertMessages] = useState({} as any);
  // const [alertVisible, setAlertVisible] = useState(false);
=======
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

  // useEffect(() => {
  //   setShrine(decodeShrine('tempDeck'));
  // }, []);

  // useEffect(() => {
  //   window.localStorage.setItem(
  //     'tempDeck',
  //     encode({ shrineSlot: shrine, deck: deck })
  //   );
  // }, [deck, shrine]);
>>>>>>> 852dd52 (dragging improvements)

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

  // function alert(message: string) {
  //   let id = newAlertId();
  //   setAlertMessages((prev) => {
  //     return { ...prev, [id]: message };
  //   });
  //   setTimeout(() => {
  //     // if (currAlert === message) {
  //     // setAlertVisible(false);
  //     // }

  //     setAlertMessages((prev) => {
  //       const { [id]: _, ...newAlerts } = alertMessages;
  //       return newAlerts;
  //     });
  //   }, 2500);
  // }

  // const alerts = Object.values(alertMessages).map((message) => (
  //   <div style={{ position: 'absolute', left: '50%' }}>
  //     <Alert
  //       icon={<Check fontSize="inherit" />}
  //       severity="success"
  //       style={{
  //         position: 'relative',
  //         left: '-50%',
  //         top: '70vh',
  //         zIndex: '999',
  //       }}
  //     >
  //       {message as string}
  //     </Alert>
  //   </div>
  // ));

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
          {/* <Fade in={alertVisible}>
            
          </Fade> */}
          {/* {alerts} */}
          {/* <Button
            onClick={() => {
              alert(`${newAlertId()}`);
            }}
            style={{ position: 'absolute', zIndex: '10' }}
          >
            push message
          </Button> */}
          <DeckSection
            deck={deck}
            setDeck={setDeck}
            shrine={shrine}
            setShrine={setShrine}
            shrineMode={shrineMode}
            toggleShrineMode={toggleShrineMode}
            heldCard={heldCard}
            onClickDeckSlot={removeLayer}
            onDropEssence={applyEssence}
            onDropBaseCard={addBaseCard}
            deckMaximized={maxView}
            toggleMaxView={() => setMaxView(!maxView)}
          ></DeckSection>
          {!maxView &&
            (shrineMode ? (
              <ShrineSection
                {...collectionDropProps}
                shrines={shrines}
                onClickShrine={(s) =>
                  setShrine(new ShrineSlot(s, shrine.shrineImprovement))
                }
              ></ShrineSection>
            ) : (
              <BaseCardSection
                {...collectionDropProps}
                cards={baseCards}
                onClickBaseCard={(card_name) => addBaseCard(card_name)}
              ></BaseCardSection>
            ))}
          {!maxView &&
            (shrineMode ? (
              <ShrineImprovementSection
                {...collectionDropProps}
                shrineImprovements={shrineImprovements}
                onClickShrineImprovement={(si) =>
                  setShrine(new ShrineSlot(shrine.shrine, si))
                }
              ></ShrineImprovementSection>
            ) : (
              <EssenceSection essences={essences}></EssenceSection>
            ))}
        </DeckContext.Provider>
      </AlertPickup.Provider>
    </Box>
  );
}
