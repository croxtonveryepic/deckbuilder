import Image from "next/image";
import { Container } from "@mui/material";

export enum CardType {
    Shrine = "shrines",
    BaseCard = "base-cards",
    ShrineImprovement = "shrine-improvements",
    Essence = "essences",
}

export default function Card({card_name, card_type, onClick}: {card_name: string, card_type: CardType, onClick?: (arg0: string) => void}) {
    return (
        <Container className="card">
            <Image src={'/assets/' + card_type + '/' + card_name + '.png'} alt={card_name} 
                width="145"
                height="203"
                onClick={(e) => onClick && onClick(card_name)}
            />
        </Container>
    )
}

export function ImprovedShrine({shrine, shrine_improvement}: {shrine: string, shrine_improvement: string}) {
    return (
        <Container className="card">
            <Image className="base-card" src={'/assets/shrines/' + shrine + '.png'} alt={shrine} 
                width="145"
                height="203"
            />
            <Image className="overlay" src={'/assets/shrine-improvements/' + shrine_improvement + '.png'} alt={shrine_improvement} 
                width="145"
                height="203"
            />
        </Container>
    )
}

export function ImbuedCard({card, essence}: {card: string, essence: string}) {
    return (
        <Container className="card">
            <Image className="base-card" src={'/assets/base-cards/' + card + '.png'} alt={card} 
                width="145"
                height="203"
            />
            <Image className="overlay" src={'/assets/essences/' + essence + '.png'} alt={essence} 
                width="145"
                height="203"
            />
        </Container>
    )
}