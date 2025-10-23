import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { Routing } from './components/routing'

function App() {

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routing></Routing>
        </BrowserRouter>
      </Provider>

    </>
  )
}

export default App
