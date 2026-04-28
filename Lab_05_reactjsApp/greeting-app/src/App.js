import './App.css';
import Greeting from './components/Greeting';

function App() {
  return (
    <div className="app-container">
      <h1>Dynamic Greeting App</h1>

      <Greeting
        name="Ali Ahmed"
        timeOfDay="Morning"
        bgColor="#fff3cd"
      />

      <Greeting
        name="Musharaf Khan"
        timeOfDay="Afternoon"
        bgColor="#ffd5d5"
      />

      <Greeting
        name="Sara Malik"
        timeOfDay="Evening"
        bgColor="#e8d5ff"
      />

      <Greeting
        name="Ahmed Raza"
        timeOfDay="Night"
        bgColor="#d5e8ff"
      />

    </div>
  );
}

export default App;