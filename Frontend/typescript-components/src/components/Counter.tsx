import { useState } from "react";

function CounterApp(){
    const [count, setCount] = useState<number>(0);

    function decreaseCount(){
        if(count > 0){
            setCount(count - 1)
        }
    }

    return(
        <>
            <button onClick={() => setCount(count + 1)}>
            Increase Counter : {count}
            </button>

            <button onClick={decreaseCount}>
            Increase Counter : {count}
            </button>
        </>
    )

}

export default CounterApp;