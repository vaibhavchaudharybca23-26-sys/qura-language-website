import React, { useState, useEffect } from 'react';
import { Route, Switch, useLocation } from 'wouter';
import { ThemeProvider } from './components/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';

import { HomePage } from './pages/HomePage';
import { DocsPage } from './pages/DocsPage';
import { SyntaxPage } from './pages/SyntaxPage';
import { LearnPage } from './pages/LearnPage';
import { ExamplesPage } from './pages/ExamplesPage';
import { DownloadPage } from './pages/DownloadPage';
import { PlaygroundPage } from './pages/PlaygroundPage';
import { DevelopersPage } from './pages/DevelopersPage';
import { CommunityPage } from './pages/CommunityPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { ChangelogPage } from './pages/ChangelogPage';
import { AboutPage } from './pages/AboutPage';
import { LegalPage } from './pages/LegalPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [location, setLocation] = useLocation();

  // Scroll to top upon route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleNavigate = (href: string) => {
    setLocation(href);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors selection:bg-indigo-500 selection:text-white">
        {/* Navigation Bar */}
        <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

        {/* Real-time Global Search Modal */}
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onNavigate={handleNavigate}
        />

        {/* Main Content Router */}
        <main className="flex-1">
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/docs" component={DocsPage} />
            <Route path="/docs/:id" component={DocsPage} />
            <Route path="/syntax" component={SyntaxPage} />
            <Route path="/learn" component={LearnPage} />
            <Route path="/examples" component={ExamplesPage} />
            <Route path="/download" component={DownloadPage} />
            <Route path="/playground" component={PlaygroundPage} />
            <Route path="/developers" component={DevelopersPage} />
            <Route path="/community" component={CommunityPage} />
            <Route path="/roadmap" component={RoadmapPage} />
            <Route path="/changelog" component={ChangelogPage} />
            <Route path="/about" component={AboutPage} />

            {/* Legal & Governance dedicated routes */}
            <Route path="/license">
              {() => <LegalPage initialTab="license" />}
            </Route>
            <Route path="/trademarks">
              {() => <LegalPage initialTab="trademarks" />}
            </Route>
            <Route path="/security">
              {() => <LegalPage initialTab="security" />}
            </Route>
            <Route path="/contributing">
              {() => <LegalPage initialTab="contributing" />}
            </Route>

            {/* Custom 404 Fallback */}
            <Route>
              {() => <NotFoundPage onOpenSearch={() => setIsSearchOpen(true)} />}
            </Route>
          </Switch>
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}
