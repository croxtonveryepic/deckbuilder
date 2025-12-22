import { ShrineSlot } from '../cardlists/shrines';
import { DeckSlot } from '../page';
import { Element } from '../cardlists/enums';
import Image from 'next/image';
import { Box, IconButton, Tooltip } from '@mui/material';
import {
    CloseFullscreen,
    LibraryBooks,
    OpenInFull,
    SaveAs,
} from '@mui/icons-material';
import { useState } from 'react';
import { TernaryButton } from './ternary-button';
import { ExportDeck, SaveDeck } from './deck-encoder';
import { baseCardMaxCost } from '../base-card-section';
import html2canvas from 'html2canvas';
import Router from 'next/router';
import { TtsInfoModal } from './tts-info-modal';

class Colors {
    colors: Map<Element, number>;

    constructor() {
        this.colors = new Map<Element, number>([
            [Element.Air, 0],
            [Element.Dark, 0],
            [Element.Earth, 0],
            [Element.Fire, 0],
            [Element.Light, 0],
            [Element.Water, 0],
            [Element.Neutral, 0],
        ]);
    }

    record(list: Element[]) {
        for (let i = 0; i < list.length; i++) {
            this.colors.set(list[i], this.colors.get(list[i])! + 1);
        }
    }

    nonEmpty(): boolean {
        let sum = this.colors.get(Element.Neutral)! * -1;
        this.colors.forEach((val) => (sum += val));
        return sum > 0;
    }

    getCount(el: Element): number {
        return this.colors.get(el)!;
    }
}

const wh = 20;

function ColorDisplay({ title, colors }: { title: string; colors: Colors }) {
    const air = colors.getCount(Element.Air);
    const dark = colors.getCount(Element.Dark);
    const earth = colors.getCount(Element.Earth);
    const fire = colors.getCount(Element.Fire);
    const light = colors.getCount(Element.Light);
    const water = colors.getCount(Element.Water);
    return colors.nonEmpty() ? (
        <Tooltip title={title}>
            <div className="color-display">
                <div className="circle letter">{title.substring(0, 1)}</div>
                <div className="color-tracker-icons">
                    {air > 0 && (
                        <span style={{ order: -air }}>
                            <Image
                                src="/deckbuilder/assets/misc/airwhiteongrey.png"
                                alt="Air Icon"
                                width={wh}
                                height={wh}
                            ></Image>
                            {air}
                        </span>
                    )}
                    {dark > 0 && (
                        <span style={{ order: -dark }}>
                            <Image
                                src="/deckbuilder/assets/misc/darkwhiteonpurple.png"
                                alt="Dark Icon"
                                width={wh}
                                height={wh}
                            ></Image>
                            {dark}
                        </span>
                    )}
                    {earth > 0 && (
                        <span style={{ order: -earth }}>
                            <Image
                                src="/deckbuilder/assets/misc/earth2whiteongreen.png"
                                alt="Earth Icon"
                                width={wh}
                                height={wh}
                            ></Image>
                            {earth}
                        </span>
                    )}
                    {fire > 0 && (
                        <span style={{ order: -fire }}>
                            <Image
                                src="/deckbuilder/assets/misc/firewhiteonred.png"
                                alt="Fire Icon"
                                width={wh}
                                height={wh}
                            ></Image>
                            {fire}
                        </span>
                    )}
                    {light > 0 && (
                        <span style={{ order: -light }}>
                            <Image
                                src="/deckbuilder/assets/misc/lightwhiteonyellow.png"
                                alt="Light Icon"
                                width={wh}
                                height={wh}
                            ></Image>
                            {light}
                        </span>
                    )}
                    {water > 0 && (
                        <span style={{ order: -water }}>
                            <Image
                                src="/deckbuilder/assets/misc/waterwhiteonblue.png"
                                alt="Water Icon"
                                width={wh}
                                height={wh}
                            ></Image>
                            {water}
                        </span>
                    )}
                </div>
            </div>
        </Tooltip>
    ) : (
        <div className="spacer"></div>
    );
}

function manaCircle(num: number, includePlus = false) {
    return (
        <Box className="mana-pip circle">
            {num}
            {includePlus && '+'}
        </Box>
    );
}

export function DeckTracker({
    shrine,
    setShrine,
    deck,
    setDeck,
    shrineMode,
    toggleShrineMode,
    deckMaximized,
    toggleMaxView,
    ttsMode,
    toggleTtsMode,
}: {
    shrine: ShrineSlot;
    setShrine: (ss: ShrineSlot) => void;
    deck: DeckSlot[];
    setDeck: (deck: DeckSlot[]) => void;
    shrineMode: boolean;
    toggleShrineMode: () => void;
    deckMaximized: boolean;
    toggleMaxView: () => void;
    ttsMode: boolean;
    toggleTtsMode: () => void;
}) {
    let numCards = 0;
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
        [7, 0],
    ]);

    for (const ds of deck) {
        let r, s, i;
        s = ds.baseCard ? [...ds.baseCard.pips] : [];
        if (ds.essence) {
            numEssences++;
            r = ds.essence.resources;
            s.push(...ds.essence.cost);
        } else {
            r = [] as Element[];
        }
        resources.record(r);
        souls.record(s);
        if (ds.essence?.id !== 69) {
            // soulless
            i = [...new Set(s)];
            identities.record(i);
        }
        if (ds.baseCard) {
            numCards++;
            let cost = ds.baseCard.cost + (ds.essence?.cost.length || 0);
            cost = cost > baseCardMaxCost ? baseCardMaxCost : cost;
            costs.set(cost, (costs.get(cost) as any as number) + 1);
        }
    }

    if (costs.get(7) === 0) {
        costs.delete(7);
    }

    const costDisplay = [] as any;
    costs.forEach((count, cost) => {
        const plus = cost === baseCardMaxCost;
        costDisplay.push(
            <span key={cost}>
                {manaCircle(cost, plus)}
                {count}
            </span>
        );
    });

    let shrinesColor;
    let shrineColorCount = 0;
    if (shrine.shrine) {
        shrinesColor = shrine.shrine.identity;
        shrineColorCount = identities.getCount(shrinesColor);
    }

    return (
        <div className="deck-widget-container">
            <Tooltip
                title={
                    (shrineMode
                        ? 'Switch to editing your main deck and essences.'
                        : 'Switch to choosing your shrine and shrine improvement.') +
                    ' This will clear your queries and filters.'
                }
                enterDelay={500}
            >
                <div className="shrine-deck-mode">
                    {!deckMaximized && (
                        <TernaryButton
                            state={shrineMode}
                            labelOne="Shrine Mode"
                            labelTwo="Deck Mode"
                            setState={toggleShrineMode}
                        ></TernaryButton>
                    )}
                </div>
            </Tooltip>
            {/* save deck */}
            <div className="modals">
                <SaveDeck
                    deck={deck}
                    shrine={shrine}
                    setShrine={setShrine}
                    setDeck={setDeck}
                ></SaveDeck>
                <ExportDeck
                    deck={deck}
                    shrine={shrine}
                    setShrine={setShrine}
                    setDeck={setDeck}
                ></ExportDeck>
            </div>
            <div className="card-counts">
                <div>
                    <span className={shrine.shrine ? 'valid' : 'warn'}>
                        {shrine.shrine ? '1/1 Shrine' : '0/1 Shrine'}
                    </span>
                    <span
                        className={shrine.shrineImprovement ? 'valid' : 'warn'}
                    >
                        {shrine.shrineImprovement
                            ? '1/1 Improvement'
                            : '0/1 Improvement'}
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
                {shrinesColor && (
                    <div style={{ width: '100%', textAlign: 'center' }}>
                        <span
                            className={
                                shrineColorCount >= 20 ? 'valid' : 'warn'
                            }
                        >
                            {shrineColorCount +
                                '/20 ' +
                                shrinesColor +
                                ' cards'}
                        </span>
                    </div>
                )}
            </div>
            {deck.length > 0 ? (
                <Tooltip title="Curve (Numerical costs of cards)">
                    <div className="curve-display">
                        <Box className="circle letter">C</Box>
                        <div className="curve-tracker-icons">{costDisplay}</div>
                    </div>
                </Tooltip>
            ) : (
                <div className="spacer"></div>
            )}
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
            {deckMaximized && <TtsInfoModal></TtsInfoModal>}
            <div className="minmax">
                <IconButton onClick={toggleMaxView}>
                    {deckMaximized ? (
                        <CloseFullscreen></CloseFullscreen>
                    ) : (
                        <OpenInFull></OpenInFull>
                    )}
                </IconButton>
            </div>
        </div>
    );
}
