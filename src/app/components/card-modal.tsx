import { Modal, Typography } from '@mui/material';
import Image from 'next/image';
import { CardType } from './card';
import { Container, IconButton } from '@mui/material';
import { act, useState } from 'react';
import { ClickAwayListener } from '@mui/material';
import ArrowBackIosSharpIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIos';
import { DeckSlot, ShrineSlot } from '../page';
import { escape } from 'querystring';

export function CardModal({
  cardType,
  cardList,
  activeCard,
  setActiveCard,
  onEnter,
}: {
  cardType: CardType;
  cardList: string[];
  activeCard: number;
  setActiveCard: (arg0: number) => void;
  onEnter?: (arg0: string) => void;
}) {
  function moveLeft() {
    setActiveCard(activeCard - 1);
  }

  function moveRight() {
    setActiveCard(activeCard + 1);
  }

  function close() {
    setActiveCard(-1);
  }

  return (
    <Modal open={activeCard >= 0}>
      <div
        className="modal-parent"
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
              if (activeCard < cardList.length - 1) moveRight();
              break;
            case ' ':
              break;
            case 'Enter':
              onEnter && onEnter(cardList[activeCard]);
              break;
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
            src={'/assets/' + cardType + '/' + cardList[activeCard] + '.png'}
            alt={cardList[activeCard]}
            width="739"
            height="1035"
          />
        </Container>
        <div className="modal-right" onClick={(e) => e.stopPropagation()}>
          <IconButton
            onClick={moveRight}
            disabled={activeCard === cardList.length - 1}
          >
            <ArrowForwardIosSharpIcon></ArrowForwardIosSharpIcon>
          </IconButton>
        </div>
        <div className="spacer"></div>
      </div>
    </Modal>
  );
}

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
  function moveLeft() {
    setActiveCard(activeCard - 1);
  }

  function moveRight() {
    setActiveCard(activeCard + 1);
  }

  function close() {
    setActiveCard(NaN);
  }

  //what to render for the shrine slot
  let path, alt, className;
  if (shrineSlot.shrine === '') {
    path = '/assets/misc/card-shaped-logo.png';
    alt = 'placeholder';
    className = 'logo-card';
  } else {
    alt = shrineSlot.shrine;
    className = '';
  }

  let image;
  if (Number.isNaN(activeCard)) {
    image = <div></div>; //render nothing; this should never be displayed anyway
  } else {
    if (activeCard === -1) {
      // 4 cases here, both shrine and improvement can be present or missing
      if (shrineSlot.shrineImprovement === '') {
        image =
          shrineSlot.shrine === '' ? (
            <Image
              className="logo-card"
              src="/assets/misc/card-shaped-logo.png"
              alt="placeholder"
              width="739"
              height="1035"
            ></Image>
          ) : (
            <Image
              src={
                '/assets/' + CardType.Shrine + '/' + shrineSlot.shrine + '.png'
              }
              alt={shrineSlot.shrine}
              width="739"
              height="1035"
            />
          );
      } else {
        image =
          shrineSlot.shrine === '' ? (
            <Image
              className="unbacked-overlay"
              src={
                '/assets/' +
                CardType.ShrineImprovement +
                '/' +
                shrineSlot.shrineImprovement +
                '.png'
              }
              alt={shrineSlot.shrineImprovement}
              width="739"
              height="1035"
            />
          ) : (
            <div className="overlayed-modal">
              <Image
                src={
                  '/assets/' +
                  CardType.Shrine +
                  '/' +
                  shrineSlot.shrine +
                  '.png'
                }
                alt={shrineSlot.shrine}
                width="739"
                height="1035"
              />
              <Image
                src={
                  '/assets/' +
                  CardType.ShrineImprovement +
                  '/' +
                  shrineSlot.shrineImprovement +
                  '.png'
                }
                alt={shrineSlot.shrineImprovement}
                width="739"
                height="1035"
                className="overlay"
              />
            </div>
          );
      }
    } else {
      const c = mainDeck[activeCard];
      image =
        c.essence === '' ? (
          <Image
            src={'/assets/' + CardType.BaseCard + '/' + c.baseCard + '.png'}
            alt={c.baseCard}
            width="739"
            height="1035"
          />
        ) : (
          <div className="overlayed-modal">
            <Image
              src={'/assets/' + CardType.BaseCard + '/' + c.baseCard + '.png'}
              alt={c.baseCard}
              width="739"
              height="1035"
            />
            <Image
              src={'/assets/' + CardType.Essence + '/' + c.essence + '.png'}
              alt={c.essence}
              width="739"
              height="1035"
              className="overlay"
            />
          </div>
        );
    }
  }

  return (
    <Modal open={activeCard >= -1}>
      <div
        className="modal-parent"
        onClick={close}
        onKeyDown={(e) => {
          switch (e.key) {
            case 'Escape':
              close();
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
