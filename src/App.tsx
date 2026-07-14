import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './app/AppLayout'
import { LessonsPage } from './features/lessons/LessonsPage'
import { OnboardingPage } from './features/profiles/OnboardingPage'
import { ProfileProvider } from './features/profiles/ProfileContext'
import { ProfilesPage } from './features/profiles/ProfilesPage'
import { RequireProfile } from './features/profiles/RequireProfile'
import { SettingsPage } from './features/profiles/SettingsPage'
import { ResultPage } from './features/results/ResultPage'
import { TrainerPage } from './features/trainer/TrainerPage'

export default function App() {
  return (
    <ProfileProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<OnboardingPage />} />
            <Route element={<RequireProfile />}>
              <Route path="lessons" element={<LessonsPage />} />
              <Route path="lessons/:lessonId" element={<TrainerPage />} />
              <Route path="lessons/:lessonId/hasil" element={<ResultPage />} />
              <Route path="profil" element={<ProfilesPage />} />
              <Route path="pengaturan" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProfileProvider>
  )
}
