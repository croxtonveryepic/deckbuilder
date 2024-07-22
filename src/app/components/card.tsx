import Image from 'next/image';
import { Container } from '@mui/material';
import { ShrineSlot } from '../page';
import { useDroppable, useDraggable } from '@dnd-kit/core';
import { green } from '@mui/material/colors';
import { BaseCard } from '../cardlists/base-cards';
import { Essence } from '../cardlists/essences';
import type { ComponentPropsWithoutRef } from 'react';
import { doc } from 'prettier';
import { ClassNames } from '@emotion/react';

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

interface CardProps extends ComponentPropsWithoutRef<'div'> {
  card: DisplayData;
  onClick?: (card: any) => void;
  onContextMenu?: (card: any) => void;
  className?: string;
}

export default function Card({
  card,
  onClick,
  onContextMenu,
  className = '',
  ...rest
}: CardProps) {
  let path, alt, cn, priority;
  if (card.type === CardType.Placeholder) {
    path = '/assets/misc/card-shaped-logo.png';
    alt = 'placeholder';
    cn = 'card unbacked-overlay';
    priority = true;
  } else {
    path = '/assets/' + card.type + '/' + card.filename + '.png';
    alt = card.name;
    cn =
      card.type === CardType.Essence || card.type === CardType.ShrineImprovement
        ? 'card unbacked-overlay'
        : 'card';
  }
  return (
    <Container
      className={cn + ' ' + className}
      draggable
      onDragStart={(e) => {
        // e.dataTransfer.dropEffect = 'move';
        e.dataTransfer.setData('card', card.filename);
        e.dataTransfer.setData('type', card.type);
      }}
      {...rest}
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
    </Container>
  );
}

interface ShrineProps extends ComponentPropsWithoutRef<'div'> {
  shrineSlot: ShrineSlot;
  onClick?: () => void;
  onContextMenu?: () => void;
  className?: string;
}

export function ImprovedShrine({
  shrineSlot,
  onClick,
  onContextMenu,
  className = '',
  ...rest
}: ShrineProps) {
  className += ' card';
  return (
    <Container className={className} {...rest}>
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

interface ImbuedCardProps extends ComponentPropsWithoutRef<'div'> {
  card: BaseCard;
  essence: Essence;
  onClick?: () => void;
  onContextMenu?: () => void;
  className?: string;
}

export function ImbuedCard({
  card,
  essence,
  onClick,
  onContextMenu,
  className = '',
  ...rest
}: ImbuedCardProps) {
  className += ' card';
  return (
    <Container className={className} {...rest}>
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
