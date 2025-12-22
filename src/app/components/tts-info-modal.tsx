import { Modal, Paper, Tooltip } from '@mui/material';
import { blue } from '@mui/material/colors';
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
                            upload your deck to Tabletop Simulator. Doing this
                            in the browser is tricky. This is what you must do:
                        </p>
                        <br></br>
                        <ul>
                            <li>1. Open the link below.</li>
                            <li>
                                2. Decrease your browser zoom (hold ctrl and
                                mousewheel down or press minus){' '}
                                <b>to the minimum it will go.</b> You should see
                                most of your deck.
                            </li>
                            <li>3. Refresh the page.</li>
                            <li>
                                4. Click anywhere on the screen. Make sure
                                everything looks right. If not, try again.
                            </li>
                            <li>5. Click again to save.</li>
                            <li>6. Reset your browser zoom (ctrl 0).</li>
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
