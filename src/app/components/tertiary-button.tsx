import { FormControl } from '@mui/material';
import { CSSProperties } from 'react';

export function TertiaryButton({
  state,
  labels,
  setState,
  style,
  className,
}: {
  state: boolean | undefined;
  labels: string[];
  setState: (val: boolean | undefined) => void;
  style?: CSSProperties | undefined;
  className?: string;
}) {
  if (labels.length < 3) {
    throw new Error('Too few lables in TertiaryButton component');
  } else if (labels.length > 3) {
    console.warn('Too many lables in TertiaryButton component');
  }
  let label;
  if (state === undefined) {
    label = labels[0];
  } else {
    label = state ? labels[1] : labels[2];
  }
  return (
    <FormControl className={className}>
      <button
        className={String(state === undefined ? false : true)}
        style={style}
        onClick={(e) => {
          switch (state) {
            case undefined:
              setState(true);
              break;
            case true:
              setState(false);
              break;
            case false:
              setState(undefined);
              break;
          }
        }}
      >
        {label}
      </button>
    </FormControl>
  );
}
