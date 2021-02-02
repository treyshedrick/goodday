import Inspiration from './components/Inspiration'
import LogIn from './components/LogIn'
import './App.css';
import houstoncalm2 from './content/houstoncalm2.mp4'

function App() {
  return (
    <div className="App">
      <video src={houstoncalm2} autoPlay muted loop playsInline id="myVideo"></video>
      <header className="App-header">
      </header>
      <Inspiration/>
      <LogIn/>
    </div>
  )
}

export default App;
