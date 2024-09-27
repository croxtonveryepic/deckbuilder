import Image from 'next/image';
import { Container } from '@mui/material';
import { ShrineSlot } from '../cardlists/shrines';
import { BaseCard } from '../cardlists/base-cards';
import { Essence } from '../cardlists/essences';
import type { ComponentPropsWithoutRef } from 'react';
import { useContext } from 'react';
import { AnyCard, AlertPickup } from './drag-context';
import { ConditionalDraggable } from './conditional-draggable';
import { ShrineImprovement } from '../cardlists/shrine-improvements';

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
  card: AnyCard;
  onClick?: (card: any) => void;
  onContextMenu?: (card: any) => void;
  className?: string;
  disabled?: boolean;
  cardSlotId?: number;
}

export function Card({
  card,
  onClick,
  onContextMenu,
  className = '',
  disabled = false,
  cardSlotId = NaN,
  ...rest
}: CardProps) {
  const pickup = useContext(AlertPickup);

  let path, alt, cn, priority;
  if (card.type === CardType.Placeholder) {
    path = card.filename;
    alt = card.name;
    cn = 'card unbacked-overlay';
    priority = true;
  } else {
    path = '/deckbuilder/assets/' + card.type + '/' + card.filename + '.png';
    alt = card.name;
    cn =
      card.type === CardType.Essence || card.type === CardType.ShrineImprovement
        ? 'card unbacked-overlay'
        : 'card';
  }
  if (disabled) {
    cn += ' greyed';
    onClick = undefined;
  }
  let dragProps = new ConditionalDraggable(
    !disabled,
    (e) => pickup({ card: card, id: cardSlotId }),
    (e) => pickup(null)
  );
  return (
    <div className={cn + ' ' + className} {...dragProps} {...rest}>
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
  const pickup = useContext(AlertPickup);
  className += ' card';
  return (
    <Container className={className} {...rest}>
      <div>
        <Image
          className="base-card"
          src={
            '/deckbuilder/assets/shrines/' +
            shrineSlot.shrine?.filename +
            '.png'
          }
          alt={shrineSlot.shrine?.name || ''}
          width="145"
          height="203"
        />
      </div>
      <div
        draggable
        onDragStart={(e) => {
          pickup({
            card: shrineSlot.shrineImprovement as ShrineImprovement,
            id: 1,
          });
        }}
        onDragEnd={(e) => {
          pickup(null);
        }}
      >
        <Image
          className="overlay"
          src={
            '/deckbuilder/assets/shrine-improvements/' +
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
      </div>
    </Container>
  );
}

interface ImbuedCardProps extends ComponentPropsWithoutRef<'div'> {
  card: BaseCard;
  essence: Essence;
  onClick?: () => void;
  onContextMenu?: () => void;
  className?: string;
  cardSlotId: number;
}

export function ImbuedCard({
  card,
  essence,
  onClick,
  onContextMenu,
  className = '',
  cardSlotId,
  ...rest
}: ImbuedCardProps) {
  const pickup = useContext(AlertPickup);
  className += ' card';
  return (
    <Container className={className} {...rest}>
      <Image
        className="base-card"
        src={'/deckbuilder/assets/base-cards/' + card.filename + '.png'}
        alt={card.name}
        width="145"
        height="203"
      />
      <Image
        className="overlay"
        src={'/deckbuilder/assets/essences/' + essence.filename + '.png'}
        alt={essence.name}
        width="145"
        height="203"
        onClick={(e) => onClick && onClick()}
        onContextMenu={(e) => {
          e.preventDefault();
          onContextMenu && onContextMenu();
        }}
        draggable
        onDragStart={(e) => {
          pickup({ card: essence, id: cardSlotId });
        }}
        onDragEnd={(e) => {
          pickup(null);
        }}
      />
    </Container>
  );
}
