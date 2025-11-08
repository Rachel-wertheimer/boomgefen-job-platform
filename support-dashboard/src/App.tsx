import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async'
import { store } from './app/store'
import { Routing } from './components/routing'
function App() {
  return (
    <>
      <HelmetProvider>
        <Provider store={store}>
          <BrowserRouter>
            <Routing></Routing>
          </BrowserRouter>
        </Provider>
      </HelmetProvider>
    </>
  )
}
export default App
