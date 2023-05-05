import React, { useEffect, useRef, useState } from "react";
import { ReactSVG } from 'react-svg';
import logoImg from '../assets/images/logo.png';
import looseSvg from '../assets/images/oops.svg';
import winSvg from '../assets/images/wow.svg';
import Button from "./button";

import orangePoint from "../assets/images/orange-circle.svg"
import yellowPoint from "../assets/images/yellow-circle.svg"
import greenPoint from "../assets/images/green-circle.svg"
import tealPoint from "../assets/images/teal-circle.svg"
import purplePoint from "../assets/images/purple-circle.svg"

import {data} from '../data';



const pointIcon = (index) => {
    return index == 0 ? orangePoint :
           index == 1 ? yellowPoint :
           index == 2 ? greenPoint :
           index == 3 ? tealPoint : purplePoint
}



const Result = ({results, setShowResult, completed, setLastScreen}) => {

    const [passed, setPassed] = useState(false);
    const questionRef = useRef();
    const [questionWidth, setQuestionWidth] = useState(0);
    var lastLabel = results[results.length - 1].lavel;
    var thisLavelResults = results.filter((item)=>item.lavel == lastLabel);
    var isCorrect = !thisLavelResults.find((item)=> item['user-answer-is'] != 'correct');

    useEffect(()=>{
        if(questionRef?.current?.offsetWidth){
            setQuestionWidth(questionRef?.current?.offsetWidth);
        }
    },[]);
    
    window.addEventListener("resize",  function(){
        if(questionRef?.current?.offsetWidth){
            setQuestionWidth(questionRef?.current?.offsetWidth)
        }
    });
    useEffect(()=>{
        if(lastLabel != 1){
            if(isCorrect){
                setPassed(true);
            }
        }else{// in first lavel
            if(isCorrect && thisLavelResults.length >= 3){
                setPassed(true);
            }
        }
    },[results]);

    const getIndexFromQuestion = (str) => {
       return thisLavelResults[0]['question'].indexOf(thisLavelResults[0]['question'].find((item)=> item == str)); 
    }

    const passedText = () => {
        return lastLabel == 1 ? 'You truly understand the importance of accountability in healthcare.':
                                        lastLabel == 2 ? 'You understand the manifestation<br/> of workplace stress in healthcare<br/> services.':
                                                            'You are fully aware of the categories of disrespect and abuse'
    }
   
    const failedText = () => {
        return lastLabel == 1 ? 'Oops! you missed some.':
                                        lastLabel == 2 ? 'Oh No! Seems like you got<br/> something wrong. ':
                                                            'Sorry, something didn’t match!'
    }
    
    return(
        <div className={`result_root ${passed ? 'passed': 'failed'} ${thisLavelResults[0]['lavel'] == 3 ? 'match-following' : ''}`}>
            <div className="container">
                <div className="logo_wrapper">
                    <a href="#" className="logo">
                        <img src={logoImg} alt="" />
                    </a>
                </div>
                <div className="result_box">
                        {passed ?
                        <>
                            <div className="passed">
                                <div className="text-center">
                                    <ReactSVG src={winSvg} className='result_icon'/>
                                    <h3 className="font34 color_theme mb-5 fw900">
                                        {lastLabel == 1 ? 'Wow! You are right.':
                                        lastLabel == 2 ? 'Yay! You’re absolutely right.': 'Wohoo! You are a great match!' 
                                        }
                                    </h3>
                                    <p className="font37 fw800 color_dark passed_txt" dangerouslySetInnerHTML={{__html: passedText()}}></p>
                                </div>
                                {completed ?
                                <div className="text-center my-4"><Button onClick={()=>setLastScreen(true)} className="btn pink_btn font32">Done</Button></div> :
                                <div className="text-center my-4"><Button onClick={()=>setShowResult(false)} className="btn pink_btn font32">Next Quiz</Button></div>}
                            </div> 
                        </>
                        :
                        <>
                            <div className="text-center">
                                <ReactSVG src={looseSvg} className='result_icon'/>
                                <h3 className="font34 color_theme mb-5 fw900" dangerouslySetInnerHTML={{__html: failedText()}}></h3>
                                {lastLabel == 1 &&  <p className="font29 mb-4">Here are the correct answers.</p>}
                            </div>
                            <div className="box_wrapeer">
                                {(thisLavelResults[0]['lavel'] == 2) ?
                                    <div>
                                        <div className="box">
                                            <div className="questionBox">
                                                <h3 className="font31 fw800 color_theme text-center mb-4 pb-2">Here are the correct answers.</h3>
                                                <div className="fill-in-the-blanks">
                                                    <ul className="fill_list">
                                                        {thisLavelResults[0]['question'].map((item, i)=> 
                                                            <li key={i}>
                                                                {item.split('_____')[0]}
                                                                <span>{thisLavelResults[0]['correct-answer'][i]}</span>
                                                                {item.split('_____')[1]}
                                                            </li>
                                                        )}
                                                        
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div> : (thisLavelResults[0]['lavel'] == 3) ?

                                    <div className="box">
                                        <div className="questionBox p-5">
                                            <h3 className="font31 fw800 color_theme text-center mb-4 pb-2">Here are the correct answers.</h3>
                                            <div className="match-following">

                                                <div className="fill_list list-left">
                                                    {thisLavelResults[0]['question'].map((item, index)=> 
                                                        <li key={index}>
                                                            {item}
                                                            <div className="point_wrapper">
                                                                <div className="point_box">
                                                                    <ReactSVG src={pointIcon(index)} className='point_svg'/>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    )}
                                                    
                                                </div>
                                                <div className="fill_list list-right">
                                                    <li>
                                                        <div className="point_collector">
                                                            <ReactSVG src={pointIcon(getIndexFromQuestion(thisLavelResults[0]['correct-answer'][2]))} className='point_svg'/>
                                                        </div>
                                                        {thisLavelResults[0]['arrangement'][2]}
                                                    </li>
                                                    
                                                    <li>
                                                        <div className="point_collector">
                                                            <ReactSVG src={pointIcon(getIndexFromQuestion(thisLavelResults[0]['correct-answer'][3]))} className='point_svg'/>
                                                        </div>
                                                        {thisLavelResults[0]['arrangement'][3]}
                                                    </li>
                                                    
                                                    <li>
                                                        <div className="point_collector">
                                                            <ReactSVG src={pointIcon(getIndexFromQuestion(thisLavelResults[0]['correct-answer'][4]))} className='point_svg'/>
                                                        </div>
                                                        {thisLavelResults[0]['arrangement'][4]}
                                                    </li>
                                                   
                                                    <li>
                                                        <div className="point_collector">
                                                            <ReactSVG src={pointIcon(getIndexFromQuestion(thisLavelResults[0]['correct-answer'][0]))} className='point_svg'/>
                                                        </div>
                                                        {thisLavelResults[0]['arrangement'][0]}
                                                    </li>
                                                    
                                                    <li>
                                                        <div className="point_collector">
                                                            <ReactSVG src={pointIcon(getIndexFromQuestion(thisLavelResults[0]['correct-answer'][1]))} className='point_svg'/>
                                                        </div>
                                                        {thisLavelResults[0]['arrangement'][1]}
                                                    </li>

                                                    {/* {thisLavelResults[0]['arrangement'].map((item, index)=> 
                                                        <li key={index}>
                                                            <div className="point_collector" ll={index}>
                                                                <ReactSVG src={pointIcon(getIndexFromQuestion(thisLavelResults[0]['correct-answer'][index]))} className='point_svg'/>
                                                            </div>
                                                            {item}
                                                        </li>
                                                    )} */}
                                                </div>

                                            </div>
                                        </div>
                                    </div> :
                                    <div className="box">
                                        <div className="result-table" style={{ '--qwidth' :  `${questionWidth}px`}}>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th ref={questionRef}>Questions</th>
                                                        <th>Answer</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        data[0].questions.map((item, i)=> 
                                                        <tr key={i}>
                                                            <td dangerouslySetInnerHTML={{__html: item.question}}></td>
                                                            <td><div>{item["correct-answer"] ? 'true' : 'false'}</div></td>
                                                        </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                }
                            </div>
                            {completed ?
                            <div className="text-center my-4"><Button onClick={()=>setLastScreen(true)} className="btn pink_btn font32">Done</Button></div> :
                            <div className="text-center my-4"><Button onClick={()=>setShowResult(false)} className="btn pink_btn font32">Next Quiz</Button></div>}
                        </>
                        }
                        
                </div>
                
            </div>
        </div>
    )
}
export default Result;