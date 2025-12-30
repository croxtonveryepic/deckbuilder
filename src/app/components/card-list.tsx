import { Container, Grid, IconButton } from '@mui/material';
import { Card } from './card';
import { CardType } from './card';
import { ImprovedShrine, ImbuedCard } from './card';
import { DeckSlot } from '../page';
import { ShrineSlot } from '../cardlists/shrines';
import { CardModal, DeckModal } from './card-modal';
import { CSSProperties, useContext, useState } from 'react';
import { Shrine } from '../cardlists/shrines';
import { ShrineImprovement } from '../cardlists/shrine-improvements';
import { BaseCard } from '../cardlists/base-cards';
import { Essence } from '../cardlists/essences';
import { CardBack, HeldCard, Placeholder } from './drag-context';
import { ConditionalDroppable } from './conditional-droppable';
import { DeckContext } from './decklist-context';
import { ConditionalDragEnterLeave } from './conditional-drag-enter-leave';
import { isAtMax } from '../utils';

export function ShrineList({
    shrines,
    onClickShrine,
    style,
}: {
    shrines: Shrine[];
    onClickShrine: (shrine: Shrine) => void;
    style?: CSSProperties;
}) {
    const [modalCard, setModalCard] = useState(-1);
    const decklistContext = useContext(DeckContext);

    function openModal(shrine: Shrine) {
        setModalCard(shrines.indexOf(shrine));
    }

    const images = shrines.map((shrine) => (
        <Grid item key={shrine.filename}>
            <Card
                card={shrine}
                onClick={onClickShrine}
                onContextMenu={openModal}
                disabled={isAtMax(decklistContext, shrine)}
            ></Card>
        </Grid>
    ));

    return (
        <Container className="base-card-list-container" style={style}>
            <CardModal
                cardType={CardType.Shrine}
                list={shrines}
                activeCard={modalCard}
                setActiveCard={setModalCard}
                onEnter={onClickShrine}
            ></CardModal>
            <Grid container>{images}</Grid>
        </Container>
    );
}

export function ShrineImprovementList({
    shrineImprovements,
    onClickShrineImprovement,
}: {
    shrineImprovements: ShrineImprovement[];
    onClickShrineImprovement: (shrineImprovement: ShrineImprovement) => void;
}) {
    const [modalCard, setModalCard] = useState(-1);
    const decklistContext = useContext(DeckContext);

    function openModal(shrineImprovement: ShrineImprovement) {
        setModalCard(shrineImprovements.indexOf(shrineImprovement));
    }

    const images = shrineImprovements.map((si) => (
        <Grid className="unbacked-overlay" item key={si.filename}>
            <Card
                card={si}
                onClick={onClickShrineImprovement}
                onContextMenu={openModal}
                disabled={isAtMax(decklistContext, si)}
            ></Card>
        </Grid>
    ));

    return (
        <Container className="overlays">
            <CardModal
                cardType={CardType.ShrineImprovement}
                list={shrineImprovements}
                activeCard={modalCard}
                setActiveCard={setModalCard}
                onEnter={onClickShrineImprovement}
            ></CardModal>
            <Grid container className="overlay-grid">
                {images}
            </Grid>
        </Container>
    );
}

export function BaseCardList({
    cards,
    onClickBaseCard,
    style,
}: {
    cards: BaseCard[];
    onClickBaseCard: (arg0: BaseCard) => void;
    style?: CSSProperties;
}) {
    const [modalCard, setModalCard] = useState(-1);
    const decklistContext = useContext(DeckContext);

    function openModal(card: BaseCard) {
        setModalCard(cards.indexOf(card));
    }

    const images = cards.map((c) => {
        return (
            <Grid item key={c.filename}>
                <Card
                    card={c}
                    onClick={onClickBaseCard}
                    onContextMenu={openModal}
                    disabled={isAtMax(decklistContext, c)}
                ></Card>
            </Grid>
        );
    });

    return (
        <Container className="base-card-list-container" style={style}>
            <CardModal
                cardType={CardType.BaseCard}
                list={cards}
                activeCard={modalCard}
                setActiveCard={setModalCard}
                onEnter={(c) => {
                    onClickBaseCard(c);
                }}
            ></CardModal>
            <Grid container>{images}</Grid>
        </Container>
    );
}

export function EssenceList({
    essences,
    onClickEssence,
}: {
    essences: Essence[];
    onClickEssence: (e: Essence) => void;
}) {
    const [modalCard, setModalCard] = useState(-1);
    const decklistContext = useContext(DeckContext);

    function openModal(essence: Essence) {
        setModalCard(essences.indexOf(essence));
    }

    const images = essences.map((e) => {
        return (
            <Grid className="unbacked-overlay" item key={e.filename}>
                <Card
                    card={e}
                    onContextMenu={openModal}
                    disabled={isAtMax(decklistContext, e)}
                    onClick={onClickEssence}
                ></Card>
            </Grid>
        );
    });

    return (
        <Container className="overlays">
            <CardModal
                cardType={CardType.Essence}
                list={essences}
                activeCard={modalCard}
                setActiveCard={setModalCard}
            ></CardModal>
            <Grid container className="overlay-grid">
                {images}
            </Grid>
        </Container>
    );
}

function onEnterWarn(e: React.DragEvent) {
    e.currentTarget.classList.add('warn');
}

function onLeaveUnwarn(e: React.DragEvent) {
    e.currentTarget.classList.remove('warn');
}

function calcClusterWidth(
    isMaximized: boolean,
    dupeCount: number,
    isTtsMode = false
): string {
    if (isMaximized && isTtsMode) {
        return 'unset';
    }
    return (
        (isMaximized ? 6.5 + 4.875 * dupeCount : 5 + 3.75 * dupeCount) + 'vw'
    );
}

export function Deck({
    shrineSlot,
    mainDeck,
    heldCard,
    onClickDeckSlot,
    onDropEssence,
    setShrine,
    setShrineImprovement,
    onDropBaseCard,
    deckMaximized,
    ttsMode,
}: {
    shrineSlot: ShrineSlot;
    mainDeck: DeckSlot[];
    heldCard: HeldCard;
    onClickDeckSlot: (id: number) => void;
    onDropEssence: (id: number, essence: Essence, ctrl: boolean) => void;
    setShrine: (shrine: Shrine | null) => void;
    setShrineImprovement: (shrineImprovement: ShrineImprovement | null) => void;
    onDropBaseCard: (c: BaseCard) => void;
    deckMaximized: boolean;
    ttsMode: boolean;
}) {
    const [modalCard, setModalCard] = useState(NaN);

    function getIndex(id: number) {
        return mainDeck.findIndex((slot) => {
            return slot.id === id;
        });
    }

    let deck = [];

    for (let i = 0; i < mainDeck.length; i++) {
        let c = mainDeck[i];
        let dupes = [];
        let className = '';
        let droppable = false;
        let warn;
        let enterLeaveProps;
        let dropProps;

        if (c.baseCard) {
            if (heldCard) {
                let t = heldCard.card.type;
                if (t === CardType.Essence) {
                    let e = heldCard.card as Essence;
                    droppable = c.baseCard.validEssences.has(e.id);
                    if (!Number.isNaN(heldCard.id)) {
                        warn = mainDeck.find((ds) => ds.id === heldCard.id);
                    }
                }
                if (
                    t === CardType.Essence ||
                    (Number.isNaN(heldCard.id) &&
                        (t === CardType.Shrine ||
                            t === CardType.ShrineImprovement))
                )
                    className = droppable ? ' valid' : ' greyed';
            }
            while (
                // (!deckMaximized || !ttsMode) &&
                !(deckMaximized && ttsMode) && // error
                mainDeck[i + 1]?.baseCard &&
                mainDeck[i + 1]?.baseCard!.id === c.baseCard.id
            ) {
                let dupe = mainDeck[i];
                i++;
                dropProps = new ConditionalDroppable(
                    droppable,
                    (e: React.DragEvent) => {
                        e.preventDefault();
                        onDropEssence(
                            dupe.id,
                            heldCard?.card as Essence,
                            e.getModifierState('Control')
                        );
                    }
                );
                enterLeaveProps = new ConditionalDragEnterLeave(
                    (warn &&
                        warn.baseCard &&
                        !warn.baseCard.validEssences.has(
                            dupe.essence?.id || NaN
                        )) as boolean,
                    onEnterWarn,
                    onLeaveUnwarn
                );
                dupes.push(
                    dupe.essence ? (
                        <ImbuedCard
                            key={i}
                            className={'overlapped has-essence' + className}
                            {...enterLeaveProps}
                            {...dropProps}
                            card={dupe.baseCard!}
                            essence={dupe.essence}
                            onClick={() => onClickDeckSlot(dupe.id)}
                            onContextMenu={() => {
                                setModalCard(getIndex(dupe.id));
                            }}
                            cardSlotId={dupe.id}
                        ></ImbuedCard>
                    ) : (
                        <Card
                            key={i}
                            className={'overlapped' + className}
                            // style={style}
                            {...dropProps}
                            card={dupe.baseCard!}
                            onClick={() => onClickDeckSlot(dupe.id)}
                            onContextMenu={(s) => {
                                setModalCard(getIndex(dupe.id));
                            }}
                            cardSlotId={dupe.id}
                        ></Card>
                    )
                );
            }
            c = mainDeck[i];
            dropProps = new ConditionalDroppable(
                droppable,
                (e: React.DragEvent) => {
                    e.preventDefault();
                    onDropEssence(
                        c.id,
                        heldCard?.card as Essence,
                        e.getModifierState('Control')
                    );
                }
            );
            enterLeaveProps = new ConditionalDragEnterLeave(
                (warn &&
                    warn.baseCard &&
                    !warn.baseCard.validEssences.has(
                        c.essence?.id || NaN
                    )) as boolean,
                onEnterWarn,
                onLeaveUnwarn
            );
            deck.push(
                <Grid
                    item
                    className="card-cluster"
                    style={{
                        width: calcClusterWidth(
                            deckMaximized,
                            dupes.length,
                            ttsMode
                        ),
                    }}
                    key={c.id}
                >
                    {dupes}
                    {c.essence ? (
                        <ImbuedCard
                            key={i}
                            {...dropProps}
                            {...enterLeaveProps}
                            className={'last has-essence' + className}
                            card={c.baseCard!}
                            essence={c.essence}
                            onClick={() => onClickDeckSlot(c.id)}
                            onContextMenu={() => {
                                setModalCard(getIndex(c.id));
                            }}
                            cardSlotId={c.id}
                        ></ImbuedCard>
                    ) : (
                        <Card
                            key={i}
                            {...dropProps}
                            className={'last' + className}
                            card={c.baseCard!}
                            onClick={() => onClickDeckSlot(c.id)}
                            onContextMenu={(s) => {
                                setModalCard(getIndex(c.id));
                            }}
                            cardSlotId={c.id}
                        ></Card>
                    )}
                </Grid>
            );
        } else {
            if (heldCard) {
                className = ' greyed';
            }
            while (
                !(deckMaximized && ttsMode) &&
                mainDeck[i + 1]?.essence &&
                mainDeck[i + 1]?.essence?.id === c.essence?.id
            ) {
                let dupe = mainDeck[i];
                i++;
                dupes.push(
                    <Card
                        key={i}
                        className={'overlapped' + className}
                        card={c.essence!}
                        onClick={() => onClickDeckSlot(dupe.id)}
                        onContextMenu={(s) => {
                            setModalCard(getIndex(dupe.id));
                        }}
                        cardSlotId={dupe.id}
                    ></Card>
                );
            }
            c = mainDeck[i];
            deck.push(
                <Grid
                    item
                    className="card-cluster"
                    style={{
                        width: calcClusterWidth(
                            deckMaximized,
                            dupes.length,
                            ttsMode
                        ),
                    }}
                    key={c.id}
                >
                    {dupes}
                    <Card
                        key={i}
                        className={'last has-essence' + className}
                        card={c.essence!}
                        onClick={() => onClickDeckSlot(c.id)}
                        onContextMenu={() => {
                            setModalCard(getIndex(c.id));
                        }}
                        cardSlotId={c.id}
                    ></Card>
                </Grid>
            );
        }
    }

    // if (deckMaximized && ttsMode) {
    //     deck.push(
    //         <Grid
    //             item
    //             className="card-cluster"
    //             style={{
    //                 width: calcClusterWidth(deckMaximized, 0, ttsMode),
    //             }}
    //             key={-1}
    //         >
    //             <Card
    //                 key={-1}
    //                 className={'last'}
    //                 card={
    //                     new CardBack('/assets/misc/card-back.png', 'Card back')
    //                 }
    //             ></Card>
    //         </Grid>
    //     );
    // }

    let shrine;
    let shrineDroppable = new ConditionalDroppable(
        (heldCard &&
            (heldCard.card.type === CardType.Shrine ||
                heldCard.card.type === CardType.ShrineImprovement)) as boolean,
        (e) => {
            e.preventDefault();
            if (heldCard?.card.type === CardType.Shrine) {
                setShrine(heldCard.card as Shrine);
            } else {
                // must be si
                setShrineImprovement(heldCard?.card as ShrineImprovement);
            }
        }
    );
    if (shrineSlot.shrine) {
        shrine = shrineSlot.shrineImprovement ? (
            <ImprovedShrine
                shrineSlot={shrineSlot}
                onClick={() => setShrineImprovement(null)}
                onContextMenu={() => setModalCard(-1)}
                {...shrineDroppable}
            ></ImprovedShrine>
        ) : (
            <Card
                card={shrineSlot.shrine}
                onClick={() => setShrine(null)}
                onContextMenu={(s) => setModalCard(-1)} //ignoring the card name that Card passes up
                cardSlotId={1} //distinguishing active shrine from those in the collection
                {...shrineDroppable}
            ></Card>
        );
    } else {
        shrine = shrineSlot.shrineImprovement ? (
            <Card
                card={shrineSlot.shrineImprovement}
                onClick={() => setShrineImprovement(null)}
                onContextMenu={() => setModalCard(-1)}
                {...shrineDroppable}
            ></Card>
        ) : (
            <Card
                card={
                    new Placeholder(
                        '/assets/misc/card-shaped-logo.png',
                        'Shrine placeholder'
                    )
                }
                onContextMenu={(s) => setModalCard(-1)} //ignoring the card name that Card passes up
                {...shrineDroppable}
            ></Card>
        );
    }
    const deckDroppable = new ConditionalDroppable(
        heldCard?.card.type === CardType.BaseCard && Number.isNaN(heldCard?.id),
        (e) => {
            e.preventDefault();
            onDropBaseCard(heldCard?.card as BaseCard);
        }
    );

    const gridClass = deckMaximized && ttsMode ? 'tts' : 'standard';

    let grid;
    let ttsGrid;
    if (ttsMode) {
        grid = [[], [], [], [], [], []] as JSX.Element[][];
        if (shrine) {
            grid[0].push(<Grid item>{shrine}</Grid>);
        }
        let n = 0;
        let i = 0;
        while (i < 6 && n < deck.length) {
            while (grid[i].length < 10) {
                grid[i].push(deck[n]);
                n++;
            }
            i++;
        }
        ttsGrid = (
            <div className="tts-mode">
                <Grid container className={gridClass}>
                    {grid[0]}
                </Grid>
                <Grid container className={gridClass}>
                    {grid[1]}
                </Grid>
                <Grid container className={gridClass}>
                    {grid[2]}
                </Grid>
                <Grid container className={gridClass}>
                    {grid[3]}
                </Grid>
                <Grid container className={gridClass}>
                    {grid[4]}
                </Grid>
                <Grid container className={gridClass}>
                    {grid[5]}
                </Grid>
            </div>
        );
    }

    return (
        <div className="main-deck" {...deckDroppable}>
            <DeckModal
                shrineSlot={shrineSlot}
                mainDeck={mainDeck}
                activeCard={modalCard}
                setActiveCard={setModalCard}
            ></DeckModal>
            {ttsMode ? (
                ttsGrid
            ) : (
                <Grid container className={gridClass}>
                    <Grid item>{shrine}</Grid>
                    {deck}
                </Grid>
            )}
        </div>
    );
}
