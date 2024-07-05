'use client';
import { Box, Container, MenuItem, Select } from '@mui/material';
import {
  ShrineList,
  ShrineImprovementList,
  BaseCardList,
  EssenceList,
} from './components/card-list';
import { baseCards, BaseCard, Element } from './cardlists/base-cards';
import { shrines, Shrine } from './cardlists/shrines';
import { essences, Essence } from './cardlists/essences';
import {
  shrineImprovements,
  ShrineImprovement,
} from './cardlists/shrine-improvements';
import { CardType, ImprovedShrine } from './components/card';
import { useState } from 'react';
import Card from './components/card';
import { Deck } from './components/card-list';
import { idGenerator } from './utils';
import Image from 'next/image';
import { DndContext } from '@dnd-kit/core';

export class ShrineSlot {
  shrine: Shrine | null;
  shrineImprovement: ShrineImprovement | null;

  constructor(shrine: Shrine | null, improvement: ShrineImprovement | null) {
    this.shrine = shrine;
    this.shrineImprovement = improvement;
  }
}

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
  const [shrine, setShrine] = useState(new ShrineSlot(null, null));
  const [deck, setDeck] = useState(new Array<DeckSlot>());

  function addBaseCard(card: string) {
    setDeck([...deck, new DeckSlot(getCardByFilename(card, baseCards), null)]);
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

  function getCardByFilename(filename: string, list: any[]) {
    return list.find((obj) => {
      return obj.filename === filename;
    });
  }

  function applyEssence(id: number, essence: string) {
    setDeck(
      deck.map((ds) => {
        if (ds.id === id) {
          return { ...ds, essence: getCardByFilename(essence, essences) };
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
              setShrine(
                new ShrineSlot(
                  getCardByFilename(s, shrines),
                  shrine.shrineImprovement
                )
              )
            }
            setShrineImprovement={(si) =>
              setShrine(
                new ShrineSlot(
                  shrine.shrine,
                  getCardByFilename(si, shrineImprovements)
                )
              )
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
              shrines={shrines}
              onClickShrine={(s) => setShrine(new ShrineSlot(s, null))}
            ></ShrineList>
          ) : (
            <BaseCardList
              cards={baseCards}
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
              shrineImprovements={shrineImprovements}
              onClickShrineImprovement={(si) =>
                setShrine(
                  new ShrineSlot(
                    shrine.shrine,
                    getCardByFilename(si, shrineImprovements)
                  )
                )
              }
            ></ShrineImprovementList>
          ) : (
            <EssenceList essences={essences}></EssenceList>
          )}
        </Container>
      </DndContext>
    </Box>
  );
}
