import { Container } from '@mui/material';
import { ComponentPropsWithoutRef, useState } from 'react';
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
    if (ac && bc) {
      return (
        ac.supertype.localeCompare(bc.supertype) ||
        ac.cost - bc.cost ||
        ac.name.localeCompare(bc.name)
      );
    } else if (ac && !bc) {
      return -1;
    } else if (!ac && bc) {
      return 1;
    } else {
      // both only essences
      return a.essence!.name.localeCompare(b.essence!.name);
    }
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
  const [ttsMode, setTtsMode] = useState(false);
  const sortedDeck = sortDeck(deck);
  let containerClassName = deckMaximized
    ? 'deck-container max'
    : 'deck-container min';
  if (deckMaximized && ttsMode) {
    containerClassName += ' tts';
  }

  return (
    <Container className={containerClassName} {...rest}>
      <DeckTracker
        deck={sortedDeck}
        setDeck={setDeck}
        shrine={shrine}
        setShrine={setShrine}
        shrineMode={shrineMode}
        toggleShrineMode={toggleShrineMode}
        deckMaximized={deckMaximized}
        toggleMaxView={toggleMaxView}
        ttsMode={ttsMode}
        toggleTtsMode={() => setTtsMode(!ttsMode)}
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
        ttsMode={ttsMode}
      ></Deck>
    </Container>
  );
}
