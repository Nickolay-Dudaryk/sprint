import React from 'react';
// COMPONENTS
import Timer from './components/Timer';
import StartScreen from './components/StartScreen';
import FinishScreen from './components/FinishScreen';
import CompareWords from './components/CompareWords';
// HARDCODE DB
import book1 from './hardcodeDb';


const App = () => {
  const [timerCounter, setTimerCounter] = React.useState(60);
  const [enWordToCompare, setEnWordToCompare] = React.useState('');
  const [ruWordToCompare, setRuWordToCompare] = React.useState('');
  const [enWordsObjId, setEnWordsObjId] = React.useState(null);
  const [ruWordsObjId, setRuWordsObjId] = React.useState(null);
  const [isIdentical, setIsIdentical] = React.useState(false);
  const [isGameOn, setIsGameOn] = React.useState(false);
  const [userCorrectAnswers, setUserCorrectAnswers] = React.useState([]);
  const [userWrongAnswers, setUserWrongAnswers] = React.useState([]);
  const [userScore, setUserScore] = React.useState(0);


  React.useEffect(() => {
    let timer;
    
    if (timerCounter > 0) {
      timer = setTimeout(() => setTimerCounter(c => c - 1), 1000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timerCounter]);


  const randomIndex = () => Math.floor(Math.random() * book1.length);


  const getEnWordToCompare = () => {
    const rndmIdx1 = randomIndex();
    setEnWordsObjId(rndmIdx1);
    const randomItem = book1[rndmIdx1];
    setEnWordToCompare(randomItem.word);
  };


  const getRuWordToCompare = () => {
    const rndmIdx2 = randomIndex();
    setRuWordsObjId(rndmIdx2);
    const randomItem2 = book1[rndmIdx2];
    setRuWordToCompare(randomItem2.wordTranslate); 
  };


  const isWordsIdentical = () => {
    setIsIdentical(enWordsObjId === ruWordsObjId);
  };


  const nextLevel = () => {
    if (timerCounter > 0) {
      getEnWordToCompare();
      getRuWordToCompare();
      isWordsIdentical();
    }
  };


  // IF RUN OUT OF TIME => GAME OVER
  // if(timerCounter < 1) {
  //   setIsGameOn(false);
  // };


  const startGame = () => {
    setIsGameOn(true);
    setTimerCounter(10);
    setUserScore(0);
    setUserCorrectAnswers([]);
    setUserWrongAnswers([]);

    getEnWordToCompare();
    getRuWordToCompare();
    isWordsIdentical();
  };


  const yesClickHandler = () => {
    if (isIdentical) {
      setUserScore(s => s + 1);
      setUserCorrectAnswers([...userCorrectAnswers, enWordToCompare]);
    } else {
      setUserWrongAnswers([...userWrongAnswers, enWordToCompare]);
    }
    
    nextLevel();
  };


  const noClickHandler = () => {
    if (!isIdentical) {
      setUserScore(s => s + 1);
      setUserCorrectAnswers([...userCorrectAnswers, enWordToCompare]);
    } else {
      setUserWrongAnswers([...userWrongAnswers, enWordToCompare]);
    }

    nextLevel();
  };


  // RENDER SCREENS
  let screen;
  if (isGameOn && timerCounter > 0) {
    screen = (
      <>
        <Timer timerCounter={timerCounter} />
        <CompareWords
          ruWordToCompare={ruWordToCompare}
          enWordToCompare={enWordToCompare}
          isIdentical={isIdentical}
          yesClickHandler={yesClickHandler}
          noClickHandler={noClickHandler}
          nextLevel={nextLevel}
        />
      </>
    )
  } else if (!isGameOn) {
    screen = <StartScreen startGame={startGame} />;
  } else if (timerCounter === 0) {
    screen = (
      <FinishScreen
        startGame={startGame}
        userCorrectAnswers={userCorrectAnswers}
        userWrongAnswers={userWrongAnswers}
        userScore={userScore}
      />
    )
  };
  

  return (
    <div className="App">
      {screen}
    </div>
  );
}

export default App;
