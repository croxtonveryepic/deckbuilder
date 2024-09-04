import {
  Box,
  Divider,
  FormControl,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import { ComponentPropsWithoutRef, useState } from 'react';
import { ElementButtons } from './components/element-buttons';
import { EssenceList } from './components/card-list';
import { handleElementFilterClicked } from './utils';
import { Element } from './cardlists/enums';
import { Essence, EssenceFilters } from './cardlists/essences';
import { TertiaryButton } from './components/tertiary-button';
import { PipButtons } from './components/pip-button';
import { TernaryButton } from './components/ternary-button';

interface EssenceSectionProps extends ComponentPropsWithoutRef<'div'> {
  essences: Essence[];
}

export function EssenceSection({ essences, ...rest }: EssenceSectionProps) {
  const [elements, setElements] = useState([] as Element[]);
  const [elementAnd, setElementAnd] = useState(true);
  const [speed, setSpeed] = useState(false);
  const [power, setPower] = useState(false);
  const [hp, setHp] = useState(false);
  const [cost, setCost] = useState(undefined as boolean | undefined);
  const [ccc, setCcc] = useState(NaN);
  const [cccOperator, setCccOperator] = useState('<=');
  const [unlimited, setUnlimited] = useState(undefined as boolean | undefined);

  function filterAndSortEssences() {
    const filters = new EssenceFilters({
      elementChoices: elements,
      elementAnd: elementAnd,
      speedChoice: speed,
      powerChoice: power,
      hpChoice: hp,
      hasCost: cost,
      cccChoice: ccc,
      cccOperator: cccOperator,
      unlimitedChoice: unlimited,
    });
    return essences
      .filter((e) => filters.keep(e))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  const filteredAndSortedEssences = filterAndSortEssences();

  return (
    <div className="overlay-card-container" {...rest}>
      <div className="overlay-card-widget-container">
        <FormGroup className="element-filter">
          <ElementButtons
            selected={elements}
            onElementClicked={(e: Element) =>
              handleElementFilterClicked(e, elements, setElements)
            }
          ></ElementButtons>
          <Stack
            direction="row"
            alignItems="center"
            sx={{ marginLeft: '.5em' }}
          >
            <Typography>Or</Typography>
            <Switch
              checked={elementAnd}
              onChange={(e) => setElementAnd(e.target.checked)}
            />
            <Typography>And</Typography>
          </Stack>
        </FormGroup>
        <FormGroup className="stat-filters">
          <TernaryButton
            state={speed}
            labelOne={'Speed'}
            labelTwo={'Speed'}
            setState={() => setSpeed(!speed)}
          ></TernaryButton>
          <TernaryButton
            state={power}
            labelOne={'Power'}
            labelTwo={'Power'}
            setState={() => setPower(!power)}
          ></TernaryButton>
          <TernaryButton
            state={hp}
            labelOne={'HP'}
            labelTwo={'HP'}
            setState={() => setHp(!hp)}
          ></TernaryButton>
          <TertiaryButton
            // style={{ width: '7rem' }}
            state={cost}
            labels={['Cost', 'Cost: +1', 'Cost: +0']}
            setState={setCost}
          ></TertiaryButton>
          <TertiaryButton
            // style={{ width: '7rem' }}
            state={unlimited}
            labels={['Quantity', 'Quantity: ∞', 'Quantity: 3']}
            setState={setUnlimited}
          ></TertiaryButton>
        </FormGroup>
        <FormGroup className="ccc-filters">
          <FormControl>
            <InputLabel>CCC</InputLabel>
            <Select
              label="CCC"
              size="small"
              value={cccOperator}
              onChange={(e) => setCccOperator(e.target.value)}
              className="dropdown"
            >
              <MenuItem value={'='}>=</MenuItem>
              <MenuItem value={'<='}>&lt;=</MenuItem>
              <MenuItem value={'>='}>&gt;=</MenuItem>
            </Select>
          </FormControl>
          <PipButtons
            count={7}
            selectedOne={ccc}
            onClick={(num: number) => setCcc(num === ccc ? NaN : num)}
            zeroIndex={true}
          ></PipButtons>
        </FormGroup>
      </div>

      <EssenceList essences={filteredAndSortedEssences}></EssenceList>
    </div>
  );
}
