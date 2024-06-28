import { Grid } from "@mui/material";
import Card from "./card"
import { CardType } from "./card";
import { ImprovedShrine, ImbuedCard } from "./card";
import { DeckSlot } from "../page";

export default function CardList({card_list, card_type}: {card_list: string[], card_type: CardType}) {
    const images = card_list.map(card_name => 
        <Grid item key={card_name}>
            <Card card_name={card_name} card_type={card_type}></Card>
        </Grid>
    );
    
    return (
        <Grid container spacing={2}>
            {images}
        </Grid>
    )
}

export function ShrineList({card_list, onClickShrine}: {card_list: string[], onClickShrine: (arg0: string) => void}) {
    const images = card_list.map(card_name => 
        <Grid item key={card_name}>
            <Card card_name={card_name} card_type={CardType.Shrine} onClick={onClickShrine}></Card>
        </Grid>
    );
    
    return (
        <Grid container spacing={2}>
            {images}
        </Grid>
    )
}

export function ShrineImprovementList({card_list, onClickShrineImprovement}: {card_list: string[], onClickShrineImprovement: (arg0: string) => void}) {
    const images = card_list.map(card_name => 
        <Grid className="unbacked-overlay" item key={card_name}>
            <Card card_name={card_name} card_type={CardType.ShrineImprovement} onClick={onClickShrineImprovement}></Card>
        </Grid>
    );
    
    return (
        <Grid container spacing={2}>
            {images}
        </Grid>
    )
}

export function BaseCardList({card_list, onClickBaseCard}: {card_list: string[], onClickBaseCard: (arg0: string) => void}) {
    const images = card_list.map(card_name => 
        <Grid item key={card_name}>
            <Card card_name={card_name} card_type={CardType.BaseCard} onClick={onClickBaseCard}></Card>
        </Grid>
    );
    
    return (
        <Grid container spacing={2}>
            {images}
        </Grid>
    )
}

export function Deck({shrine, shrine_improvement, card_list, onClickBaseCard}: {shrine: string, shrine_improvement: string, card_list: DeckSlot[], onClickBaseCard: (arg0: number) => void}) {
    const images = card_list.map(c => 
        <Grid item key={c.id}>
            <Card card_name={c.base_card} card_type={CardType.BaseCard} onClick={() => onClickBaseCard(c.id)}></Card>
        </Grid>
    );
    
    return (
        <Grid container spacing={2}>
            <Grid item>
                {shrine_improvement === '' ? (
                <Card card_name={shrine} card_type={CardType.Shrine}></Card>
                ) : (
                <ImprovedShrine shrine={shrine} shrine_improvement={shrine_improvement}></ImprovedShrine>
                )}
            </Grid>
            {images}
            {/* <Grid item>
                <ImbuedCard card="absorbmagic" essence="airessence-1"></ImbuedCard>
            </Grid> */}
        </Grid>
    )
}

export function EssenceList({essence_list}: {essence_list: string[]}) {
    const images = essence_list.map(e => 
        <Grid className="unbacked-overlay" item key={e}>
            <Card card_name={e} card_type={CardType.Essence}></Card>
        </Grid>
    );
    
    return (
        <Grid container spacing={2}>
            {images}
        </Grid>
    )
}