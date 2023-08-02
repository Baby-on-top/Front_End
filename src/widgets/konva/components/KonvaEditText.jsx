import { useEffect, useRef, useState } from "react"
import { Text, Transformer } from "react-konva";
import Konva from "konva";

// const KonvaEditText = (props) => {
//     const {
//         // textNodeRef,
//     } = props;

//     const textNodeRef = useRef(null);
//     const [isEditing, setIsEditing] = useState(false);
//     return (
//         <div>
//             <div ref={textNodeRef}></div>
//         <div>
//         {isEditing && (
//             <textarea/>
//         )}
//         </div>
//     </div>
//     )
// }

// export default KonvaEditText;

export default function KonvaEditText() {
    const textRef = useRef(null);
    const textNodeRef = useRef();
    const [isEditing, setIsEditing] = useState(false);
    const [textareaValue, setTextareaValue] = useState('');
    const transformerRef = useRef();

    // const [stage, setStage] = useState();
    useEffect(() => {
        const textNode = new Konva.Text({
            text: 'Some text here~~~~',
            x: 50,
            y: 80,
            fontSize: 20,
            draggable: true,
            width: 200,
        });

        textNodeRef.current = textNode;

        textNode.on('dblclick', handleDblClick);
    },[]);

    useEffect(() => {
        if(isEditing) {
            console.log("editing...")
        } else {
            console.log("editing X...")
            console.log(textNodeRef);
            textNodeRef.current.show();
            // transformerRef.current.nodes([textNodeRef.current])
        }
    }, [isEditing]);

    const handleDblClick = () => {
        console.log("더블클릭...");
        setIsEditing(true);
        // setTextareaValue(textNode.text());
        // textNode.hide();
    }

    return (
        <>
            {/* <div ref={textNodeRef}></div> */}
            <Text ref={textNodeRef} 
                text= 'Some text here~~~~'
                x = {50}
                y = {80}
                fontSize={20}
                draggable = {true}
                width = {200}
                onDblClick={handleDblClick}/>
            {/* {<Transformer ref={transformerRef}/>} */}
        <>
        {isEditing && (
            <textarea/>
        )}
        </>
    </>
    )
}