import Image from 'next/image';
import { Container } from '@mui/material';
import { ShrineSlot } from '../page';
import { useDroppable, useDraggable } from '@dnd-kit/core';
import { green } from '@mui/material/colors';
import { BaseCard } from '../cardlists/base-cards';
import { Essence } from '../cardlists/essences';

export enum CardType {
  Shrine = 'shrines',
  BaseCard = 'base-cards',
  ShrineImprovement = 'shrine-improvements',
  Essence = 'essences',
  Placeholder = 'placeholder',
}

export class DisplayData {
  name: string;
  filename: string;
  type: CardType;
}

export default function Card({
  card,
  onClick,
  onContextMenu,
}: {
  card: DisplayData;
  onClick?: (card: any) => void;
  onContextMenu?: (card: any) => void;
}) {
  let path, alt, className, priority;
  if (card.type === CardType.Placeholder) {
    path = '/assets/misc/card-shaped-logo.png';
    alt = 'placeholder';
    className = 'card unbacked-overlay';
    priority = true;
  } else {
    path = '/assets/' + card.type + '/' + card.filename + '.png';
    alt = card.name;
    className =
      card.type === CardType.Essence || card.type === CardType.ShrineImprovement
        ? 'card unbacked-overlay'
        : 'card';
  }
  return (
    <div
      className={className}
      draggable
      onDragStart={(e) => {
        // e.dataTransfer.dropEffect = 'move';
        e.dataTransfer.setData('card', card.filename);
        e.dataTransfer.setData('type', card.type);
      }}
    >
      <Image
        src={path}
        alt={card.name}
        width="145"
        height="203"
        onClick={(e) => onClick && onClick(card)}
        onContextMenu={(e) => {
          e.preventDefault();
          onContextMenu && onContextMenu(card);
        }}
        priority={priority}
      />
    </div>
  );
}

export function ImprovedShrine({
  shrineSlot,
  onClick,
  onContextMenu,
}: {
  shrineSlot: ShrineSlot;
  onClick?: () => void;
  onContextMenu?: () => void;
}) {
  return (
    <Container className="card">
      <Image
        className="base-card"
        src={'/assets/shrines/' + shrineSlot.shrine?.filename + '.png'}
        alt={shrineSlot.shrine?.name || ''}
        width="145"
        height="203"
      />
      <Image
        className="overlay"
        src={
          '/assets/shrine-improvements/' +
          shrineSlot.shrineImprovement?.filename +
          '.png'
        }
        alt={shrineSlot.shrineImprovement?.name || ''}
        width="145"
        height="203"
        onClick={(e) => onClick && onClick()}
        onContextMenu={(e) => {
          e.preventDefault();
          onContextMenu && onContextMenu();
        }}
      />
    </Container>
  );
}

export function ImbuedCard({
  card,
  essence,
  onClick,
  onContextMenu,
}: {
  card: BaseCard;
  essence: Essence;
  onClick?: () => void;
  onContextMenu?: () => void;
}) {
  return (
    <Container className="card">
      <Image
        className="base-card"
        src={'/assets/base-cards/' + card.filename + '.png'}
        alt={card.name}
        width="145"
        height="203"
      />
      <Image
        className="overlay"
        src={'/assets/essences/' + essence.filename + '.png'}
        alt={essence.name}
        width="145"
        height="203"
        onClick={(e) => onClick && onClick()}
        onContextMenu={(e) => {
          e.preventDefault();
          onContextMenu && onContextMenu();
        }}
      />
    </Container>
  );
}
