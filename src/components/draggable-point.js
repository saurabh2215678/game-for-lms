import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {getDistanceBetweenElements, getKeyByValue} from "../commonFunctions";
import { ReactSVG } from "react-svg";

const DraggablePoint = ({icon, Qindex, collectorRefs, matchResults, setMatchResults}) => {
    const dragElementRef = useRef();
    const itemRef = useRef();
    const [animate, setAnimate] = useState({x: 0, y:0});

    useEffect(()=>{
        // console.log(matchResults);
        if(!getKeyByValue(matchResults, Qindex)){
            setAnimate({x: 0, y:0, scale: 1 });
        }

    },[matchResults]);



    const handleDragEnd = (event, info, i) => {
        delete matchResults[getKeyByValue(matchResults, Qindex)];
        for (const item in collectorRefs.current) {
            if(getDistanceBetweenElements(event.target, collectorRefs.current[item]) < 30){
                const collectorPosition = collectorRefs.current[item].getBoundingClientRect();
                const draggerPosition = itemRef.current.getBoundingClientRect();

                matchResults[item] = Qindex;

                const diffX = collectorPosition.x - draggerPosition.x
                const diffy = collectorPosition.y - draggerPosition.y
                setAnimate({x: 0, y:0});
                setTimeout(() => {
                    setAnimate({x: diffX, y:diffy});
                    setTimeout(() => {
                        setAnimate({x: diffX, y:diffy});
                    }, 10);
                }, 10);
            }else{
                setAnimate({x: 0, y:0});
            }
        }
        setMatchResults({...matchResults});
    }

    return (
        <div ref={itemRef} className="point_box_draggable">
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
            >
                <ReactSVG src={icon} className='point_svg'/>
            </motion.div>
        </div>
    )
}
export default DraggablePoint;