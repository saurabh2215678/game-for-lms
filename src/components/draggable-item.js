import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import {getDistanceBetweenElements, getKeyByValue} from '../commonFunctions';


const DraggableItem = ({answer, index, fillBlanksRefs, fillInTheBlanksResults, setFillInTheBlanksResults}) => {
    const dragElementRef = useRef();
    const itemRef = useRef();
    const [animate, setAnimate] = useState({x: 0, y:0, scale: 1 });

    useEffect(()=>{
        // console.log(fillInTheBlanksResults);
        if(!getKeyByValue(fillInTheBlanksResults, answer)){
            setAnimate({x: 0, y:0, scale: 1 });
        }

    },[fillInTheBlanksResults]);



    const handleDragEnd = (event, info, i) => {
        delete fillInTheBlanksResults[getKeyByValue(fillInTheBlanksResults, answer)];
        for (const item in fillBlanksRefs.current) {
            if(getDistanceBetweenElements(event.target, fillBlanksRefs.current[item]) < 80){
                const collectorPosition = fillBlanksRefs.current[item].getBoundingClientRect();
                const draggerPosition = itemRef.current.getBoundingClientRect();
                fillInTheBlanksResults[item] = answer;
                const diffX = collectorPosition.x - draggerPosition.x
                const diffy = collectorPosition.y - draggerPosition.y
                setAnimate({x: 0, y:0});
                setTimeout(() => {
                    setAnimate({x: diffX, y:diffy, scale: 1 });
                    setTimeout(() => {
                        setAnimate({x: diffX - 5, y:diffy + 5, scale: 0.8 });
                    }, 10);
                }, 10);

            }else{
                
                setAnimate({x: 0, y:0});
            }
        }
        setFillInTheBlanksResults({...fillInTheBlanksResults});
    }

    return(
        <li ref={itemRef}>
            <motion.div 
                drag 
                animate={animate}
                ref={dragElementRef}
                dragConstraints={{ left: 0, right: 0, top: 0, bottom:0}}
                // dragTransition={{ bounceStiffness: 150, bounceDamping: 30 }}
                dragElastic={1}
                whileHover={{ cursor: "grab" }}
                whileDrag={{ cursor: "grabbing" }}
                whileTap={{ cursor: "grabbing" }}
                onDragEnd={handleDragEnd}
            ><span>{answer}</span></motion.div>
        </li>
    );
}
export default DraggableItem;