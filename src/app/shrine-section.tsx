import { FormGroup } from '@mui/material';
import { ComponentPropsWithoutRef, useState } from 'react';
import { ElementButtons } from './components/element-buttons';
import { ShrineList } from './components/card-list';
import { handleElementFilterClicked } from './utils';
import { Shrine } from './cardlists/shrines';
import { Element } from './cardlists/enums';

function filterAndSortShrines(shrines: Shrine[], elements: Element[]) {
  let filtered =
    elements.length === 0
      ? shrines
      : shrines.filter((s) => {
          return elements.includes(s.identity);
        });
  return filtered.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
}

interface ShrineSectionProps extends ComponentPropsWithoutRef<'div'> {
  shrines: Shrine[];
  onClickShrine: (s: Shrine) => void;
}

export function ShrineSection({
  shrines,
  onClickShrine,
  ...rest
}: ShrineSectionProps) {
  const [elements, setElements] = useState([] as Element[]);

  const filteredAndSortedShrines = filterAndSortShrines(shrines, elements);

  return (
    <div className="base-card-container" {...rest}>
      <div className="base-card-widget-container">
        <FormGroup
          className="element-filter"
          style={{ width: '100%', paddingLeft: '8%', paddingRight: '8%' }}
        >
          <ElementButtons
            selected={elements}
            onElementClicked={(e: Element) =>
              handleElementFilterClicked(e, elements, setElements)
            }
          ></ElementButtons>
        </FormGroup>
      </div>
      <ShrineList
        shrines={filteredAndSortedShrines}
        onClickShrine={onClickShrine}
      ></ShrineList>
    </div>
  );
}
