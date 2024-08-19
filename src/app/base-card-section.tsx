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
import { ComponentPropsWithoutRef, useState } from 'react';
import { ElementButtons } from './components/element-buttons';
import { BaseCardList } from './components/card-list';
import { handleElementFilterClicked } from './utils';
import { BaseCardType, Element, Rarity } from './cardlists/enums';
import { BaseCard, BaseCardFilters } from './cardlists/base-cards';
import { Search } from '@mui/icons-material';
import { PipButtons } from './components/pip-button';

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
  const [bcElementAnd, setBcElementAnd] = useState(false);
  const [bcCostValOne, setBcCostValOne] = useState(NaN);
  const [bcCostValTwo, setBcCostValTwo] = useState(NaN);
  const [bcCostOperator, setBcCostOperator] = useState('=');
  const [bcQuery, setBcQuery] = useState('');

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
      elementAnd: bcElementAnd,
      costChoiceOne: bcCostValOne,
      costChoiceTwo: bcCostValTwo,
      costOperator: bcCostOperator,
      query: bcQuery,
      rarityFilter: bcRarity,
    });
    return cards
      .filter((c) => filters.keep(c))
      .sort((a, b) => a.cost - b.cost || a.name.localeCompare(b.name));
  }

  const filteredAndSortedBaseCards = filterAndSortBaseCards();

  return (
    <div className="base-card-container" {...rest}>
      <div className="base-card-widget-container">
        <FormGroup>
          <div className="search-filter-container">
            <TextField
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
              color="secondary"
              sx={{ type: 'search' }}
            ></TextField>
            {/* <IconButton onClick={() => setBcQuery('')}>
                        <HighlightOff></HighlightOff>
                      </IconButton> */}
          </div>
        </FormGroup>
        <FormGroup>
          <div className="type-rarity-container">
            <FormControl>
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
            <FormControl>
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
          </div>
        </FormGroup>
        <FormGroup className="element-filter">
          <ElementButtons
            selected={bcElements}
            onElementClicked={(e: Element) =>
              handleElementFilterClicked(e, bcElements, setBcElements)
            }
          ></ElementButtons>
          <Stack
            direction="row"
            alignItems="center"
            sx={{ marginLeft: '.5em' }}
          >
            <Typography>Or</Typography>
            <Switch
              checked={bcElementAnd}
              onChange={(e) => setBcElementAnd(e.target.checked)}
            />
            <Typography>And</Typography>
          </Stack>
        </FormGroup>
        <FormGroup className="cost-filter-container">
          <Select
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
            selectedOne={bcCostValOne}
            selectedTwo={bcCostValTwo}
            onClick={handleCostFilterClicked}
          ></PipButtons>
        </FormGroup>
      </div>
      <BaseCardList
        cards={filteredAndSortedBaseCards}
        onClickBaseCard={onClickBaseCard}
      ></BaseCardList>
    </div>
  );
}
