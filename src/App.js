import "./styles.css";
import APRForm from "./Calc";
import logo from "./ShoreFunding.png";

export default function App() {
  return (
    <div className="App">
      <img src={logo} alt="Logo" style={{ width: "100%" }} />
      <APRForm />
    </div>
  );
}
