import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import cherryBg from '@/assets/cherry-blossom-bg.jpg';

// Floating petal component
function FloatingPetal({ delay, left, size }: { delay: number; left: string; size: number }) {
  return (
    <div
      className="absolute pointer-events-none animate-petal-fall"
      style={{
        left,
        top: '-40px',
        animationDelay: `${delay}s`,
        animationDuration: `${6 + Math.random() * 6}s`,
      }}
    >
      <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
        <ellipse cx="10" cy="10" rx="8" ry="5" fill="hsl(350, 60%, 85%)" opacity="0.7" transform="rotate(30 10 10)" />
      </svg>
    </div>
  );
}

type View = 'login' | 'reset';

export default function Login() {
  const navigate = useNavigate();
  const [view, setView] = useState<View>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    setIsLoading(true);
    // Mock login
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`Welcome back, ${username}!`);
      navigate('/');
    }, 800);
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) {
      toast.error('Please enter your email');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Password reset link sent!');
      setView('login');
    }, 800);
  };

  const petals = Array.from({ length: 12 }, (_, i) => ({
    delay: i * 1.2,
    left: `${Math.random() * 100}%`,
    size: 12 + Math.random() * 14,
  }));

  return (
    <div className="relative min-h-screen flex overflow-hidden">
      {/* Left: Cherry blossom hero */}
      <div className="hidden lg:flex lg:w-1/2 relative items-end justify-center">
        <img
          src={cherryBg}
          alt="Cherry blossoms"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/30 to-transparent" />
        <div className="relative z-10 p-12 pb-20 text-center max-w-md">
          <h2 className="text-3xl font-bold text-foreground mb-3 tracking-tight">
            Knowledge Matrix
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            Track skills, measure growth, and empower your team — all in one place.
          </p>
        </div>
      </div>

      {/* Right: Login form */}
      <div className="flex-1 flex items-center justify-center relative bg-background px-6">
        {/* Falling petals overlay */}
        {petals.map((p, i) => (
          <FloatingPetal key={i} {...p} />
        ))}

        <div className="w-full max-w-sm relative z-10">
          {/* Logo / Brand */}
          <div className="mb-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">KM</span>
              </div>
              <span className="text-xl font-semibold text-foreground tracking-tight">KMM</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              {view === 'login' ? 'Welcome back' : 'Reset password'}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {view === 'login'
                ? 'Sign in to continue to your dashboard'
                : 'Enter your email to receive a reset link'}
            </p>
          </div>

          {view === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  autoComplete="username"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <button
                    type="button"
                    onClick={() => setView('reset')}
                    className="text-xs text-primary hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="current-password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full gap-2" disabled={isLoading}>
                <LogIn className="w-4 h-4" />
                {isLoading ? 'Signing in…' : 'Sign in'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleReset} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="reset-email">Email address</Label>
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="you@company.com"
                  value={resetEmail}
                  onChange={e => setResetEmail(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Sending…' : 'Send reset link'}
              </Button>

              <button
                type="button"
                onClick={() => setView('login')}
                className="w-full text-center text-sm text-muted-foreground hover:text-foreground"
              >
                ← Back to sign in
              </button>
            </form>
          )}

          <p className="text-center text-xs text-muted-foreground mt-8">
            Knowledge Matrix Management © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
}
