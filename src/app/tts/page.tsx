'use client';
import html2canvas from 'html2canvas';
import { BaseCard } from '../cardlists/base-cards';
import { Essence } from '../cardlists/essences';
import { ShrineImprovement } from '../cardlists/shrine-improvements';
import { Shrine } from '../cardlists/shrines';
import { Deck } from '../components/card-list';
import {
    useLocalStorageDeck,
    useLocalStorageShrine,
} from '../components/deck-encoder';
import { visibility } from 'html2canvas/dist/types/css/property-descriptors/visibility';
import { MouseEvent } from 'react';

const windowOptions = {
    scale: 1,
    x: 0,
    y: 0,
    width: 7300,
    height: 6210,
};
const MIME_TYPE = 'image/png';

export default function TTS() {
    const [shrine, setShrine] = useLocalStorageShrine('tempShrine');
    const [deck, setDeck] = useLocalStorageDeck();

    function downloadScreenshot() {
        // document.querySelector('.deck-container')!.style,
        html2canvas(
            document.querySelector('.deck-container')!,
            windowOptions
        ).then((canvas) => {
            document
                .querySelector('#tts-base')!
                .removeChild(document.querySelector('.deck-container')!);
            canvas.addEventListener('click', (e) => {
                const url = canvas.toDataURL(MIME_TYPE);
                const downloadLink = document.createElement('a');
                downloadLink.download = 'TTS Export';
                downloadLink.href = url;
                downloadLink.dataset.downloadurl = [
                    MIME_TYPE,
                    downloadLink.download,
                    downloadLink.href,
                ].join(':');
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            });
            document.body.appendChild(canvas);
            // canvas.style.width = '9607px';
            // canvas.style.height = '4140px';
        });
    }

    return (
        <div id="tts-base" onClick={downloadScreenshot}>
            {/* <button onClick={downloadScreenshot} style={{ zIndex: '3' }}>
                download
            </button> */}

            <div
                className="deck-container tts"
                // style={{ visibility: 'hidden' }}
            >
                <Deck
                    shrineSlot={shrine}
                    mainDeck={deck}
                    heldCard={null}
                    onClickDeckSlot={(id: number) => {}}
                    onDropEssence={(
                        id: number,
                        essence: Essence,
                        ctrl: boolean
                    ) => {}}
                    setShrine={(shrine: Shrine | null) => {}}
                    setShrineImprovement={(
                        shrineImprovement: ShrineImprovement | null
                    ) => {}}
                    onDropBaseCard={(c: BaseCard) => {}}
                    deckMaximized={true}
                    ttsMode={true}
                ></Deck>
            </div>
        </div>
    );
}
