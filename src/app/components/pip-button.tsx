import { Box } from '@mui/material';
function PipButton({
  num,
  selected,
  highlighted,
  onClick,
}: {
  num: number;
  selected: boolean;
  highlighted: boolean;
  onClick: (num: number) => void;
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
      <Box className="circle">{num}</Box>
    </button>
  );
}

export function PipButtons({
  count,
  selectedOne,
  selectedTwo = NaN,
  onClick,
  zeroIndex = false,
}: {
  count: number;
  selectedOne: number;
  selectedTwo?: number;
  onClick: (num: number) => void;
  zeroIndex?: boolean;
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
      ></PipButton>
    );
  });

  return <div className="pip-container">{buttons}</div>;
}
