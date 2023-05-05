import React, { useEffect, useRef, useState } from "react";
import Countdown from 'react-countdown';
import logoImg from '../assets/images/logo.png';
import {CircularProgressbar,buildStyles} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Button from "./button";
import DraggableItem from "./draggable-item";
import fillBlank from '../assets/images/fill_blank.png'
import DraggablePoint from "./draggable-point";
import { ReactSVG } from 'react-svg';

import orangePoint from "../assets/images/orange-circle.svg"
import yellowPoint from "../assets/images/yellow-circle.svg"
import greenPoint from "../assets/images/green-circle.svg"
import tealPoint from "../assets/images/teal-circle.svg"
import purplePoint from "../assets/images/purple-circle.svg"
import whitePoint from "../assets/images/white-circle.svg"



function secondsToArray(sec){
    var secondsArray = [];
    for(let percentage = sec; percentage >= 0; ){
        var percentageValue = percentage * 100 / sec
        secondsArray.push(percentageValue);
        percentage--
    }
    return secondsArray;
}

const Questions = ({
    data, 
    setResults, 
    results, 
    setquestionIndex, 
    questionIndex,
    lavel,
    setlavelIndex,
    setShowResult
}) => {

    const [answerMarked, setAnswerMarked] = useState(null);
    const [time, setTime] = useState();
    const countdownRef = useRef();
    const constraintsRef = useRef(null);
    const matchConstraintsRef = useRef(null);
    const fillBlanksRefs = useRef({});
    const collectorRefs = useRef({});
    const [fillInTheBlanksResults, setFillInTheBlanksResults] = useState({});
    const [matchResults, setMatchResults] = useState({});
    const [touched, setTouched] = useState(false);
    
    useEffect(()=>{
        if(!(data.id == 2 || data.id == 3)){
            var nowDate = Date.now() + (data['time-remaining'] * 1000)
            setTime(nowDate); 
        }     
    },[]);

    

    useEffect(()=>{
        if(!(data.id == 2 || data.id == 3)){
            setTime(Date.now() + (data['time-remaining'] * 1000));
            countdownRef?.current?.start();
        }
    },[data]);



const handleNext = (param) => {
    data.passed = true;
    data.lavel = lavel;
    if(data.type == "true-false"){

        if(param){
            var myBool = param == 'true';
            data['user-answer'] = myBool;
            data['user-answer-is'] = myBool == data['correct-answer']  ? 'correct' :
                                     myBool != null ? 'incorrect' : 'not attempted';
        }else{

            data['user-answer'] = answerMarked;
            data['user-answer-is'] = answerMarked == data['correct-answer']  ? 'correct' :
                                     answerMarked != null ? 'incorrect' : 'not attempted';
        }

    }
    
    if(data.type == "fill-in-the-blanks"){
        const userAns = Object.values(fillInTheBlanksResults);
        data['user-answer'] = userAns;
        data['user-answer-is'] = JSON.stringify(userAns) == JSON.stringify(data['correct-answer'])  ? 'correct' :
                                [...userAns] != null ? 'incorrect' : 'not attempted';
    }

    if(data.type == "match-following"){
        const userAns = Object.values(matchResults);        
        // console.log(userAns);
        data['user-answer'] = userAns;
        data['user-answer-is'] = JSON.stringify(userAns) == JSON.stringify(data['correct-answer'])  ? 'correct' :
                                [...userAns] != null ? 'incorrect' : 'not attempted';
    }

    data['viewed-time'] = Date.now();
    const dataResult = results.find((result)=> result.id == data.id);
    if(!dataResult){
        setResults([...results, data]);
        setquestionIndex(questionIndex + 1);
    }
    setAnswerMarked(null);
}
const handleNextLavel = () => {
    data.passed = true;
    data.lavel = lavel;
    if(data.type == "true-false"){
        data['user-answer'] = answerMarked;
        data['user-answer-is'] = answerMarked == data['correct-answer']  ? 'correct' :
                                 answerMarked != null ? 'incorrect' : 'not attempted';
    }
    
    if(data.type == "fill-in-the-blanks"){
        const userAns = Object.values(fillInTheBlanksResults);
        data['user-answer'] = userAns;
        data['user-answer-is'] = JSON.stringify(userAns) == JSON.stringify(data['correct-answer'])  ? 'correct' :
                                [...userAns] != null ? 'incorrect' : 'not attempted';
    }

    if(data.type == "match-following"){
        const userAns = Object.values(matchResults);        
        console.log(userAns);
        data['user-answer'] = userAns;
        data['user-answer-is'] = JSON.stringify(userAns) == JSON.stringify(data['correct-answer'])  ? 'correct' :
                                [...userAns] != null ? 'incorrect' : 'not attempted';
    }

    data['viewed-time'] = Date.now();
    const dataResult = results.find((result)=> result.id == data.id);
    if(!dataResult){
        setResults([...results, data]);
        setShowResult(true);
        setlavelIndex(1);
        setquestionIndex(0);
    }
    setAnswerMarked(null);
}

const percentageValue = (i) => {
    return secondsToArray(data['time-remaining'])[i];
}

const handleFilled = (index) =>{
    if(fillInTheBlanksResults[index]){
        return 'filled';
    }else{
        return 'not-filled';
    }
}

const pointIcon = (index) => {
    return index == 0 ? orangePoint :
           index == 1 ? yellowPoint :
           index == 2 ? greenPoint :
           index == 3 ? tealPoint : purplePoint
}

    return(
        <div className={`question_root ${data.type}`}>
            <div className="container">
                <div className="logo_wrapper">
                    <a href="#" className="logo">
                        <img src={logoImg} alt="" />
                    </a>
                </div>

                <div className="text-center top_rrm">
                    <h4 className="font52 fw900 color_theme">
                        {
                            data.type == "true-false" ? 'TRUE or FALSE' :
                            data.type == "fill-in-the-blanks" ? 'Fill in the blanks' : 'MATCH THE FOLLOWING'
                        }
                    </h4>
                    {time && <Countdown 
                        ref={countdownRef}
                        date={time} 
                        renderer={props => 
                            <div className="timer_wrapper">
                                <CircularProgressbar
                                    value={percentageValue(props.total / 1000)}
                                    styles={buildStyles({
                                    pathTransitionDuration: 0.15
                                    })}
                                />
                                <div className="couter-time">
                                    <span className="color_theme font19">{props.total / 1000}</span>
                                    <br/>Sec
                                </div>
                            </div>
                                
                            }
                        onComplete={()=>{
                            if(data.type == 'true-false' ){
                                handleNextLavel();
                            }else{
                                handleNext();
                            }
                        }}
                    />}
                    
                </div>
                {data.type == "fill-in-the-blanks" &&
                    <p className="font29 text-center color_dark ttp_txt">Fill the blanks with the most appropriate word in the following statements:</p>
                }
                {data.type == "match-following" &&
                    <p className="font29 text-center color_dark ttp_txt">Match the following behaviours with their categories of disrespect and abuse:</p>
                }
                <div className="box mt-4">
                    <div className="questionBox p-5">
                        {data.type == "true-false" &&
                        <>
                            <h3 className="text-center font42 fw700 color_theme" dangerouslySetInnerHTML={{__html: data.question}}></h3>
                            <div className={`true-false ${touched ? 'touched' : ''}`}>
                                <div onClick={()=>{setAnswerMarked(true); handleNext('true')}} className={`btn font38 ${answerMarked == true ? 'active' : ''}`}>
                                    <div className="btn_bg"></div>
                                    <span>True</span>
                                </div>
                                <div onClick={()=>{setAnswerMarked(false); handleNext('false')}} className={`btn font38 ${answerMarked == false ? 'active' : ''}`}>
                                    <div className="btn_bg"></div>
                                    <span>False</span>
                                </div>
                            </div>
                        </>}

                        {data.type == "fill-in-the-blanks" &&
                        <>
                            <h3 className="font31 fw800 color_theme text-center mb-4 pb-2">Select and drop the appropriate word from the<br/>boxes below.</h3>
                            <div className="fill-in-the-blanks" ref={constraintsRef}>
                                <ul className="fill_list">
                                    {data.question.map((question, index)=> 
                                        <li key={index}>
                                            {question.split('_____')[0]}
                                            <div className={`item_box ${handleFilled(index)}`} ref={ref => fillBlanksRefs.current[index] = ref}>
                                                <img className="fill_blank" src={fillBlank}/>
                                            </div>
                                            {question.split('_____')[1]}
                                        </li>
                                    )}
                                </ul>

                                <ul className="options">
                                    {data['arrangement'].map((answer, index)=> 
                                        <DraggableItem 
                                            key={index} 
                                            answer={answer} 
                                            index={index} 
                                            fillBlanksRefs={fillBlanksRefs}
                                            fillInTheBlanksResults= {fillInTheBlanksResults}
                                            setFillInTheBlanksResults= {setFillInTheBlanksResults}
                                        />
                                    )}
                                </ul>
                            </div>
                        </>
                        }

                        {data.type == "match-following" &&
                        <>
                            <h3 className="font28 fw800 color_theme text-center mb-4 pb-2">Drag the number and drop it in front of the<br/> correct category.</h3>
                            <div className="match-following" ref={matchConstraintsRef}>
                                <ul className="fill_list list-left">
                                    {data.question.map((question, index)=> 
                                        <li key={index}>
                                            {question}
                                            <div className="point_wrapper">
                                                <div className="point_box">
                                                    <ReactSVG src={pointIcon(index)} className='point_svg'/>
                                                </div>
                                                <DraggablePoint
                                                    Qindex = {question}
                                                    icon = {pointIcon(index)}
                                                    collectorRefs = {collectorRefs}
                                                    matchResults = {matchResults}
                                                    setMatchResults = {setMatchResults}
                                                />
                                            </div>
                                        </li>
                                    )}
                                </ul>

                                <ul className="fill_list list-right">
                                    {data['arrangement'].map((answer, index)=> 
                                        <li key={index}>
                                            <div className="point_collector" ref={ref => collectorRefs.current[index] = ref}>
                                                <ReactSVG src={whitePoint} className='point_svg'/>
                                            </div>
                                            {answer}
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </>
                        }
                    </div>
                </div>

                {data.type != 'true-false' &&
                    <div className="text-center pt-3 mt-5 mb-4">
                    <Button onClick={handleNext} className="btn pink_btn font32">{
                        data.id == 5 ? 'Submit' : 'Next'
                    }</Button>
                </div>}
            </div>
        </div>
    )
}
export default Questions;