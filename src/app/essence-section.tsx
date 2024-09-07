import {
  Box,
  Divider,
  FormControl,
  FormGroup,
  FormLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { ComponentPropsWithoutRef, useEffect, useState } from 'react';
import { ElementButtons } from './components/element-buttons';
import { EssenceList } from './components/card-list';
import { handleElementFilterClicked } from './utils';
import { Element } from './cardlists/enums';
import { Essence, EssenceFilters } from './cardlists/essences';
import { TertiaryButton } from './components/tertiary-button';
import { PipButtons } from './components/pip-button';
import { TernaryButton } from './components/ternary-button';
import { Search } from '@mui/icons-material';

interface EssenceSectionProps extends ComponentPropsWithoutRef<'div'> {
  essences: Essence[];
}

export function EssenceSection({ essences, ...rest }: EssenceSectionProps) {
  const [query, setQuery] = useState('');
  const [elements, setElements] = useState([] as Element[]);
  const [elementOperator, setElementOperator] = useState(
    true as boolean | undefined
  );
  const [speed, setSpeed] = useState(false);
  const [power, setPower] = useState(false);
  const [hp, setHp] = useState(false);
  const [cost, setCost] = useState(undefined as boolean | undefined);
  const [ccc, setCcc] = useState(NaN);
  const [cccOperator, setCccOperator] = useState('=');
  const [unlimited, setUnlimited] = useState(undefined as boolean | undefined);

  useEffect(() => {
    const handleEscape = (e: any) => {
      setQuery('');
      const rootElement = document.documentElement;
      rootElement.setAttribute('tabindex', '-1');
      rootElement.focus();
    };

    window.addEventListener('escape', handleEscape);

    return () => {
      window.removeEventListener('escape', handleEscape);
    };
  }, []);

  function filterAndSortEssences() {
    const filters = new EssenceFilters({
      query: query,
      elementChoices: elements,
      elementOperator: elementOperator,
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

  let cccOptOne, cccOptTwo;
  switch (cccOperator) {
    case '<=':
      cccOptOne = -1;
      cccOptTwo = ccc;
      break;
    case '>=':
      cccOptOne = ccc;
      cccOptTwo = 7;
      break;
    default:
      cccOptOne = ccc;
      cccOptTwo = NaN;
  }

  return (
    <div className="overlay-card-container" {...rest}>
      <div className="overlay-card-widget-container">
        <FormGroup className="search-filter-container">
          <TextField
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                window.dispatchEvent(new CustomEvent('escape'));
              }
            }}
            style={{ maxWidth: '12rem' }}
            label="Search Essences"
            size="small"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="query"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          ></TextField>
        </FormGroup>
        <FormGroup className="element-filter">
          <TertiaryButton
            state={elementOperator}
            labels={['Or', 'Only', 'And']}
            setState={setElementOperator}
            className="element-operator"
          ></TertiaryButton>
          <ElementButtons
            selected={elements}
            onElementClicked={(e: Element) =>
              handleElementFilterClicked(e, elements, setElements)
            }
          ></ElementButtons>
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
            style={{ width: '6.5rem' }}
            state={cost}
            labels={['Cost', 'Cost: +1', 'Cost: +0']}
            setState={setCost}
          ></TertiaryButton>
          <TertiaryButton
            style={{ width: '6.5rem' }}
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
            count={6}
            selectedOne={cccOptOne}
            selectedTwo={cccOptTwo}
            onClick={(num: number) => setCcc(num === ccc ? NaN : num)}
            zeroIndex={true}
          ></PipButtons>
        </FormGroup>
      </div>

      <EssenceList essences={filteredAndSortedEssences}></EssenceList>
    </div>
  );
}
