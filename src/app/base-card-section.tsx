import {
  FormControl,
  FormGroup,
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
import { BaseCardList } from './components/card-list';
import { handleElementFilterClicked } from './utils';
import { BaseCardType, Element, Rarity } from './cardlists/enums';
import { BaseCard, BaseCardFilters } from './cardlists/base-cards';
import { Search } from '@mui/icons-material';
import { PipButtons } from './components/pip-button';
import { TernaryButton } from './components/ternary-button';
import { TertiaryButton } from './components/tertiary-button';

interface BaseCardSectionProps extends ComponentPropsWithoutRef<'div'> {
  cards: BaseCard[];
  onClickBaseCard: (c: BaseCard) => void;
}

export function BaseCardSection({
  cards,
  onClickBaseCard,
  ...rest
}: BaseCardSectionProps) {
  const [bcType, setBcType] = useState(BaseCardType.Any);
  const [bcRarity, setBcRarity] = useState(Rarity.Any);
  const [bcElements, setBcElements] = useState([] as Element[]);
  const [bcElementOperator, setBcElementOperator] = useState(
    true as boolean | undefined
  );
  const [bcCostValOne, setBcCostValOne] = useState(NaN);
  const [bcCostValTwo, setBcCostValTwo] = useState(NaN);
  const [bcCostOperator, setBcCostOperator] = useState('=');
  const [bcQuery, setBcQuery] = useState('');
  const [ccc, setCcc] = useState(NaN);
  const [cccOperator, setCccOperator] = useState('=');
  const [setFilter, setSetFilter] = useState('');

  useEffect(() => {
    const handleEscape = (e: any) => {
      setBcQuery('');
      const rootElement = document.documentElement;
      rootElement.setAttribute('tabindex', '-1');
      rootElement.focus();
    };

    window.addEventListener('escape', handleEscape);

    return () => {
      window.removeEventListener('escape', handleEscape);
    };
  }, []);

  function handleCostFilterClicked(x: number) {
    if (bcCostOperator === '<=>') {
      if (!bcCostValOne) {
        setBcCostValOne(x);
      } else if (bcCostValOne === x) {
        setBcCostValOne(bcCostValTwo);
        setBcCostValTwo(NaN);
      } else if (!bcCostValTwo) {
        if (x > bcCostValOne) {
          setBcCostValTwo(x);
        } else {
          setBcCostValTwo(bcCostValOne);
          setBcCostValOne(x);
        }
      } else if (bcCostValTwo === x) {
        setBcCostValTwo(NaN);
      } else {
        // could do some other logic here to decide how to move them instead of reseting
        setBcCostValOne(x);
        setBcCostValTwo(NaN);
      }
    } else {
      if (bcCostValOne === x) {
        setBcCostValOne(NaN);
      } else {
        setBcCostValOne(x);
      }
    }
  }

  function filterAndSortBaseCards() {
    const filters = new BaseCardFilters({
      typeChoice: bcType,
      elementChoices: bcElements,
      elementOperator: bcElementOperator,
      costChoiceOne: bcCostValOne,
      costChoiceTwo: bcCostValTwo,
      costOperator: bcCostOperator,
      cccChoice: ccc,
      cccOperator: cccOperator,
      query: bcQuery,
      rarityFilter: bcRarity,
      setFilter: setFilter,
    });
    return cards
      .filter((c) => filters.keep(c))
      .sort((a, b) => a.cost - b.cost || a.name.localeCompare(b.name));
  }

  const filteredAndSortedBaseCards = filterAndSortBaseCards();

  let costOptOne, costOptTwo;
  switch (bcCostOperator) {
    case '=':
      costOptOne = bcCostValOne;
      costOptTwo = NaN;
      break;
    case '<=':
      costOptOne = -1;
      costOptTwo = bcCostValOne;
      break;
    case '>=':
      costOptOne = bcCostValOne;
      costOptTwo = 8;
      break;
    default: // <=>
      costOptOne = bcCostValOne;
      costOptTwo = bcCostValTwo;
  }

  let cccOptOne, cccOptTwo;
  switch (cccOperator) {
    case '<=':
      cccOptOne = -1;
      cccOptTwo = ccc;
      break;
    case '>=':
      cccOptOne = ccc;
      cccOptTwo = 8;
      break;
    default:
      cccOptOne = ccc;
      cccOptTwo = NaN;
  }

  return (
    <div className="base-card-container" {...rest}>
      <div className="base-card-widget-container" style={{ height: '26%' }}>
        <FormGroup style={{ width: '90%' }}>
          <div className="search-filter-container">
            <TextField
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  window.dispatchEvent(new CustomEvent('escape'));
                }
              }}
              label="Search"
              value={bcQuery}
              onChange={(e) => setBcQuery(e.target.value)}
              className="query"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              fullWidth
              // style={{ width: '100%' }}
              // sx={{ type: 'search' }}
            ></TextField>
            {/* <IconButton onClick={() => setBcQuery('')}>
                        <HighlightOff></HighlightOff>
                      </IconButton> */}
          </div>
        </FormGroup>
        <FormGroup style={{ width: '90%' }}>
          <div className="type-rarity-container">
            <FormControl style={{ marginRight: '.5rem' }}>
              <InputLabel>Supertype</InputLabel>
              <Select
                label="Supertype"
                value={bcType}
                onChange={(e) => {
                  setBcType(e.target.value as BaseCardType);
                }}
              >
                <MenuItem value={BaseCardType.Any}>
                  <em>Any</em>
                </MenuItem>
                <MenuItem value={BaseCardType.Unit}>Unit</MenuItem>
                <MenuItem value={BaseCardType.Event}>Event</MenuItem>
                <MenuItem value={BaseCardType.ContinuousEvent}>
                  Continuous Event
                </MenuItem>
                <MenuItem value={BaseCardType.Item}>Item</MenuItem>
                <MenuItem value={BaseCardType.Structure}>Structure</MenuItem>
              </Select>
            </FormControl>
            <FormControl style={{ marginRight: '.5rem' }}>
              <InputLabel>Rarity</InputLabel>
              <Select
                label="Rarity"
                value={bcRarity}
                onChange={(e) => {
                  setBcRarity(e.target.value as Rarity);
                }}
              >
                <MenuItem value={Rarity.Any}>
                  <em>Any</em>
                </MenuItem>
                <MenuItem value={Rarity.Common}>Common</MenuItem>
                <MenuItem value={Rarity.Uncommon}>Uncommon</MenuItem>
                <MenuItem value={Rarity.Rare}>Rare</MenuItem>
                <MenuItem value={Rarity.Epic}>Epic</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel>Set</InputLabel>
              <Select
                label="Set"
                value={setFilter}
                onChange={(e) => {
                  setSetFilter(e.target.value);
                }}
              >
                <MenuItem value={''}>
                  <em>Any</em>
                </MenuItem>
                <MenuItem value={1}>1 - A New Way</MenuItem>
                <MenuItem value={3}>2 - Broken Pair</MenuItem>
              </Select>
            </FormControl>
          </div>
        </FormGroup>
        <FormGroup style={{ width: '90%' }} className="element-filter">
          <TertiaryButton
            state={bcElementOperator}
            labels={['Or', 'Only', 'And']}
            setState={setBcElementOperator}
            className="element-operator"
          ></TertiaryButton>
          <ElementButtons
            selected={bcElements}
            onElementClicked={(e: Element) =>
              handleElementFilterClicked(e, bcElements, setBcElements)
            }
          ></ElementButtons>
        </FormGroup>
        <FormGroup
          className="cost-filter-container"
          style={{ marginTop: '.5rem' }}
        >
          <FormControl>
            <InputLabel>Cost</InputLabel>
            <Select
              label="Cost"
              size="small"
              style={{ width: '5rem', marginRight: '.5rem' }}
              value={bcCostOperator}
              onChange={(e) => {
                let val = e.target.value;
                if (bcCostOperator === '<=>') {
                  setBcCostValTwo(NaN);
                }
                setBcCostOperator(val);
              }}
            >
              <InputLabel>Cost</InputLabel>
              <MenuItem value={'='}>=</MenuItem>
              <MenuItem value={'<='}>&lt;=</MenuItem>
              <MenuItem value={'>='}>&gt;=</MenuItem>
              <MenuItem value={'<=>'}>&lt;=&gt;</MenuItem>
            </Select>
            <PipButtons
              count={7}
              selectedOne={costOptOne}
              selectedTwo={costOptTwo}
              onClick={handleCostFilterClicked}
            ></PipButtons>
          </FormControl>
        </FormGroup>
        <FormGroup
          className="cost-filter-container"
          style={{ marginTop: '.75rem' }}
        >
          <FormControl>
            <InputLabel>CCC</InputLabel>
            <Select
              label="CCC"
              size="small"
              style={{ width: '5rem', marginRight: '.5rem' }}
              value={cccOperator}
              onChange={(e) => setCccOperator(e.target.value)}
            >
              <MenuItem value={'='}>=</MenuItem>
              <MenuItem value={'<='}>&lt;=</MenuItem>
              <MenuItem value={'>='}>&gt;=</MenuItem>
            </Select>
            <PipButtons
              count={7}
              zeroIndex={true}
              selectedOne={cccOptOne}
              selectedTwo={cccOptTwo}
              onClick={(num: number) => setCcc(num === ccc ? NaN : num)}
            ></PipButtons>
          </FormControl>
        </FormGroup>
      </div>
      <BaseCardList
        style={{ height: '71%' }}
        cards={filteredAndSortedBaseCards}
        onClickBaseCard={onClickBaseCard}
      ></BaseCardList>
    </div>
  );
}
