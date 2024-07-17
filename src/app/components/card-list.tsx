import { Container, Grid } from '@mui/material';
import Card from './card';
import { CardType } from './card';
import { ImprovedShrine, ImbuedCard } from './card';
import { DeckSlot, ShrineSlot } from '../page';
import { CardModal, DeckModal } from './card-modal';
import { useState } from 'react';
import { Shrine } from '../cardlists/shrines';
import { ShrineImprovement } from '../cardlists/shrine-improvements';
import { BaseCard } from '../cardlists/base-cards';
import { Essence } from '../cardlists/essences';

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
      <Grid container spacing={4}>
        {images}
      </Grid>
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
      <Grid container spacing={4} className="overlay-grid">
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

  function openModal(card: BaseCard) {
    setModalCard(cards.indexOf(card));
  }

  const images = cards.map((c) => (
    <Grid item key={c.filename}>
      <Card card={c} onClick={onClickBaseCard} onContextMenu={openModal}></Card>
    </Grid>
  ));

  return (
    <Container className="base-card-list-container">
      <CardModal
        cardType={CardType.BaseCard}
        list={cards}
        activeCard={modalCard}
        setActiveCard={setModalCard}
        onEnter={onClickBaseCard}
      ></CardModal>
      <Grid container spacing={4}>
        {images}
      </Grid>
    </Container>
  );
}

export function EssenceList({ essences }: { essences: Essence[] }) {
  const [modalCard, setModalCard] = useState(-1);

  function openModal(essence: Essence) {
    setModalCard(essences.indexOf(essence));
  }

  const images = essences.map((e) => (
    <Grid className="unbacked-overlay" item key={e.filename}>
      <Card card={e} onContextMenu={openModal}></Card>
    </Grid>
  ));

  return (
    <Container className="overlays">
      <CardModal
        cardType={CardType.Essence}
        list={essences}
        activeCard={modalCard}
        setActiveCard={setModalCard}
      ></CardModal>
      <Grid container spacing={4} className="overlay-grid">
        {images}
      </Grid>
    </Container>
  );
}

export function Deck({
  shrineSlot,
  mainDeck,
  onClickDeckSlot,
  applyEssence,
  setShrine,
  setShrineImprovement,
}: {
  shrineSlot: ShrineSlot;
  mainDeck: DeckSlot[];
  onClickDeckSlot: (id: number) => void;
  applyEssence: (id: number, essence: string) => void;
  setShrine: (shrine: string) => void;
  setShrineImprovement: (shrineImprovement: string) => void;
}) {
  const [modalCard, setModalCard] = useState(NaN);

  function getIndex(id: number) {
    return mainDeck.findIndex((slot) => {
      return slot.id === id;
    });
  }

  const deck = mainDeck.map((c) => (
    <Grid
      item
      key={c.id}
      onDrop={(e) => {
        e.preventDefault();
        if (e.dataTransfer.getData('type') === CardType.Essence) {
          applyEssence(c.id, e.dataTransfer.getData('card'));
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
    >
      {c.essence ? (
        <ImbuedCard
          card={c.baseCard}
          essence={c.essence}
          onClick={() => onClickDeckSlot(c.id)}
          onContextMenu={() => {
            setModalCard(getIndex(c.id));
          }}
        ></ImbuedCard>
      ) : (
        <Card
          card={c.baseCard}
          onClick={() => onClickDeckSlot(c.id)}
          onContextMenu={(s) => {
            setModalCard(getIndex(c.id));
          }}
        ></Card>
      )}
    </Grid>
  ));

  let shrine;
  if (shrineSlot.shrine) {
    shrine = shrineSlot.shrineImprovement ? (
      <ImprovedShrine
        shrineSlot={shrineSlot}
        onClick={() => setShrineImprovement('')}
        onContextMenu={() => setModalCard(-1)}
      ></ImprovedShrine>
    ) : (
      <Card
        card={shrineSlot.shrine}
        onClick={() => setShrine('')}
        onContextMenu={(s) => setModalCard(-1)} //ignoring the card name that Card passes up
      ></Card>
    );
  } else {
    shrine = shrineSlot.shrineImprovement ? (
      <Card
        card={shrineSlot.shrineImprovement}
        onClick={() => setShrineImprovement('')}
        onContextMenu={() => setModalCard(-1)}
      ></Card>
    ) : (
      <Card
        card={{ name: '', filename: '', type: CardType.Placeholder }}
        onContextMenu={(s) => setModalCard(-1)} //ignoring the card name that Card passes up
      ></Card>
    );
  }

  return (
    <Container
      className="main-deck"
      onDrop={(e) => {
        e.preventDefault();
        const t = e.dataTransfer.getData('type');
        if (t === CardType.Shrine) {
          setShrine(e.dataTransfer.getData('card'));
        } else if (t === CardType.ShrineImprovement) {
          setShrineImprovement(e.dataTransfer.getData('card'));
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
    >
      <DeckModal
        shrineSlot={shrineSlot}
        mainDeck={mainDeck}
        activeCard={modalCard}
        setActiveCard={setModalCard}
      ></DeckModal>
      <Grid container spacing={4}>
        <Grid item>{shrine}</Grid>
        {deck}
      </Grid>
    </Container>
  );
}
