export default function KonvaEditText() {

    return (
        <textarea
            id="textarea"
            value={textareaValue}
            style={{
                position: 'absolute',
                top: 80,
                left: 50,
                fontSize: 20
            }}>

        </textarea>   
    )
}