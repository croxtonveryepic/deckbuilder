import { Container } from '@mui/material';
import { ComponentPropsWithoutRef } from 'react';
import { Essence } from './cardlists/essences';
import { DeckTracker } from './components/deck-tracker';
import { DeckSlot } from './page';
import { ShrineSlot } from './cardlists/shrines';
import { Deck } from './components/card-list';
import { HeldCard } from './components/drag-context';
import { BaseCard } from './cardlists/base-cards';

function sortDeck(deck: DeckSlot[]) {
  return Array.from(deck).sort((a, b) => {
    let ac = a.baseCard;
    let bc = b.baseCard;
    return (
      a.baseCard.supertype.localeCompare(b.baseCard.supertype) ||
      ac.cost + ac.pips.length - (bc.cost + bc.pips.length) ||
      ac.name.localeCompare(bc.name)
    );
  });
}

interface DeckSectionProps extends ComponentPropsWithoutRef<'div'> {
  deck: DeckSlot[];
  setDeck: (deck: DeckSlot[]) => void;
  shrine: ShrineSlot;
  setShrine: (ss: ShrineSlot) => void;
  shrineMode: boolean;
  toggleShrineMode: () => void;
  heldCard: HeldCard;
  onClickDeckSlot: (id: number) => void;
  onDropEssence: (id: number, essence: Essence) => void;
  onDropBaseCard: (c: BaseCard) => void;
  deckMaximized: boolean;
  toggleMaxView: () => void;
}

export function DeckSection({
  deck,
  setDeck,
  shrine,
  setShrine,
  shrineMode,
  toggleShrineMode,
  heldCard,
  onClickDeckSlot,
  onDropEssence,
  onDropBaseCard,
  deckMaximized,
  toggleMaxView,
  ...rest
}: DeckSectionProps) {
  const sortedDeck = sortDeck(deck);
  const containerClassName = deckMaximized
    ? 'deck-container max'
    : 'deck-container min';

  return (
    <Container className={containerClassName} {...rest}>
      <DeckTracker
        deck={deck}
        setDeck={setDeck}
        shrine={shrine}
        setShrine={setShrine}
        shrineMode={shrineMode}
        toggleShrineMode={toggleShrineMode}
        deckMaximized={deckMaximized}
        toggleMaxView={toggleMaxView}
      ></DeckTracker>
      <Deck
        shrineSlot={shrine}
        mainDeck={sortedDeck}
        heldCard={heldCard}
        onClickDeckSlot={onClickDeckSlot}
        onDropEssence={onDropEssence}
        setShrine={(s) =>
          setShrine(new ShrineSlot(s, shrine.shrineImprovement))
        }
        setShrineImprovement={(si) =>
          setShrine(new ShrineSlot(shrine.shrine, si))
        }
        onDropBaseCard={onDropBaseCard}
        deckMaximized={deckMaximized}
      ></Deck>
    </Container>
  );
}
