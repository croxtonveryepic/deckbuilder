import { Element } from '../cardlists/enums';
import Image from 'next/image';

const wh = 1500;
export function ElementButtons({
    selected,
    onElementClicked,
    includeNeutral,
}: {
    selected: Element[];
    onElementClicked: (e: Element) => void;
    includeNeutral: boolean;
}) {
    let airClass,
        darkClass,
        earthClass,
        fireClass,
        lightClass,
        waterClass,
        neutralClass;
    selected.forEach((el) => {
        switch (el) {
            case Element.Air:
                airClass = 'selected';
                break;
            case Element.Dark:
                darkClass = 'selected';
                break;
            case Element.Earth:
                earthClass = 'selected';
                break;
            case Element.Fire:
                fireClass = 'selected';
                break;
            case Element.Light:
                lightClass = 'selected';
                break;
            case Element.Water:
                waterClass = 'selected';
                break;
            case Element.Neutral:
                neutralClass = 'selected';
                break;
        }
    });

    return (
        <div className="element-button-container">
            <button
                className={airClass}
                onClick={() => onElementClicked(Element.Air)}
            >
                <Image
                    src="/assets/misc/airwhiteongrey.png"
                    alt="Air Icon"
                    width={wh}
                    height={wh}
                ></Image>
            </button>
            <button
                className={darkClass}
                onClick={() => onElementClicked(Element.Dark)}
            >
                <Image
                    src="/assets/misc/darkwhiteonpurple.png"
                    alt="Dark Icon"
                    width={wh}
                    height={wh}
                ></Image>
            </button>
            <button
                className={fireClass}
                onClick={() => onElementClicked(Element.Fire)}
            >
                <Image
                    src="/assets/misc/firewhiteonred.png"
                    alt="Fire Icon"
                    width={wh}
                    height={wh}
                ></Image>
            </button>
            <button
                className={earthClass}
                onClick={() => onElementClicked(Element.Earth)}
            >
                <Image
                    src="/assets/misc/earth2whiteongreen.png"
                    alt="Earth Icon"
                    width={wh}
                    height={wh}
                ></Image>
            </button>
            <button
                className={lightClass}
                onClick={() => onElementClicked(Element.Light)}
            >
                <Image
                    src="/assets/misc/lightwhiteonyellow.png"
                    alt="Light Icon"
                    width={wh}
                    height={wh}
                ></Image>
            </button>
            <button
                className={waterClass}
                onClick={() => onElementClicked(Element.Water)}
            >
                <Image
                    src="/assets/misc/waterwhiteonblue.png"
                    alt="Water Icon"
                    width={wh}
                    height={wh}
                ></Image>
            </button>
            {includeNeutral &&
                (neutralClass ? (
                    <button
                        className={neutralClass}
                        onClick={() => onElementClicked(Element.Neutral)}
                    >
                        <Image
                            src="/assets/misc/multicolor.png"
                            alt="Multicolor Icon"
                            width={wh}
                            height={wh}
                        ></Image>
                    </button>
                ) : (
                    <button
                        className={neutralClass}
                        onClick={() => onElementClicked(Element.Neutral)}
                    >
                        <Image
                            src="/assets/misc/multicolor-transparent.png"
                            alt="Multicolor Icon"
                            width={wh}
                            height={wh}
                        ></Image>
                    </button>
                ))}
        </div>
    );
}

export function SomeElements({ elements }: { elements: Set<Element> }) {
    return (
        <div className="some-elements">
            {elements.has(Element.Air) && (
                <Image
                    src="/assets/misc/airwhiteongrey.png"
                    alt="Air Icon"
                    width={wh}
                    height={wh}
                ></Image>
            )}
            {elements.has(Element.Dark) && (
                <Image
                    src="/assets/misc/darkwhiteonpurple.png"
                    alt="Dark Icon"
                    width={wh}
                    height={wh}
                ></Image>
            )}
            {elements.has(Element.Fire) && (
                <Image
                    src="/assets/misc/firewhiteonred.png"
                    alt="Fire Icon"
                    width={wh}
                    height={wh}
                ></Image>
            )}
            {elements.has(Element.Earth) && (
                <Image
                    src="/assets/misc/earth2whiteongreen.png"
                    alt="Earth Icon"
                    width={wh}
                    height={wh}
                ></Image>
            )}
            {elements.has(Element.Light) && (
                <Image
                    src="/assets/misc/lightwhiteonyellow.png"
                    alt="Light Icon"
                    width={wh}
                    height={wh}
                ></Image>
            )}
            {elements.has(Element.Water) && (
                <Image
                    src="/assets/misc/waterwhiteonblue.png"
                    alt="Water Icon"
                    width={wh}
                    height={wh}
                ></Image>
            )}
        </div>
    );
}
