import { Box } from '@mui/material';
function PipButton({
    num,
    selected,
    highlighted,
    onClick,
    hasPlus = false,
}: {
    num: number;
    selected: boolean;
    highlighted: boolean;
    onClick: (num: number) => void;
    hasPlus?: boolean;
}) {
    let className;
    if (selected) {
        className = 'mana-pip selected';
    } else if (highlighted) {
        className = 'mana-pip highlighted';
    } else {
        className = 'mana-pip';
    }
    return (
        <button onClick={() => onClick(num)} className={className}>
            <Box className="circle">
                {num}
                {hasPlus && '+'}
            </Box>
        </button>
    );
}

export function PipButtons({
    count,
    selectedOne,
    selectedTwo = NaN,
    onClick,
    zeroIndex = false,
    includePlus,
}: {
    count: number;
    selectedOne: number;
    selectedTwo?: number;
    onClick: (num: number) => void;
    zeroIndex?: boolean;
    includePlus: boolean;
}) {
    const buttons = Array.from({ length: count }).map((x, i) => {
        let num = zeroIndex ? i : i + 1;
        return (
            <PipButton
                key={num}
                num={num}
                onClick={onClick}
                selected={num === selectedOne || num === selectedTwo}
                highlighted={num > selectedOne && num < selectedTwo}
                hasPlus={includePlus && num === count}
            ></PipButton>
        );
    });

    return <div className="pip-container">{buttons}</div>;
}
