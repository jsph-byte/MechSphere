import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import Layout from '@/components/Layout';
import { ThemeProvider } from '@/lib/theme';
import { ProgressProvider } from '@/lib/progress';
import Dashboard from '@/pages/Dashboard';
import ExperimentLab from '@/pages/lab/ExperimentLab';
import ProjectileMotion from '@/pages/lab/ProjectileMotion';
import SimplePendulum from '@/pages/lab/SimplePendulum';
import InclinedPlane from '@/pages/lab/InclinedPlane';
import IdealGas from '@/pages/lab/IdealGas';
import SpecificHeat from '@/pages/lab/SpecificHeat';
import Buoyancy from '@/pages/lab/Buoyancy';
import BernoulliFlow from '@/pages/lab/BernoulliFlow';
import HeatConduction from '@/pages/lab/HeatConduction';
import AssessmentPage from '@/pages/lab/AssessmentPage';
import MaterialExplorer from '@/pages/MaterialExplorer';
import Toolkit from '@/pages/Toolkit';
import Challenge from '@/pages/Challenge';
import MyProgress from '@/pages/MyProgress';
import Settings from '@/pages/Settings';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/lab" element={<ExperimentLab />} />
        <Route path="/lab/projectile" element={<ProjectileMotion />} />
        <Route path="/lab/pendulum" element={<SimplePendulum />} />
        <Route path="/lab/incline" element={<InclinedPlane />} />
        <Route path="/lab/gas" element={<IdealGas />} />
        <Route path="/lab/heat" element={<SpecificHeat />} />
        <Route path="/lab/buoyancy" element={<Buoyancy />} />
        <Route path="/lab/bernoulli" element={<BernoulliFlow />} />
        <Route path="/lab/conduction" element={<HeatConduction />} />
        <Route path="/lab/assessment/:experimentId/:testType" element={<AssessmentPage />} />
        <Route path="/materials" element={<MaterialExplorer />} />
        <Route path="/toolkit" element={<Toolkit />} />
        <Route path="/challenge" element={<Challenge />} />
        <Route path="/progress" element={<MyProgress />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <ThemeProvider>
        <ProgressProvider>
          <QueryClientProvider client={queryClientInstance}>
            <Router>
              <ScrollToTop />
              <AuthenticatedApp />
            </Router>
            <Toaster />
          </QueryClientProvider>
        </ProgressProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App