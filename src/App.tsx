import { Provider } from "react-redux";
import TodoPage from "./components/TodoPage";
import { store } from "./app/store";
import TodoNavbar from "./components/TodoNavBar";


function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-white max-w-2xl sm:max-w-3xl lg:max-w-5xl mx-auto px-4 shadow rounded-xl p-6">
        <TodoNavbar/>
        <TodoPage />
      </div>
    </Provider>
  );
}
export default App;
