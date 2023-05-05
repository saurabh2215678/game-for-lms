import React,{useEffect, useState} from "react";
import UserForm from "./components/userform";
import {data} from './data';
import "./app.css";
import Question from "./components/question";
import Result from "./components/result";
import LastScreen from "./components/lastScreen";
import { download, JSONToCSVConvertor, downloadCSVFromJson } from "./commonFunctions";

function App() {
  const [user, setUser] = useState();
  const [gameData, setgameData] = useState();
  const [currentQuestion, setCurrentQuestion] = useState();
  const [results, setResults] = useState([]);

  const [lavelIndex, setlavelIndex] = useState(0);
  const [questionIndex, setquestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [lastScreen, setLastScreen] = useState(false);
  
  useEffect(()=>{
    setgameData(data);
    setCurrentQuestion(data[lavelIndex].questions[questionIndex]);

    if(window.location.hash == '#results'){
      download('results.txt', localStorage.getItem('results'));
    }

    if(window.location.hash == '#users'){
      var allGameResults = JSON.parse(localStorage.getItem('results'));
      var resultTxt = ''
      allGameResults.forEach((item)=>{
      resultTxt =  resultTxt +
`${item['Name']} | ${item['organization']} | ${item['email']}

`});
      download('users.txt', resultTxt);
    }
  },[]);
 
  useEffect(()=>{
    if(questionIndex == data[lavelIndex]?.questions.length){
      setShowResult(true);
      setlavelIndex(lavelIndex + 1);
      setquestionIndex(0);
      // setCurrentQuestion(data[lavelIndex + 1].questions[0]);
    }else if(lavelIndex < data.length){
      setCurrentQuestion(data[lavelIndex].questions[questionIndex]);
    }else{
      setCompleted(true);
      console.log('completed');
    }
    
  },[questionIndex, lavelIndex]);

  // useEffect(()=>{
  //  console.log(results);
  //  //localStorage.setItem('current-user', JSON.stringify(values));
  // },[results]);
 
  useEffect(()=>{
    if(lastScreen){
      var allGameResults = JSON.parse(localStorage.getItem('results'));
      var thisGameResult = {...user, results: results }
  
      if(allGameResults){
        allGameResults.push(thisGameResult);
        localStorage.setItem('results', JSON.stringify(allGameResults));
      }else{
        allGameResults= [thisGameResult];
        localStorage.setItem('results', JSON.stringify([thisGameResult]))
      }
      console.log(allGameResults);
      // downloadCSVFromJson('results.txt', allGameResults)
    }
  },[lastScreen]);

  return (
    <div className="App">
      {!lastScreen ?
        <>
            {!user ? 
            <UserForm setUser={setUser}/> :
            <>
            {showResult ?
              <Result results={results} setShowResult={setShowResult} completed={completed} setLastScreen={setLastScreen} />
            : 
              <Question 
              data={currentQuestion} 
              setResults={setResults} 
              results={results}
              questionIndex={questionIndex}
              setquestionIndex={setquestionIndex}
              lavel={data[lavelIndex].lavel}
              setlavelIndex={setlavelIndex}
              setShowResult={setShowResult}
              />
            }
            </>
            }
        </>:
        <LastScreen/>
      }

    </div>
  );
}

export default App;
