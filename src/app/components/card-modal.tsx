import { Modal, Typography } from '@mui/material';
import Image from 'next/image';
import { CardType, DisplayData } from './card';
import { Container, IconButton } from '@mui/material';
import { act, useState } from 'react';
import { ClickAwayListener } from '@mui/material';
import ArrowBackIosSharpIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIos';
import { DeckSlot } from '../page';
import { ShrineSlot } from '../cardlists/shrines';
import { escape } from 'querystring';

export function CardModal({
  cardType,
  list,
  activeCard,
  setActiveCard,
  onEnter,
}: {
  cardType: CardType;
  list: DisplayData[];
  activeCard: number;
  setActiveCard: (arg0: number) => void;
  onEnter?: (card: any) => void;
}) {
  const [translucent, setTranslucent] = useState(false);

  function moveLeft() {
    setActiveCard(activeCard - 1);
  }

  function moveRight() {
    setActiveCard(activeCard + 1);
  }

  function close() {
    setActiveCard(-1);
  }

  let className = translucent
    ? 'modal-parent translucent'
    : 'modal-parent opaque';

  return (
    <Modal open={activeCard >= 0}>
      <div
        className={className}
        onClick={close}
        onKeyDown={(e) => {
          switch (e.key) {
            case 'Escape':
              close();
              break;
            case 'ArrowLeft':
            case 'Left':
              if (activeCard > 0) moveLeft();
              break;
            case 'ArrowRight':
            case 'Right':
              if (activeCard < list.length - 1) moveRight();
              break;
            case ' ':
              setTranslucent(true);
              break;
            case 'Enter':
              onEnter && onEnter(list[activeCard]);
              break;
          }
        }}
        onKeyUp={(e) => {
          if (e.key === ' ') {
            setTranslucent(false);
          }
        }}
      >
        <div className="spacer"></div>
        <div className="modal-left" onClick={(e) => e.stopPropagation()}>
          <IconButton onClick={moveLeft} disabled={activeCard === 0}>
            <ArrowBackIosSharpIcon></ArrowBackIosSharpIcon>
          </IconButton>
        </div>
        <Container
          className={
            cardType === CardType.Essence ||
            cardType === CardType.ShrineImprovement
              ? 'modal-center unbacked-overlay'
              : 'modal-center'
          }
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={
              '/assets/' +
              cardType +
              '/' +
              (list[activeCard]?.filename || '') +
              '.png'
            }
            alt={list[activeCard]?.name || ''}
            width="739"
            height="1035"
          />
        </Container>
        <div className="modal-right" onClick={(e) => e.stopPropagation()}>
          <IconButton
            onClick={moveRight}
            disabled={activeCard === list.length - 1}
          >
            <ArrowForwardIosSharpIcon></ArrowForwardIosSharpIcon>
          </IconButton>
        </div>
        <div className="spacer"></div>
      </div>
    </Modal>
  );
}

// function

export function DeckModal({
  shrineSlot,
  mainDeck,
  activeCard,
  setActiveCard,
}: {
  shrineSlot: ShrineSlot;
  mainDeck: DeckSlot[];
  activeCard: number;
  setActiveCard: (arg0: number) => void;
}) {
  const [translucent, setTranslucent] = useState(false);

  function moveLeft() {
    setActiveCard(activeCard - 1);
  }

  function moveRight() {
    setActiveCard(activeCard + 1);
  }

  function close() {
    setActiveCard(NaN);
  }

  let image;
  if (Number.isNaN(activeCard)) {
    image = <div></div>; //render nothing; this should never be displayed anyway
  } else {
    if (activeCard === -1) {
      // 4 cases here, both shrine and improvement can be present or missing
      if (shrineSlot.shrineImprovement) {
        image = shrineSlot.shrine ? (
          <div className="overlayed-modal">
            <Image
              src={
                '/assets/' +
                CardType.Shrine +
                '/' +
                shrineSlot.shrine.filename +
                '.png'
              }
              alt={shrineSlot.shrine.name}
              width="739"
              height="1035"
            />
            <Image
              src={
                '/assets/' +
                CardType.ShrineImprovement +
                '/' +
                shrineSlot.shrineImprovement.filename +
                '.png'
              }
              alt={shrineSlot.shrineImprovement.name}
              width="739"
              height="1035"
              className="overlay"
            />
          </div>
        ) : (
          <Image
            className="unbacked-overlay"
            src={
              '/assets/' +
              CardType.ShrineImprovement +
              '/' +
              shrineSlot.shrineImprovement.filename +
              '.png'
            }
            alt={shrineSlot.shrineImprovement.name}
            width="739"
            height="1035"
          />
        );
      } else {
        image = shrineSlot.shrine ? (
          <Image
            src={
              '/assets/' +
              CardType.Shrine +
              '/' +
              shrineSlot.shrine.filename +
              '.png'
            }
            alt={shrineSlot.shrine.name}
            width="739"
            height="1035"
          />
        ) : (
          <Image
            className="logo-card"
            src="/assets/misc/card-shaped-logo.png"
            alt="placeholder"
            width="739"
            height="1035"
          ></Image>
        );
      }
    } else {
      // regular card, not shrine
      const c = mainDeck[activeCard];
      image = c.essence ? (
        <div className="overlayed-modal">
          <Image
            src={
              '/assets/' +
              CardType.BaseCard +
              '/' +
              c.baseCard.filename +
              '.png'
            }
            alt={c.baseCard.name}
            width="739"
            height="1035"
          />
          <Image
            src={
              '/assets/' + CardType.Essence + '/' + c.essence.filename + '.png'
            }
            alt={c.essence.name}
            width="739"
            height="1035"
            className="overlay"
          />
        </div>
      ) : (
        <Image
          src={
            '/assets/' + CardType.BaseCard + '/' + c.baseCard.filename + '.png'
          }
          alt={c.baseCard.name}
          width="739"
          height="1035"
        />
      );
    }
  }

  let className = translucent
    ? 'modal-parent translucent'
    : 'modal-parent opaque';

  return (
    <Modal open={activeCard >= -1}>
      <div
        className={className}
        onClick={close}
        onKeyDown={(e) => {
          switch (e.key) {
            case 'Escape':
              close();
              break;
            case ' ':
              setTranslucent(true);
              break;
            case 'ArrowLeft':
            case 'Left':
              if (activeCard > -1) moveLeft();
              break;
            case 'ArrowRight':
            case 'Right':
              if (activeCard < mainDeck.length - 1) moveRight();
              break;
          }
        }}
        onKeyUp={(e) => {
          if (e.key === ' ') {
            setTranslucent(false);
          }
        }}
      >
        <div className="spacer"></div>
        <div className="modal-left" onClick={(e) => e.stopPropagation()}>
          <IconButton onClick={moveLeft} disabled={activeCard === -1}>
            <ArrowBackIosSharpIcon></ArrowBackIosSharpIcon>
          </IconButton>
        </div>
        <Container
          className="modal-center"
          onClick={(e) => e.stopPropagation()}
        >
          {image}
        </Container>
        <div className="modal-right" onClick={(e) => e.stopPropagation()}>
          <IconButton
            onClick={moveRight}
            disabled={activeCard === mainDeck.length - 1}
          >
            <ArrowForwardIosSharpIcon></ArrowForwardIosSharpIcon>
          </IconButton>
        </div>
        <div className="spacer"></div>
      </div>
    </Modal>
  );
}
