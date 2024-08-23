import { Shrine, ShrineSlot } from '../cardlists/shrines';
import { DeckSlot } from '../page';
import { Element } from '../cardlists/enums';
import Image from 'next/image';
import {
  Box,
  Container,
  IconButton,
  Switch,
  Tooltip,
  Typography,
} from '@mui/material';
import { LibraryBooks, SaveAs } from '@mui/icons-material';
import { LoadDeckModal, SaveDeckModal } from './deck-encoder';
import { useState } from 'react';
import { TernaryButton } from './ternary-button';

class Colors {
  air = 0;
  dark = 0;
  earth = 0;
  fire = 0;
  light = 0;
  water = 0;
  neutral = 0;

  record(list: Element[]) {
    for (let i = 0; i < list.length; i++) {
      switch (list[i]) {
        case Element.Air:
          this.air++;
          break;
        case Element.Dark:
          this.dark++;
          break;
        case Element.Earth:
          this.earth++;
          break;
        case Element.Fire:
          this.fire++;
          break;
        case Element.Light:
          this.light++;
          break;
        case Element.Water:
          this.water++;
          break;
        case Element.Neutral:
          this.neutral++;
          break;
      }
    }
  }
}

const wh = 20;

function ColorDisplay({ title, colors }: { title: string; colors: Colors }) {
  return (
    <Tooltip title={title}>
      <div className="color-display">
        <div className="circle letter">{title.substring(0, 1)}</div>
        <div className="color-tracker-icons">
          {colors.air > 0 && (
            <span style={{ order: -colors.air }}>
              <Image
                src="/assets/misc/airwhiteongrey.png"
                alt="Air Icon"
                width={wh}
                height={wh}
              ></Image>
              {colors.air}
            </span>
          )}
          {colors.dark > 0 && (
            <span style={{ order: -colors.dark }}>
              <Image
                src="/assets/misc/darkwhiteonpurple.png"
                alt="Dark Icon"
                width={wh}
                height={wh}
              ></Image>
              {colors.dark}
            </span>
          )}
          {colors.earth > 0 && (
            <span style={{ order: -colors.earth }}>
              <Image
                src="/assets/misc/earth2whiteongreen.png"
                alt="Earth Icon"
                width={wh}
                height={wh}
              ></Image>
              {colors.earth}
            </span>
          )}
          {colors.fire > 0 && (
            <span style={{ order: -colors.fire }}>
              <Image
                src="/assets/misc/firewhiteonred.png"
                alt="Fire Icon"
                width={wh}
                height={wh}
              ></Image>
              {colors.fire}
            </span>
          )}
          {colors.light > 0 && (
            <span style={{ order: -colors.light }}>
              <Image
                src="/assets/misc/lightwhiteonyellow.png"
                alt="Light Icon"
                width={wh}
                height={wh}
              ></Image>
              {colors.light}
            </span>
          )}
          {colors.water > 0 && (
            <span style={{ order: -colors.water }}>
              <Image
                src="/assets/misc/waterwhiteonblue.png"
                alt="Water Icon"
                width={wh}
                height={wh}
              ></Image>
              {colors.water}
            </span>
          )}
        </div>
      </div>
    </Tooltip>
  );
}

function manaCircle(num: number) {
  return <Box className="mana-pip circle">{num}</Box>;
}

export function DeckTracker({
  shrine,
  setShrine,
  deck,
  setDeck,
  shrineMode,
  toggleShrineMode,
}: {
  shrine: ShrineSlot;
  setShrine: (ss: ShrineSlot) => void;
  deck: DeckSlot[];
  setDeck: (deck: DeckSlot[]) => void;
  shrineMode: boolean;
  toggleShrineMode: () => void;
}) {
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

  let numCards = deck.length;
  let numEssences = 0;
  let resources = new Colors();
  let souls = new Colors();
  let identities = new Colors();
  let costs = new Map<number, number>([
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0],
    [6, 0],
  ]);

  for (const ds of deck) {
    let r, s, i;
    s = [...ds.baseCard.pips];
    if (ds.essence) {
      numEssences++;
      r = ds.essence.resources;
      s.push(...ds.essence.cost);
    } else {
      r = [] as Element[];
    }
    i = [...new Set(s)];
    resources.record(r);
    souls.record(s);
    identities.record(i);
    const cost = ds.baseCard.cost + (ds.essence?.cost.length || 0);
    costs.set(cost, (costs.get(cost) as any as number) + 1);
  }

  const costDisplay = [] as any;
  costs.forEach((count, cost) => {
    costDisplay.push(
      <span key={cost}>
        {manaCircle(cost)}
        {count}
      </span>
    );
  });

  return (
    <div className="deck-widget-container">
      <TernaryButton
        state={shrineMode}
        labelOne="Shrine Mode"
        labelTwo="Deck Mode"
        setState={toggleShrineMode}
      ></TernaryButton>
      {/* <div className="shrine-switch">
        <Typography>Shrine</Typography>
        <Switch checked={!shrineMode} onChange={toggleShrineMode} />
        <Typography>Deck</Typography>
      </div> */}
      {/* save deck */}
      <div className="modals">
        <IconButton onClick={toggleSaveDeckModal}>
          <SaveAs></SaveAs>
        </IconButton>
        <SaveDeckModal
          open={saveDeckModal}
          toggle={toggleSaveDeckModal}
          deck={deck}
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
      </div>
      <div className="card-counts">
        <div>
          <span className={shrine.shrine ? 'valid' : 'warn'}>
            {shrine.shrine ? '1/1 Shrine' : '0/1 Shrine'}
          </span>
          <span className={shrine.shrineImprovement ? 'valid' : 'warn'}>
            {shrine.shrineImprovement ? '1/1 Improvement' : '0/1 Improvement'}
          </span>
        </div>
        <div>
          <span className={numCards === 50 ? 'valid' : 'warn'}>
            {numCards + '/50 Cards'}
          </span>
          <span className={numEssences === 50 ? 'valid' : 'warn'}>
            {numEssences + '/50 Essences'}
          </span>
        </div>
      </div>
      <ColorDisplay
        title="Souls (Total resource pips in the costs of cards)"
        colors={souls}
      ></ColorDisplay>
      <ColorDisplay
        title="Resources (Number of Essences that provide each resources; multicolor counts for both)"
        colors={resources}
      ></ColorDisplay>
      <ColorDisplay
        title="Identities (For each Element, number of cards having that color identity, after Essence cost increases)"
        colors={identities}
      ></ColorDisplay>
      <Tooltip title="Curve (Numerical costs of cards)">
        <div className="curve-display">
          <Box className="circle letter">C</Box>
          <div className="curve-tracker-icons">{costDisplay}</div>
        </div>
      </Tooltip>
    </div>
  );
}
