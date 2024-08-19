import {
  Container,
  IconButton,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import { ComponentPropsWithoutRef, useState } from 'react';
import { LibraryBooks, SaveAs } from '@mui/icons-material';
import { Essence } from './cardlists/essences';
import { LoadDeckModal, SaveDeckModal } from './components/deck-encoder';
import { ResourceTracker } from './components/resource-tracker';
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
  ...rest
}: DeckSectionProps) {
  const [deckDataModal, setDeckDataModal] = useState(false);
  const [saveDeckModal, setSaveDeckModal] = useState(false);
  const [loadDeckModal, setLoadDeckModal] = useState(false);

  function toggleDeckDataModal() {
    setDeckDataModal(!deckDataModal);
  }

  function toggleSaveDeckModal() {
    setSaveDeckModal(!saveDeckModal);
  }

  function toggleLoadDeckModal() {
    setLoadDeckModal(!loadDeckModal);
  }

  const sortedDeck = sortDeck(deck);

  return (
    <Container className="deck-container" {...rest}>
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
        <ResourceTracker deck={deck} shrine={shrine.shrine}></ResourceTracker>
      </Container>
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
      ></Deck>
    </Container>
  );
}
