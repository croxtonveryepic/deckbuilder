import { FormControl } from '@mui/material';

export function TernaryButton({
  state,
  labelOne,
  labelTwo,
  setState,
  className = '',
}: {
  state: boolean;
  labelOne: string;
  labelTwo: string;
  setState: (val: boolean) => void;
  className?: string;
}) {
  const classes = `${state} ${className}`;
  return (
    <button onClick={(e) => setState(!state)} className={classes}>
      {state ? labelOne : labelTwo}
    </button>
  );
}
