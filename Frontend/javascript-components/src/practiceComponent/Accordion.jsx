import React, {useState} from 'react';

export default function Accordion(){

    const [clickAcc, setClickAcc] = useState(null);

    const data = [
        {
            header: "Header 1",
            content: "lorem23"
        },
        {
            header: "Header 2",
            content: "Content 2"
        },
        {
            header: "Header 3",
            content: "Content 3"
        },
        {
            header: "Header 4",
            content: "Content 4"
        }
    ]

    function handleClick(index){
        setClickAcc(clickAcc === index? null : index)
    }

    return(
        <div className='componentContainer'>

            {data.map((item, index)=> (
                <div key={index} className='accordionContainer'>
                    <div
                    className='accordionHeader' onClick={() => handleClick(index)}
                    >
                        {item.header}
                    </div>
                    {clickAcc === index &&(
                        <div className="accordionBody">{item.content}</div>
                    )}
                </div>
            ) )}

        </div>
    )

}