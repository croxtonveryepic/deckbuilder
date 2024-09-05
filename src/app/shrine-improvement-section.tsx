import { FormGroup, InputAdornment, TextField } from '@mui/material';
import { ComponentPropsWithoutRef, useEffect, useState } from 'react';
import { ShrineImprovementList } from './components/card-list';
import {
  ShrineImprovement,
  ShrineImprovementFilters,
} from './cardlists/shrine-improvements';
import { Search } from '@mui/icons-material';

interface ShrineImprovementSectionProps
  extends ComponentPropsWithoutRef<'div'> {
  shrineImprovements: ShrineImprovement[];
  onClickShrineImprovement: (si: ShrineImprovement) => void;
}

export function ShrineImprovementSection({
  shrineImprovements,
  onClickShrineImprovement,
  ...rest
}: ShrineImprovementSectionProps) {
  const [query, setQuery] = useState('');

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

  function filterAndSortShrineImprovements() {
    const filters = new ShrineImprovementFilters({
      query: query,
    });
    return shrineImprovements.filter((si) => filters.keep(si));
  }
  const filteredAndSortedShrineImprovements = filterAndSortShrineImprovements();

  return (
    <div className="overlay-card-container" {...rest}>
      <div
        className="overlay-card-widget-container"
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'start',
          alignItems: 'center',
        }}
      >
        <FormGroup>
          <div className="search-filter-container">
            <TextField
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  window.dispatchEvent(new CustomEvent('escape'));
                }
              }}
              label="Search Shrine Improvements"
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
              style={{ marginBottom: '-.5vw' }}
              sx={{ type: 'search' }}
            ></TextField>
          </div>
        </FormGroup>
      </div>

      <ShrineImprovementList
        shrineImprovements={filteredAndSortedShrineImprovements}
        onClickShrineImprovement={onClickShrineImprovement}
      ></ShrineImprovementList>
    </div>
  );
}
