import Image from 'next/image';
import { Container } from '@mui/material';
import { ShrineSlot } from '../page';
import { useDroppable, useDraggable } from '@dnd-kit/core';
import { green } from '@mui/material/colors';

export enum CardType {
  Shrine = 'shrines',
  BaseCard = 'base-cards',
  ShrineImprovement = 'shrine-improvements',
  Essence = 'essences',
  Placeholder = 'placeholder',
}

export default function Card({
  card_name,
  card_type,
  onClick,
  onContextMenu,
}: {
  card_name: string;
  card_type: CardType;
  onClick?: (arg0: string) => void;
  onContextMenu?: (arg0: string) => void;
}) {
  let path, alt, className;
  if (card_type === CardType.Placeholder) {
    path = '/assets/misc/card-shaped-logo.png';
    alt = 'placeholder';
    className = 'card unbacked-overlay';
  } else {
    path = '/assets/' + card_type + '/' + card_name + '.png';
    alt = card_name;
    className =
      card_type === CardType.Essence || card_type === CardType.ShrineImprovement
        ? 'card unbacked-overlay'
        : 'card';
  }
  return (
    <div
      className={className}
      draggable
      onDragStart={(e) => {
        // e.dataTransfer.dropEffect = 'move';
        e.dataTransfer.setData('card', card_name);
        e.dataTransfer.setData('type', card_type);
      }}
    >
      <Image
        src={path}
        alt={card_name}
        width="145"
        height="203"
        onClick={(e) => onClick && onClick(card_name)}
        onContextMenu={(e) => {
          e.preventDefault();
          onContextMenu && onContextMenu(card_name);
        }}
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
        src={'/assets/shrines/' + shrineSlot.shrine + '.png'}
        alt={shrineSlot.shrine}
        width="145"
        height="203"
      />
      <Image
        className="overlay"
        src={
          '/assets/shrine-improvements/' + shrineSlot.shrineImprovement + '.png'
        }
        alt={shrineSlot.shrineImprovement}
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
  card: string;
  essence: string;
  onClick?: () => void;
  onContextMenu?: () => void;
}) {
  return (
    <Container className="card">
      <Image
        className="base-card"
        src={'/assets/base-cards/' + card + '.png'}
        alt={card}
        width="145"
        height="203"
      />
      <Image
        className="overlay"
        src={'/assets/essences/' + essence + '.png'}
        alt={essence}
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
