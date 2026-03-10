import './App.css';
import StudentCard from './components/StudentCard';

function App() {
  return (
    <div className="app-container">
      <h1>Student Information Cards</h1>

      <StudentCard
        name="Ali Ahmed"
        rollNo="BSSE-01"
        department="Software Engineering"
        university="Air University"
        color="#d0f0c0"
      />

      <StudentCard
        name="Musharaf Khan"
        rollNo="BSSE-02"
        department="AI & ML"
        university="Air University"
        color="#cce5ff"
      />

      <StudentCard
        name="Sara Malik"
        rollNo="BSSE-03"
        department="Cybersecurity"
        university="Air University"
        color="#ffe5cc"
      />
    </div>
  );
}

export default App;
