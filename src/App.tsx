import "./App.css";
import BookInfo from "./components/BookInfo";
import FizzBuzz from "./components/FizzBuzz";
import BookList from "./components/BookList";

function App() {
  return (
    <div className="app-container">
      <FizzBuzz />
      <BookInfo />
      <BookList />
    </div>
  );
}

export default App;
