'use client';
import { Box, Container, MenuItem, Select } from '@mui/material';
import {
  ShrineList,
  ShrineImprovementList,
  BaseCardList,
  EssenceList,
} from './components/card-list';
import { base_cards } from './cardlists/base-cards';
import { shrines } from './cardlists/shrines';
import { essences } from './cardlists/essences';
import { shrine_improvements } from './cardlists/shrine-improvements';
import { CardType, ImprovedShrine } from './components/card';
import { useState } from 'react';
import Card from './components/card';
import { Deck } from './components/card-list';
import { idGenerator } from './utils';
import Image from 'next/image';
import { DndContext } from '@dnd-kit/core';

export class ShrineSlot {
  shrine: string;
  shrineImprovement: string;

  constructor(shrine: string, improvement: string) {
    this.shrine = shrine;
    this.shrineImprovement = improvement;
  }
}

export class DeckSlot {
  baseCard: string;
  essence: string;
  id: number;

  constructor(baseCard: string, essence: string) {
    this.baseCard = baseCard;
    this.essence = essence;
    this.id = newId();
  }
}

const newId = idGenerator();

export default function Home() {
  const [shrineMode, setShrineMode] = useState(true);
  const [shrine, setShrine] = useState(new ShrineSlot('', ''));
  const [deck, setDeck] = useState(new Array<DeckSlot>());

  function addBaseCard(card: string) {
    setDeck([...deck, new DeckSlot(card, '')]);
  }

  function toggleShrineMode() {
    setShrineMode(!shrineMode);
  }

  function removeLayer(id: number) {
    const c = deck.find((ds) => ds.id === id);
    if (!c) {
      console.warn('missing card');
    } else if (c.essence === '') {
      setDeck(
        deck.filter((card) => {
          return id !== card.id;
        })
      );
    } else {
      setDeck(
        deck.map((ds) => {
          if (ds.id === id) {
            return { ...ds, essence: '' };
          } else {
            return ds;
          }
        })
      );
    }
  }

  function applyEssence(id: number, essence: string) {
    setDeck(
      deck.map((ds) => {
        if (ds.id === id) {
          return { ...ds, essence: essence };
        } else {
          return ds;
        }
      })
    );
  }

  return (
    <Box>
      <DndContext>
        <Container className="deck-container">
          <Container className="deck-widget-container">
            <button onClick={toggleShrineMode}>Toggle Shrine Mode</button>
          </Container>
          <Deck
            shrineSlot={shrine}
            mainDeck={deck}
            onClickDeckSlot={removeLayer}
            applyEssence={applyEssence}
            setShrine={(s) =>
              setShrine(new ShrineSlot(s, shrine.shrineImprovement))
            }
            setShrineImprovement={(si) =>
              setShrine(new ShrineSlot(shrine.shrine, si))
            }
          ></Deck>
        </Container>
        <Container className="base-card-container">
          <Container className="base-card-widget-container">
            button stuff
            {/* <Select label="Type" value={''}>
              <MenuItem value={'Unit'}>Unit</MenuItem>
              <MenuItem value={'Event'}>Event</MenuItem>
              <MenuItem value={'Item'}>Item</MenuItem>
              <MenuItem value={'Structure'}>Structure</MenuItem>
            </Select> */}
          </Container>
          {shrineMode ? (
            <ShrineList
              card_list={shrines}
              onClickShrine={(s) => setShrine(new ShrineSlot(s, ''))}
            ></ShrineList>
          ) : (
            <BaseCardList
              card_list={base_cards}
              onClickBaseCard={(card_name) => addBaseCard(card_name)}
            ></BaseCardList>
          )}
        </Container>
        <Container className="overlay-card-container">
          <Container className="overlay-card-widget-container">
            button stuff
          </Container>
          {shrineMode ? (
            <ShrineImprovementList
              card_list={shrine_improvements}
              onClickShrineImprovement={(si) =>
                setShrine(new ShrineSlot(shrine.shrine, si))
              }
            ></ShrineImprovementList>
          ) : (
            <EssenceList essence_list={essences}></EssenceList>
          )}
        </Container>
      </DndContext>
    </Box>
  );
}
