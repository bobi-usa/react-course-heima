import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'

const root = createRoot(document.querySelector('#root'))

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)

// provider：提供者
