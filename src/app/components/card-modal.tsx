import { Modal } from '@mui/material';
import Image from 'next/image';
import { CardType } from './card';
import { Container, IconButton } from '@mui/material';
import { useContext, useState } from 'react';
import ArrowBackIosSharpIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIos';
import { DeckSlot } from '../page';
import { ShrineSlot } from '../cardlists/shrines';
import { isAtMax } from '../utils';
import { DeckContext } from './decklist-context';
import { AnyCard } from './drag-context';

export function CardModal({
    cardType,
    list,
    activeCard,
    setActiveCard,
    onEnter,
}: {
    cardType: CardType;
    list: AnyCard[];
    activeCard: number;
    setActiveCard: (arg0: number) => void;
    onEnter?: (card: any) => void;
}) {
    const [translucent, setTranslucent] = useState(false);
    const decklistContext = useContext(DeckContext);

    function moveLeft() {
        setActiveCard(activeCard - 1);
    }

    function moveRight() {
        setActiveCard(activeCard + 1);
    }

    function close() {
        setActiveCard(-1);
    }

    let className = translucent
        ? 'modal-parent translucent'
        : 'modal-parent opaque';

    onEnter = isAtMax(decklistContext, list[activeCard]) ? undefined : onEnter;

    return (
        <Modal open={activeCard >= 0}>
            <div
                className={className}
                onClick={close}
                onWheel={(e) => {
                    if (e.deltaY < 0 && activeCard !== 0) {
                        moveLeft();
                    } else if (e.deltaY > 0 && activeCard !== list.length - 1) {
                        moveRight();
                    }
                }}
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
                            if (activeCard < list.length - 1) moveRight();
                            break;
                        case ' ':
                            setTranslucent(true);
                            break;
                        case 'Enter':
                            onEnter && onEnter(list[activeCard]);
                            break;
                    }
                }}
                onKeyUp={(e) => {
                    if (e.key === ' ') {
                        setTranslucent(false);
                    }
                }}
            >
                <div className="spacer"></div>
                <div
                    className="modal-left"
                    onClick={(e) => e.stopPropagation()}
                >
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
                        src={
                            '/deckbuilder/assets/' +
                            cardType +
                            '/' +
                            (list[activeCard]?.filename || '') +
                            '.png'
                        }
                        alt={list[activeCard]?.name || ''}
                        width="739"
                        height="1035"
                    />
                </Container>
                <div
                    className="modal-right"
                    onClick={(e) => e.stopPropagation()}
                >
                    <IconButton
                        onClick={moveRight}
                        disabled={activeCard === list.length - 1}
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
    const [translucent, setTranslucent] = useState(false);

    let canMoveLeft = false;
    let canMoveRight = false;
    let nextLeft = NaN;
    let nextRight = NaN;
    if (!Number.isNaN(activeCard)) {
        let curr = mainDeck[activeCard];

        canMoveLeft = activeCard !== -1;
        nextLeft = activeCard - 1;
        // skip any that are duplicate of the current card
        while (
            nextLeft > -1 &&
            mainDeck[nextLeft].baseCard?.id === curr.baseCard?.id &&
            mainDeck[nextLeft].essence?.id === curr.essence?.id
        ) {
            nextLeft--;
        }

        nextRight = activeCard + 1;
        if (nextRight !== 0) {
            while (
                nextRight < mainDeck.length &&
                mainDeck[nextRight].baseCard?.id === curr.baseCard?.id &&
                mainDeck[nextRight].essence?.id === curr.essence?.id
            ) {
                nextRight++;
            }
            // need to check if we are in the last "cluster" of cards
        }
        canMoveRight = nextRight !== mainDeck.length;
    }

    function moveLeft() {
        setActiveCard(nextLeft);
    }

    function moveRight() {
        setActiveCard(nextRight);
    }

    console.log('canMoveLeft:', canMoveLeft);
    console.log('nextLeft:', nextLeft);
    console.log('canMoveRight:', canMoveRight);
    console.log('nextRight:', nextRight);

    function close() {
        setActiveCard(NaN);
    }

    let image;
    let c;
    if (Number.isNaN(activeCard)) {
        image = <div></div>; //render nothing; this should never be displayed anyway
    } else {
        if (activeCard === -1) {
            // 4 cases here, both shrine and improvement can be present or missing
            if (shrineSlot.shrineImprovement) {
                image = shrineSlot.shrine ? (
                    <div className="overlayed-modal">
                        <Image
                            src={
                                '/deckbuilder/assets/' +
                                CardType.Shrine +
                                '/' +
                                shrineSlot.shrine.filename +
                                '.png'
                            }
                            alt={shrineSlot.shrine.name}
                            width="739"
                            height="1035"
                        />
                        <Image
                            src={
                                '/deckbuilder/assets/' +
                                CardType.ShrineImprovement +
                                '/' +
                                shrineSlot.shrineImprovement.filename +
                                '.png'
                            }
                            alt={shrineSlot.shrineImprovement.name}
                            width="739"
                            height="1035"
                            className="overlay"
                        />
                    </div>
                ) : (
                    <Image
                        className="unbacked-overlay"
                        src={
                            '/deckbuilder/assets/' +
                            CardType.ShrineImprovement +
                            '/' +
                            shrineSlot.shrineImprovement.filename +
                            '.png'
                        }
                        alt={shrineSlot.shrineImprovement.name}
                        width="739"
                        height="1035"
                    />
                );
            } else {
                image = shrineSlot.shrine ? (
                    <Image
                        src={
                            '/deckbuilder/assets/' +
                            CardType.Shrine +
                            '/' +
                            shrineSlot.shrine.filename +
                            '.png'
                        }
                        alt={shrineSlot.shrine.name}
                        width="739"
                        height="1035"
                    />
                ) : (
                    <Image
                        className="logo-card"
                        src="/deckbuilder/assets/misc/card-shaped-logo.png"
                        alt="placeholder"
                        width="739"
                        height="1035"
                    ></Image>
                );
            }
        } else {
            // regular card, not shrine
            c = mainDeck[activeCard];
            if (c.baseCard) {
                image = c.essence ? (
                    <div className="overlayed-modal">
                        <Image
                            src={
                                '/deckbuilder/assets/' +
                                CardType.BaseCard +
                                '/' +
                                c.baseCard.filename +
                                '.png'
                            }
                            alt={c.baseCard.name}
                            width="739"
                            height="1035"
                        />
                        <Image
                            src={
                                '/deckbuilder/assets/' +
                                CardType.Essence +
                                '/' +
                                c.essence.filename +
                                '.png'
                            }
                            alt={c.essence.name}
                            width="739"
                            height="1035"
                            className="overlay"
                        />
                    </div>
                ) : (
                    <Image
                        src={
                            '/deckbuilder/assets/' +
                            CardType.BaseCard +
                            '/' +
                            c.baseCard.filename +
                            '.png'
                        }
                        alt={c.baseCard.name}
                        width="739"
                        height="1035"
                    />
                );
            } else {
                image = (
                    <Image
                        src={
                            '/deckbuilder/assets/' +
                            CardType.Essence +
                            '/' +
                            c.essence!.filename +
                            '.png'
                        }
                        alt={c.essence!.name}
                        width="739"
                        height="1035"
                        className="unbacked-overlay"
                    ></Image>
                );
            }
        }
    }

    let className = translucent
        ? 'modal-parent translucent'
        : 'modal-parent opaque';

    return (
        <Modal open={activeCard >= -1}>
            <div
                className={className}
                onClick={close}
                onWheel={(e) => {
                    if (e.deltaY < 0 && canMoveLeft) {
                        moveLeft();
                    } else if (e.deltaY > 0 && canMoveRight) {
                        moveRight();
                    }
                }}
                onKeyDown={(e) => {
                    switch (e.key) {
                        case 'Escape':
                            close();
                            break;
                        case ' ':
                            setTranslucent(true);
                            break;
                        case 'ArrowLeft':
                        case 'Left':
                            if (canMoveLeft) moveLeft();
                            break;
                        case 'ArrowRight':
                        case 'Right':
                            if (canMoveRight) moveRight();
                            break;
                    }
                }}
                onKeyUp={(e) => {
                    if (e.key === ' ') {
                        setTranslucent(false);
                    }
                }}
            >
                <div className="spacer"></div>
                <div
                    className="modal-left"
                    onClick={(e) => e.stopPropagation()}
                >
                    <IconButton onClick={moveLeft} disabled={!canMoveLeft}>
                        <ArrowBackIosSharpIcon></ArrowBackIosSharpIcon>
                    </IconButton>
                </div>
                <Container
                    className={
                        c?.baseCard
                            ? 'modal-center'
                            : 'modal-center unbacked-overlay'
                    }
                    onClick={(e) => e.stopPropagation()}
                >
                    {image}
                </Container>
                <div
                    className="modal-right"
                    onClick={(e) => e.stopPropagation()}
                >
                    <IconButton onClick={moveRight} disabled={!canMoveRight}>
                        <ArrowForwardIosSharpIcon></ArrowForwardIosSharpIcon>
                    </IconButton>
                </div>
                <div className="spacer"></div>
            </div>
        </Modal>
    );
}
