import useImage from "use-image";
import { useRef } from "react";
import { Image } from "react-konva";

// rest가 이미지 크기 관련된 무엇인 것 같음
export default function KonvaAddImage({url, ...rest}) {
    const [image] = useImage(url);
    const imageRef = useRef();

    return (
        <Image
            ref={imageRef}
            {...rest}
            image={image}
            draggable>
        </Image>
    )
}