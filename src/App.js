import "./styles.css";
import APRForm from "./Calc";

export default function App() {
  return (
    <div className="App">
      <img
        src="https://www.lendzi.com/wp-content/uploads/2020/10/logo.svg"
        alt="Logo"
        style={{ width: "70%" }}
      />
      <APRForm />
    </div>
  );
}
