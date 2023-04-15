import { Route, Routes } from 'react-router-dom'

import AuthOther from './components/additionally/AuthOther'
import ChangeOrder from './components/change-order/ChangeOrder'
import ChangeOrderList from './components/change-order/ChangeOrderList'
import ChangeRoute from './components/change-route/ChangeRoute'
import ClientManagement from './components/client-manadgment/ClientManagement'
import CreateOrder from './components/crete-order/CreateOrder'
import Layout from './components/layout/Layout'
import AuthLogin from './components/login/AuthLogin'
import NotFoundInfo from './components/not-found/NotFound'
import Profile from './components/profile/Profile'
import AuthRegistration from './components/registration/AuthRegistration'
import ShowOrder from './components/show-order/ShowOrder'
import AuthPage from './pages/auth-page/AuthPage'
import MainPage from './pages/main-page/MainPage'
import { ROUTES } from './utils/routes'

function App() {
  return (
    <>
      <Routes>
        <Route path={ROUTES.HOME} element={<AuthPage />} />
        <Route path={ROUTES.LAYOUT} element={<Layout />}>
          <Route path={ROUTES.BODY} element={<MainPage />} />
          <Route path={ROUTES.CREATE_ORDER} element={<CreateOrder />} />
          <Route path={ROUTES.SHOW_ORDER} element={<ShowOrder />} />
          <Route path={ROUTES.PROFILE} element={<Profile />} />
          <Route path={ROUTES.CHANGE_ROUTE} element={<ChangeRoute />} />
          <Route path={ROUTES.CHANGE_ORDER} element={<ChangeOrder />} />
          <Route
            path={ROUTES.CLIENT_MANAGEMENT}
            element={<ClientManagement />}
          />
          <Route path={ROUTES.CHANGE_ORDER_ID} element={<ChangeOrderList />} />
        </Route>
        <Route path={ROUTES.LOGIN} element={<AuthLogin />} />
        <Route path={ROUTES.REGISTER} element={<AuthRegistration />} />
        <Route path={ROUTES.ABOUT} element={<AuthOther />} />
        <Route path={ROUTES.ERROR} element={<NotFoundInfo />} />
      </Routes>
    </>
  )
}

export default App
