import { FormControl } from '@mui/material';

export function TernaryButton({
  state,
  labelOne,
  labelTwo,
  setState,
  className,
}: {
  state: boolean;
  labelOne: string;
  labelTwo: string;
  setState: (val: boolean) => void;
  className?: string;
}) {
  return (
    <FormControl>
      <button onClick={(e) => setState(!state)} className={className}>
        {state ? labelOne : labelTwo}
      </button>
    </FormControl>
  );
}
