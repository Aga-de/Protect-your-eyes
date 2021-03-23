import React from 'react';
import { render } from 'react-dom';


class App extends React.Component {
  
  state = {
    status: 'off',
    time: 1200,
    timer: null,
  }

  playBell = () => {
    const audio = new Audio ('./sounds/bell.wav');
    audio.play();
  }

  formatTime(secs){
    let sec_num = parseInt(secs, 10)
    let hours   = Math.floor(sec_num / 3600)
    let minutes = Math.floor(sec_num / 60) % 60
    let seconds = sec_num % 60

    return [hours,minutes,seconds]
      .map(v => v < 10 ? "0" + v : v)
      .filter((v,i) => v !== "00" || i > 0)
      .join(":")
  }

  step = () => {
    const {time} = this.state;
    const {status} = this.state;

    this.setState({
      time: this.state.time - 1,
    });
    if (time === 0){
      if (status === 'work') {
        this.playBell();
        this.changeStatus();
      }
      if (status === 'rest') {
        this.playBell();
        this.changeStatus();
      }
    }
  };

  startTimer = () => {
    this.setState({
      timer: setInterval(this.step, 1000),
      time: 1200,
      status: 'work',
    });
  };

  stopTimer = () => {
    clearInterval(this.state.timer);
    this.setState({
      status: 'off',
    });
  }

  closeApp = () => {
    window.close()
  }

  changeStatus() {
  const status = this.state.status
   if (status === 'off') {
        this.setState({
        status: 'work',
        time: 1200})
    } else if (status === 'work') {
        this.setState({
        status: 'rest',
        time: 20});
    } else if (status === 'rest') { 
        this.setState({
          status: 'work',
          time: 1200});
    }
  }

  action(){
    this.changeStatus();
    this.startTimer();
  }


  render() {
    if (this.state.status === 'off'){
      return (
          <div>
            <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
            <p>This app will help you track your time and inform you when it's time to rest</p>
            <button className="btn" onClick={()=> this.action()}>Start</button>
            <button className="btn btn-close" onClick={()=>this.closeApp()}>X</button>
        </div>
      )
    } else if(this.state.status === 'work'){
      return (
        <div>
          <img src="./images/work.png" />
          <div className="timer">
          {this.formatTime(this.state.time)}
          </div>
          <button className="btn" onClick={()=>this.stopTimer()}>Stop</button>
          <button className="btn btn-close" onClick={()=>this.closeApp()}>X</button>
        </div>
      )
    } else if(this.state.status === 'rest'){
      return (
          <div>
            <img src="./images/rest.png" />
            <div className="timer">
            {this.formatTime(this.state.time)}
            </div>
            <button className="btn" onClick={()=>this.stopTimer()}>Stop</button>
            <button className="btn btn-close" onClick={()=>this.closeApp()}>X</button>
          </div>
      )
    }
  }
};

render(<App />, document.querySelector('#app'));
