import { Container, Grid } from '@mui/material';
import Card from './card';
import { CardType } from './card';
import { ImprovedShrine, ImbuedCard } from './card';
import { DeckSlot, ShrineSlot } from '../page';
import { CardModal, DeckModal } from './card-modal';
import { useState } from 'react';

export function ShrineList({
  card_list,
  onClickShrine,
}: {
  card_list: string[];
  onClickShrine: (arg0: string) => void;
}) {
  const [modalCard, setModalCard] = useState(-1);

  function openModal(card: string) {
    setModalCard(card_list.indexOf(card));
  }

  const images = card_list.map((card_name) => (
    <Grid item key={card_name}>
      <Card
        card_name={card_name}
        card_type={CardType.Shrine}
        onClick={onClickShrine}
        onContextMenu={openModal}
      ></Card>
    </Grid>
  ));

  return (
    <Container>
      <CardModal
        cardType={CardType.Shrine}
        cardList={card_list}
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
  card_list,
  onClickShrineImprovement,
}: {
  card_list: string[];
  onClickShrineImprovement: (arg0: string) => void;
}) {
  const [modalCard, setModalCard] = useState(-1);

  function openModal(card: string) {
    setModalCard(card_list.indexOf(card));
  }

  const images = card_list.map((card_name) => (
    <Grid className="unbacked-overlay" item key={card_name}>
      <Card
        card_name={card_name}
        card_type={CardType.ShrineImprovement}
        onClick={onClickShrineImprovement}
        onContextMenu={openModal}
      ></Card>
    </Grid>
  ));

  return (
    <Container>
      <CardModal
        cardType={CardType.ShrineImprovement}
        cardList={card_list}
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
  card_list,
  onClickBaseCard,
}: {
  card_list: string[];
  onClickBaseCard: (arg0: string) => void;
}) {
  const [modalCard, setModalCard] = useState(-1);

  function openModal(card: string) {
    setModalCard(card_list.indexOf(card));
  }

  const images = card_list.map((card_name) => (
    <Grid item key={card_name}>
      <Card
        card_name={card_name}
        card_type={CardType.BaseCard}
        onClick={onClickBaseCard}
        onContextMenu={openModal}
      ></Card>
    </Grid>
  ));

  return (
    <Container>
      <CardModal
        cardType={CardType.BaseCard}
        cardList={card_list}
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

export function EssenceList({ essence_list }: { essence_list: string[] }) {
  const [modalCard, setModalCard] = useState(-1);

  function openModal(card: string) {
    setModalCard(essence_list.indexOf(card));
  }

  const images = essence_list.map((e) => (
    <Grid className="unbacked-overlay" item key={e}>
      <Card
        card_name={e}
        card_type={CardType.Essence}
        onContextMenu={openModal}
      ></Card>
    </Grid>
  ));

  return (
    <Container>
      <CardModal
        cardType={CardType.Essence}
        cardList={essence_list}
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
      {c.essence === '' ? (
        <Card
          card_name={c.baseCard}
          card_type={CardType.BaseCard}
          onClick={() => onClickDeckSlot(c.id)}
          onContextMenu={(s) => {
            setModalCard(getIndex(c.id));
          }}
        ></Card>
      ) : (
        <ImbuedCard
          card={c.baseCard}
          essence={c.essence}
          onClick={() => onClickDeckSlot(c.id)}
          onContextMenu={() => {
            setModalCard(getIndex(c.id));
          }}
        ></ImbuedCard>
      )}
    </Grid>
  ));

  let shrine;
  if (shrineSlot.shrine === '') {
    shrine =
      shrineSlot.shrineImprovement === '' ? (
        <Card
          card_name={''}
          card_type={CardType.Placeholder}
          onContextMenu={(s) => setModalCard(-1)} //ignoring the card name that Card passes up
        ></Card>
      ) : (
        <Card
          card_name={shrineSlot.shrineImprovement}
          card_type={CardType.ShrineImprovement}
          onClick={() => setShrineImprovement('')}
          onContextMenu={() => setModalCard(-1)}
        ></Card>
      );
  } else {
    shrine =
      shrineSlot.shrineImprovement === '' ? (
        <Card
          card_name={shrineSlot.shrine}
          card_type={CardType.Shrine}
          onClick={() => setShrine('')}
          onContextMenu={(s) => setModalCard(-1)} //ignoring the card name that Card passes up
        ></Card>
      ) : (
        <ImprovedShrine
          shrineSlot={shrineSlot}
          onClick={() => setShrineImprovement('')}
          onContextMenu={() => setModalCard(-1)}
        ></ImprovedShrine>
      );
  }

  return (
    <Container
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
