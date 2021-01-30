import Inspiration from './components/Inspiration'
import './App.css';
import houstoncalm2 from './content/houstoncalm2.mp4'

function App() {
  return (
    <div className="App">
      <video src={houstoncalm2} autoPlay muted loop playsinline id="myVideo"></video>
      <header className="App-header">
      </header>
      <Inspiration/>
    </div>
  )
}

export default App;
