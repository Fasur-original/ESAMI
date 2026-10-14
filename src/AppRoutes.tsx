import { Route, Routes } from 'react-router'
import { RootLayout } from './components/layout/RootLayout'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'

/** Route table shared by the browser (BrowserRouter) and the build-time prerender (StaticRouter). */
export function AppRoutes() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
