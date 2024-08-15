import { Container, Grid } from '@mui/material';
import Card, { DisplayData } from './card';
import { CardType } from './card';
import { ImprovedShrine, ImbuedCard } from './card';
import { DeckSlot } from '../page';
import { ShrineSlot } from '../cardlists/shrines';
import { CardModal, DeckModal } from './card-modal';
import { useContext, useState } from 'react';
import { Shrine } from '../cardlists/shrines';
import { ShrineImprovement } from '../cardlists/shrine-improvements';
import { BaseCard } from '../cardlists/base-cards';
import { Essence } from '../cardlists/essences';
import {
  AlertPickup,
  AnyCard,
  // disam,
  HeldCard,
  Placeholder,
} from './drag-context';
import { ConditionalDroppable } from './conditional-droppable';
import { DeckContext, DecklistContext } from './decklist-context';

export function ShrineList({
  shrines,
  onClickShrine,
}: {
  shrines: Shrine[];
  onClickShrine: (shrine: Shrine) => void;
}) {
  const [modalCard, setModalCard] = useState(-1);

  function openModal(shrine: Shrine) {
    setModalCard(shrines.indexOf(shrine));
  }

  const images = shrines.map((shrine) => (
    <Grid item key={shrine.filename}>
      <Card
        card={shrine}
        onClick={onClickShrine}
        onContextMenu={openModal}
      ></Card>
    </Grid>
  ));

  return (
    <Container className="base-card-list-container">
      <CardModal
        cardType={CardType.Shrine}
        list={shrines}
        activeCard={modalCard}
        setActiveCard={setModalCard}
        onEnter={onClickShrine}
      ></CardModal>
      <Grid container>{images}</Grid>
    </Container>
  );
}

export function ShrineImprovementList({
  shrineImprovements,
  onClickShrineImprovement,
}: {
  shrineImprovements: ShrineImprovement[];
  onClickShrineImprovement: (shrineImprovement: ShrineImprovement) => void;
}) {
  const [modalCard, setModalCard] = useState(-1);

  function openModal(shrineImprovement: ShrineImprovement) {
    setModalCard(shrineImprovements.indexOf(shrineImprovement));
  }

  const images = shrineImprovements.map((si) => (
    <Grid className="unbacked-overlay" item key={si.filename}>
      <Card
        card={si}
        onClick={onClickShrineImprovement}
        onContextMenu={openModal}
      ></Card>
    </Grid>
  ));

  return (
    <Container className="overlays">
      <CardModal
        cardType={CardType.ShrineImprovement}
        list={shrineImprovements}
        activeCard={modalCard}
        setActiveCard={setModalCard}
      ></CardModal>
      <Grid container className="overlay-grid">
        {images}
      </Grid>
    </Container>
  );
}

export function BaseCardList({
  cards,
  onClickBaseCard,
}: {
  cards: BaseCard[];
  onClickBaseCard: (arg0: BaseCard) => void;
}) {
  const [modalCard, setModalCard] = useState(-1);
  const decklistContext = useContext(DeckContext);

  function openModal(card: BaseCard) {
    setModalCard(cards.indexOf(card));
  }

  const images = cards.map((c) => {
    let count = decklistContext.cards.get(c.id) || 0;
    let atMax = c.epic ? count === 1 : count === 3;
    // atMax = false;
    return (
      <Grid item key={c.filename}>
        <Card
          card={c}
          onClick={onClickBaseCard}
          onContextMenu={openModal}
          disabled={atMax}
        ></Card>
      </Grid>
    );
  });

  return (
    <Container className="base-card-list-container">
      <CardModal
        cardType={CardType.BaseCard}
        list={cards}
        activeCard={modalCard}
        setActiveCard={setModalCard}
        onEnter={onClickBaseCard}
      ></CardModal>
      <Grid container>{images}</Grid>
    </Container>
  );
}

export function EssenceList({ essences }: { essences: Essence[] }) {
  const [modalCard, setModalCard] = useState(-1);
  const decklistContext = useContext(DeckContext);

  function openModal(essence: Essence) {
    setModalCard(essences.indexOf(essence));
  }

  const images = essences.map((e) => {
    let atMax = (decklistContext.essences.get(e.id) || 0) === 3 && !e.unlimited;
    return (
      <Grid className="unbacked-overlay" item key={e.filename}>
        <Card card={e} onContextMenu={openModal} disabled={atMax}></Card>
      </Grid>
    );
  });

  return (
    <Container className="overlays">
      <CardModal
        cardType={CardType.Essence}
        list={essences}
        activeCard={modalCard}
        setActiveCard={setModalCard}
      ></CardModal>
      <Grid container className="overlay-grid">
        {images}
      </Grid>
    </Container>
  );
}

export function Deck({
  shrineSlot,
  mainDeck,
  heldCard,
  onClickDeckSlot,
  applyEssence,
  setShrine,
  setShrineImprovement,
  addBaseCard,
}: {
  shrineSlot: ShrineSlot;
  mainDeck: DeckSlot[];
  heldCard: HeldCard;
  onClickDeckSlot: (id: number) => void;
  applyEssence: (id: number, essence: Essence) => void;
  setShrine: (shrine: Shrine | null) => void;
  setShrineImprovement: (shrineImprovement: ShrineImprovement | null) => void;
  addBaseCard: (c: BaseCard) => void;
}) {
  const [modalCard, setModalCard] = useState(NaN);

  function getIndex(id: number) {
    return mainDeck.findIndex((slot) => {
      return slot.id === id;
    });
  }

  let deck = [];

  for (let i = 0; i < mainDeck.length; i++) {
    let c = mainDeck[i];
    let dupes = [];
    let className = '';
    let droppable = false;
    if (heldCard) {
      let t = heldCard.card.type;
      if (t === CardType.Essence) {
        let e = heldCard.card as Essence;
        droppable = e.validBases.has(c.baseCard.id);
      }
      if (
        t === CardType.Essence ||
        (Number.isNaN(heldCard.id) &&
          (t === CardType.Shrine || t === CardType.ShrineImprovement))
      )
        className = droppable ? ' valid' : ' greyed';
    }
    let dropProps;
    while (mainDeck[i + 1]?.baseCard.id === c.baseCard.id) {
      let dupe = mainDeck[i];
      i++;
      dropProps = new ConditionalDroppable(droppable, (e: React.DragEvent) => {
        e.preventDefault();
        applyEssence(dupe.id, heldCard?.card as Essence);
      });
      dupes.push(
        dupe.essence ? (
          <ImbuedCard
            key={i}
            className={'overlapped has-essence' + className}
            // style={style}
            {...dropProps}
            card={dupe.baseCard}
            essence={dupe.essence}
            onClick={() => onClickDeckSlot(dupe.id)}
            onContextMenu={() => {
              setModalCard(getIndex(dupe.id));
            }}
            cardSlotId={dupe.id}
          ></ImbuedCard>
        ) : (
          <Card
            key={i}
            className={'overlapped' + className}
            // style={style}
            {...dropProps}
            card={dupe.baseCard}
            onClick={() => onClickDeckSlot(dupe.id)}
            onContextMenu={(s) => {
              setModalCard(getIndex(dupe.id));
            }}
            cardSlotId={dupe.id}
          ></Card>
        )
      );
    }
    c = mainDeck[i];
    dropProps = new ConditionalDroppable(droppable, (e: React.DragEvent) => {
      e.preventDefault();
      applyEssence(c.id, heldCard?.card as Essence);
    });
    deck.push(
      <Grid
        item
        className="card-cluster"
        style={{ width: 7.55 + 5.66 * dupes.length + 'vw' }}
        key={c.id}
      >
        {dupes}
        {c.essence ? (
          <ImbuedCard
            key={i}
            {...dropProps}
            className={'last has-essence' + className}
            card={c.baseCard}
            essence={c.essence}
            onClick={() => onClickDeckSlot(c.id)}
            onContextMenu={() => {
              setModalCard(getIndex(c.id));
            }}
            cardSlotId={c.id}
          ></ImbuedCard>
        ) : (
          <Card
            key={i}
            {...dropProps}
            className={'last' + className}
            card={c.baseCard}
            onClick={() => onClickDeckSlot(c.id)}
            onContextMenu={(s) => {
              setModalCard(getIndex(c.id));
            }}
            cardSlotId={c.id}
          ></Card>
        )}
      </Grid>
    );
  }

  let shrine;
  let shrineDroppable = new ConditionalDroppable(
    (heldCard &&
      (heldCard.card.type === CardType.Shrine ||
        heldCard.card.type === CardType.ShrineImprovement)) as boolean,
    (e) => {
      e.preventDefault();
      if (heldCard?.card.type === CardType.Shrine) {
        setShrine(heldCard.card as Shrine);
      } else {
        // must be si
        setShrineImprovement(heldCard?.card as ShrineImprovement);
      }
    }
  );
  if (shrineSlot.shrine) {
    shrine = shrineSlot.shrineImprovement ? (
      <ImprovedShrine
        shrineSlot={shrineSlot}
        onClick={() => setShrineImprovement(null)}
        onContextMenu={() => setModalCard(-1)}
        {...shrineDroppable}
      ></ImprovedShrine>
    ) : (
      <Card
        card={shrineSlot.shrine}
        onClick={() => setShrine(null)}
        onContextMenu={(s) => setModalCard(-1)} //ignoring the card name that Card passes up
        cardSlotId={1} //distinguishing active shrine from those in the collection
        {...shrineDroppable}
      ></Card>
    );
  } else {
    shrine = shrineSlot.shrineImprovement ? (
      <Card
        card={shrineSlot.shrineImprovement}
        onClick={() => setShrineImprovement(null)}
        onContextMenu={() => setModalCard(-1)}
        {...shrineDroppable}
      ></Card>
    ) : (
      <Card
        card={new Placeholder()}
        onContextMenu={(s) => setModalCard(-1)} //ignoring the card name that Card passes up
        {...shrineDroppable}
      ></Card>
    );
  }
  const deckDroppable = new ConditionalDroppable(
    heldCard?.card.type === CardType.BaseCard && Number.isNaN(heldCard?.id),
    (e) => {
      e.preventDefault();
      addBaseCard(heldCard?.card as BaseCard);
    }
  );

  return (
    <div className="main-deck" {...deckDroppable}>
      <DeckModal
        shrineSlot={shrineSlot}
        mainDeck={mainDeck}
        activeCard={modalCard}
        setActiveCard={setModalCard}
      ></DeckModal>
      <Grid container>
        <Grid item>{shrine}</Grid>
        {deck}
      </Grid>
    </div>
  );
}
