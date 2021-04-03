import React from 'react';
// COMPONENTS
import Timer from './components/Timer';

const App = () => {
  const [timerCounter, setTimerCounter] = React.useState(60);

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

  return (
    <div className="App">
      sprint
      <Timer timerCounter={timerCounter} />
    </div>
  );
}

export default App;
