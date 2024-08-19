'use client';
import { Box } from '@mui/material';
import { baseCards, BaseCard } from './cardlists/base-cards';
import { shrines, ShrineSlot } from './cardlists/shrines';
import { essences, Essence } from './cardlists/essences';
import { shrineImprovements } from './cardlists/shrine-improvements';
import { CardType } from './components/card';
import { useState } from 'react';
import { idGenerator } from './utils';
import {
  useLocalStorageDeck,
  useLocalStorageShrine,
} from './components/deck-encoder';
import { HeldCard, AlertPickup } from './components/drag-context';
import { DeckContext } from './components/decklist-context';
import { ConditionalDroppable } from './components/conditional-droppable';
import { ShrineSection } from './shrine-section';
import { BaseCardSection } from './base-card-section';
import { ShrineImprovementSection } from './shrine-improvement-section';
import { EssenceSection } from './essence-section';
import { DeckSection } from './deck-section';

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
          ></DeckSection>
          {shrineMode ? (
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
          )}
          {shrineMode ? (
            <ShrineImprovementSection
              {...collectionDropProps}
              shrineImprovements={shrineImprovements}
              onClickShrineImprovement={(si) =>
                setShrine(new ShrineSlot(shrine.shrine, si))
              }
            ></ShrineImprovementSection>
          ) : (
            <EssenceSection essences={essences}></EssenceSection>
          )}
        </DeckContext.Provider>
      </AlertPickup.Provider>
    </Box>
  );
}
