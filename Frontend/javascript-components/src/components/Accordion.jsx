import React, {useState} from 'react';

export default function Accordion(){

    // const [clickAccordion, setClickAccordion] = useState(null);
    const [clickAccordion, setClickAccordion] = useState({});


    // for singe item at a time and open item will be close if click to oprn other item
    // const handleClick = (index) =>{
    //     setClickAccordion(clickAccordion === index? null : index)
    // }

    const handleClick = (index) =>{
        setClickAccordion((prev) =>({
            ...prev,
            [index] : !prev[index],
        }));
    }

    return(
        <>
            <div>
                <button onClick={() => handleClick(0)}>
                    HTML
                    <span
                    aria-hidden={true}
                    className="accordion-icon"
                    />
                </button>
                {/* {clickAccordion === 0 &&( */}
                {clickAccordion[0] &&(
                    <div>
                        The HyperText Markup Language or HTML is the
                        standard markup language for documents designed to
                        be displayed in a web browser.
                    </div>
                )}
                <hr />
                <button onClick={() => handleClick(1)}>
                    CSS
                    <span
                        aria-hidden={true}
                        className="accordion-icon"
                    />

                </button>
                {/* {clickAccordion === 1 &&( */}
                {clickAccordion[1] &&(
                    <div>
                        Cascading Style Sheets is a style sheet language
                        used for describing the presentation of a document
                        written in a markup language such as HTML or XML.
                    </div>
                )}
                <hr />
                <button onClick={() => handleClick(2)}>
                    JavaScript
                    <span
                        aria-hidden={true}
                        className="accordion-icon"
                    />

                </button>
                {/* {clickAccordion === 2 &&( */}
                {clickAccordion[2] &&(
                    <div>
                        JavaScript, often abbreviated as JS, is a
                        programming language that is one of the core
                        technologies of the World Wide Web, alongside HTML
                        and CSS.
                    </div>
                )}

            </div>
        
        </>
    )
}