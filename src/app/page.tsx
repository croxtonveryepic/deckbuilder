'use client';
import { Box, Container, Modal } from "@mui/material";
import CardList, { ShrineList, ShrineImprovementList, BaseCardList, EssenceList } from "./components/card-list";
import { base_cards } from "./cardlists/base-cards";
import { shrines } from "./cardlists/shrines";
import { essences } from "./cardlists/essences";
import { shrine_improvements } from "./cardlists/shrine-improvements";
import { CardType, ImprovedShrine } from "./components/card";
import { useState } from "react";
import Card from "./components/card";
import { Deck } from "./components/card-list";
import { idGenerator } from "./utils";
import Image from "next/image";

export class DeckSlot {
  base_card: string;
  overlay: string;
  id: number;

  constructor(base_card: string, overlay = '') {
    this.base_card = base_card
    this.overlay = overlay
    this.id = newId()
  }
}

class ModalStatus {
  open: boolean;
  position: number;

  constructor(open: boolean, pos: number) {
    this.open = open;
    this.position = pos;
  }
}

const newId = idGenerator();

export default function Home() {
  const [shrineMode, setShrineMode] = useState(true);
  const [shrine, setShrine] = useState('')
  const [shrineImprovement, setShrineImprovement] = useState('')
  const [deck, setDeck] = useState(new Array<DeckSlot>);
  const [baseCardModal, setBaseCardModal] = useState(new ModalStatus(false, 0))

  function addBaseCard(card: string) {
    // if(e.type === 'click') {
    //   setDeck([...deck, new DeckSlot(card)])
    // } else if(e.type === 'contextmenu') {
      setBaseCardModal(new ModalStatus(true, base_cards.indexOf(card)))
    // }
  }

  function toggleShrineMode() {
    setShrineMode(!shrineMode);
  }

  function removeCard(id: number) {
    setDeck(deck.filter((card) => {
      return id !== card.id
    }))
  }

  return (
    <Box>
      <Container className="deck-container">
        <Container className="deck-widget-container">
          <button onClick={toggleShrineMode}>Toggle Shrine Mode</button>
        </Container>
        <Deck shrine={shrine} shrine_improvement={shrineImprovement} card_list={deck} onClickBaseCard={removeCard}></Deck>
      </Container>
      <Container className="base-card-container">
        <Container className="base-card-widget-container">
          button stuff
        </Container>
        {shrineMode ? (
          <ShrineList card_list={shrines} onClickShrine={setShrine}></ShrineList>
          ) : (
            <BaseCardList card_list={base_cards} onClickBaseCard={(card_name) => setBaseCardModal(new ModalStatus(true, base_cards.indexOf(card_name)))}></BaseCardList>
          )
        }
      </Container>
      <Container className="overlay-card-container">
        <Container className="overlay-card-widget-container">
          button stuff
        </Container>
        {shrineMode ? (
          <ShrineImprovementList card_list={shrine_improvements} onClickShrineImprovement={setShrineImprovement}></ShrineImprovementList>
        ) : (
          <EssenceList essence_list={essences}></EssenceList>
        )
      }
      </Container>
      <Modal open={baseCardModal.open}>
        <Image src={'/assets/base-cards/' + base_cards[baseCardModal.position] + '.png'} alt={base_cards[baseCardModal.position]}
          width="739"
          height="1035"
        />
      </Modal>
    </Box>
  );
}
