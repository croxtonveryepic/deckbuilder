import { essences } from '../cardlists/essences';
import { Shrine } from '../cardlists/shrines';
import { DeckSlot, ShrineSlot } from '../page';
import { Element } from '../cardlists/base-cards';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { Container } from '@mui/material';

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
    <Container className="color-display">
      <Container className="title">{title}</Container>
      <Container className="color-tracker-icons">
        {colors.air > 0 && (
          <span>
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
          <span>
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
          <span>
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
          <span>
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
          <span>
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
          <span>
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
  );
}

export function ResourceTracker({
  shrine,
  deck,
}: {
  shrine: Shrine | null;
  deck: DeckSlot[];
}) {
  let resources = new Colors();
  let costs = new Colors();
  let identities = new Colors();

  for (const ds of deck) {
    let r, c, i;
    c = [...ds.baseCard.pips];
    if (ds.essence) {
      r = ds.essence.resources;
      c.push(...ds.essence.cost);
    } else {
      r = [] as Element[];
    }
    i = [...new Set(c)];
    resources.record(r);
    costs.record(c);
    identities.record(i);
  }

  return (
    <div className="resource-tracker">
      <ColorDisplay title="Resources" colors={resources}></ColorDisplay>
      <ColorDisplay title="Costs" colors={costs}></ColorDisplay>
      <ColorDisplay title="Identities" colors={identities}></ColorDisplay>
    </div>
  );
}
