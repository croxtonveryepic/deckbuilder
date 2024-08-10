import { essences } from '../cardlists/essences';
import { Shrine } from '../cardlists/shrines';
import { DeckSlot } from '../page';
import { ShrineSlot } from '../cardlists/shrines';
import { Element } from '../cardlists/base-cards';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { Box, Container, Tooltip } from '@mui/material';

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
      <Container className="color-display">
        <Box className="circle letter">{title.substring(0, 1)}</Box>
        <Container className="color-tracker-icons">
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
        </Container>
      </Container>
    </Tooltip>
  );
}

function manaCircle(num: number) {
  return <Box className="mana-pip circle">{num}</Box>;
}

export function ResourceTracker({
  shrine,
  deck,
}: {
  shrine: Shrine | null;
  deck: DeckSlot[];
}) {
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

  // console.log(costs);
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
    <div className="resource-tracker">
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
        <Container className="curve-display">
          <Box className="circle letter">C</Box>
          <Container className="curve-tracker-icons">{costDisplay}</Container>
        </Container>
      </Tooltip>
    </div>
  );
}
