import "./App.css";
import SliderComponent from "./components/SliderComponent";

function App() {
  return (
    <>
      <SliderComponent
        url={"https://picsum.photos/v2/list"}
        page={2}
        limit={10}
      />
    </>
  );
}

export default App;