import { Modal, Paper, Tooltip } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';

export function TtsInfoModal({}: {}) {
    const [isOpen, setIsOpen] = useState(false);

    function close() {
        setIsOpen(false);
    }

    return (
        <div className="tts-mode">
            <Tooltip
                title="Create a high-res image of the deck to upload to Tabletop Simulator"
                enterDelay={300}
            >
                <div className="tts-mode">
                    <button onClick={() => setIsOpen(true)}>TTS Export</button>
                </div>
            </Tooltip>
            <Modal
                open={isOpen}
                className="modal-parent"
                onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                        close();
                    }
                }}
                onClick={close}
            >
                <div
                    style={{
                        width: '24vw',
                        height: '51vh',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '1.5rem',
                    }}
                    className="modal thin-bg"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Paper
                        style={{
                            padding: '2%',
                        }}
                    >
                        <h3>Tabletop Simulator Export</h3>
                        <br></br>
                        <p>
                            This feature generates a high-res image so you can
                            upload your deck to Tabletop Simulator.
                        </p>
                        <br></br>
                        <ul>
                            <li>1. Open the link below.</li>
                            <li>
                                2. Click anywhere on the screen. This converts
                                the browser-rendered HTML to an image. Make sure
                                everything looks right.
                            </li>
                            <li>3. Click again to save.</li>
                        </ul>
                    </Paper>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'stretch',
                            // flexGrow: 1,
                        }}
                    >
                        <Link
                            href={'tts'}
                            target="_blank"
                            style={{ color: 'blue' }}
                        >
                            I understand —&gt;
                        </Link>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
