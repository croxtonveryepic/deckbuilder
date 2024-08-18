import { FormControl } from '@mui/material';

export function TernaryButton({
  state,
  labelOne,
  labelTwo,
  setState,
}: {
  state: boolean;
  labelOne: string;
  labelTwo: string;
  setState: (val: boolean) => void;
}) {
  return (
    <FormControl>
      <button onClick={(e) => setState(!state)}>
        {state ? labelOne : labelTwo}
      </button>
    </FormControl>
  );
}
