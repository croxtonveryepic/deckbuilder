import { Check, Close } from '@mui/icons-material';

export function checkOrX(bool: boolean, errorMessage?: string) {
  return bool ? (
    <Check></Check>
  ) : (
    <p>
      <Close></Close> ({errorMessage})
    </p>
  );
}
