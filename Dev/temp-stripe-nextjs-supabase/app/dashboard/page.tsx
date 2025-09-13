"use client";

// import { useWebSocket } from '@/contexts/WebSocketContext';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import { useAuth } from '@/contexts/AuthContext';


import { useRouter } from 'next/navigation';
import { useSubscription } from '@/hooks/useSubscription';
// import { OnboardingTour } from '@/components/OnboardingTour';
import { useTrialStatus } from '@/hooks/useTrialStatus';
import Link from 'next/link';

const AUTH_TIMEOUT = 15000; // 15 seconds

export default function Dashboard() {

  
  // const { isConnected } = useWebSocket();
  // const [fullResponse, setFullResponse] = useState('');
  const { user, isSubscriber, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();
  const { subscription, isLoading: isSubLoading, fetchSubscription } = useSubscription();
  const [hasCheckedSubscription, setHasCheckedSubscription] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const { isInTrial, isLoading: isTrialLoading } = useTrialStatus();
  const [authTimeout, setAuthTimeout] = useState(false);

  // Add new states for dashboard functionality
  // const [repositories, setRepositories] = useState([]);
  // const [feedbackSources, setFeedbackSources] = useState([]);
  // const [recentFeedback, setRecentFeedback] = useState([]);
  // const [pendingPRs, setPendingPRs] = useState([]);

  // First check - Subscription and trial check
  useEffect(() => {
    if (isSubLoading || isTrialLoading) return;
    
    const hasValidSubscription = ['active', 'trialing'].includes(subscription?.status || '');
    
    console.log('Access check isInTrial:', {
      hasSubscription: !!subscription,
      status: subscription?.status,
      isInTrial: isInTrial,
      validUntil: subscription?.current_period_end
    });

    // Only redirect if there's no valid subscription AND no valid trial
    if (!hasValidSubscription && !isInTrial) {
      console.log('No valid subscription or trial, redirecting');
      router.replace('/profile');
    }
  }, [subscription, isSubLoading, isTrialLoading, router, isInTrial]);

  // Second check - Auth check
  useEffect(() => {
    if (isAuthLoading || isTrialLoading) return;

    console.log('Access check:', {
      isSubscriber,
      hasCheckedSubscription,
      isInTrial: isInTrial,
      authLoading: isAuthLoading,
    });

    if (!hasCheckedSubscription) {
      setHasCheckedSubscription(true);
      
      // Allow access for both subscribers and trial users
      if (!user || (!isSubscriber && !isInTrial && !isAuthLoading)) {
        console.log('No valid subscription or trial, redirecting');
        router.replace('/profile');
      }
    }
  }, [isSubscriber, isAuthLoading, hasCheckedSubscription, router, user, subscription, isTrialLoading, isInTrial]);

  // Add refresh effect
  useEffect(() => {
    const refreshSubscription = async () => {
      await fetchSubscription();
      setHasCheckedSubscription(true);
    };
    
    if (user?.id) {
      refreshSubscription();
    }
  }, [user?.id, fetchSubscription]);

  useEffect(() => {
    if (user?.id) {
      // Check if user has completed onboarding
      const checkOnboarding = async () => {
        const { data } = await supabase
          .from('user_preferences')
          .select('has_completed_onboarding')
          .eq('user_id', user.id)
          .single();
        
        setHasCompletedOnboarding(!!data?.has_completed_onboarding);
        console.log('hasCompletedOnboarding: ', hasCompletedOnboarding)
      };
      
      checkOnboarding();
    }
  }, [user?.id, hasCompletedOnboarding]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user && (isAuthLoading || isTrialLoading)) {
        setAuthTimeout(true);
      }
    }, AUTH_TIMEOUT);
    
    return () => clearTimeout(timer);
  }, [user, isAuthLoading, isTrialLoading]);

  // useEffect(() => {
  //   if (!hasCompletedOnboarding) {
  //     router.push('/onboarding');
  //   }
  // }, [hasCompletedOnboarding, router]);

  // Update the loading check
  if (!user && (isAuthLoading || isTrialLoading) && !hasCheckedSubscription) {
    console.log('user: ', user)
    console.log('isAuthLoading: ', isAuthLoading)
    console.log('hasCheckedSubscription: ', hasCheckedSubscription)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground mb-4 mx-auto"></div>
          <p className="text-foreground">
            {authTimeout ? 
              "Taking longer than usual? Try refreshing the page 😊." :
              "Verifying access..."}
          </p>
        </div>
      </div>
    );
  }


  return (
    <main className="min-h-screen bg-surface-light dark:bg-surface-dark">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 sm:px-6 lg:px-8">
        {/* Header section */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Product Development Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Monitor feedback, review changes, and streamline your development workflow
          </p>
        </div>

        {/* Trial notification banner */}
        {isInTrial && !subscription && (
          <div className="mb-4 p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
            <p className="text-yellow-600 dark:text-yellow-400">
              You are currently in your 48-hr trial period. 
              <Link href="/profile" className="ml-2 underline">
                Subscribe now
              </Link> to continue using the app after the trial ends.
            </p>
          </div>
        )}

        {/* Main dashboard grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Feedback Overview Card */}
          <div className="bg-white dark:bg-neutral-darker p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Recent Feedback</h2>
            <div className="space-y-4">
              <p className="text-gray-500 dark:text-gray-400">
                Connect feedback sources to start gathering insights
              </p>
              <button className="text-primary hover:text-primary-dark">
                + Add Feedback Source
              </button>
            </div>
          </div>

          {/* Pending PRs Card */}
          <div className="bg-white dark:bg-neutral-darker p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Pending Pull Requests</h2>
            <div className="space-y-4">
              <p className="text-gray-500 dark:text-gray-400">
                Connect your GitHub repository to start generating PRs
              </p>
              <button className="text-primary hover:text-primary-dark">
                + Connect Repository
              </button>
            </div>
          </div>

          {/* Repository Stats Card */}
          <div className="bg-white dark:bg-neutral-darker p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Repository Statistics</h2>
            <div className="space-y-4">
              <p className="text-gray-500 dark:text-gray-400">
                View metrics and insights about your connected repositories
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Connected Repos</p>
                  <p className="text-2xl font-semibold">0</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Active PRs</p>
                  <p className="text-2xl font-semibold">0</p>
                </div>
              </div>
            </div>
          </div>

          {/* Feedback Sources Card */}
          <div className="bg-white dark:bg-neutral-darker p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Feedback Sources</h2>
            <div className="space-y-4">
              <p className="text-gray-500 dark:text-gray-400">
                Monitor feedback from multiple platforms
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Active Sources</p>
                  <p className="text-2xl font-semibold">0</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">New Feedback</p>
                  <p className="text-2xl font-semibold">0</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 bg-primary/10 hover:bg-primary/20 rounded-lg text-primary transition-colors">
              Connect GitHub
            </button>
            <button className="p-4 bg-primary/10 hover:bg-primary/20 rounded-lg text-primary transition-colors">
              Add Feedback Source
            </button>
            <button className="p-4 bg-primary/10 hover:bg-primary/20 rounded-lg text-primary transition-colors">
              View Analytics
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}