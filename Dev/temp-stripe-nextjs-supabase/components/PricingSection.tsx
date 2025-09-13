// File: /components/PricingSection.tsx

// import Link from 'next/link';
import { StripeBuyButton } from './StripeBuyButton';

interface PricingSectionProps {
  showFullDetails?: boolean;
}

export function PricingSection({ showFullDetails = false }: PricingSectionProps) {
  return (
    <div className="py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          {/* Pricing Header */}
          <div className="px-6 py-8 text-center border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <div className="flex items-center justify-center">
              <span className="text-5xl font-bold text-gray-900 dark:text-white">$1.99</span>
              <span className="text-xl text-gray-500 dark:text-gray-400 ml-2">/month</span>
            </div>
            <div className="mt-4">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                7 days extended FREE trial
              </span>
            </div>
          </div>

          {/* Features List */}
          <div className="px-6 py-8">
            <ul className="space-y-4">
              {[
                'Unlimited Voice Commands',
                'Smart Timer Management',
                'Real-time Cooking Assistance',
                'Hands-free Operation',
                'Cancel Anytime'
              ].map((feature, index) => (
                <li key={index} className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Section */}
          <div className="px-6 pb-8 text-center">
            {/* <Link
              href="/pay"
              className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-primary hover:bg-primary-dark rounded-full transition-all duration-300 hover:shadow-hover"
            >
              Start Free Trial
            </Link> */}
             
             <StripeBuyButton
                buyButtonId={process.env.NEXT_PUBLIC_STRIPE_BUTTON_ID || ''}
                publishableKey={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''}
              />
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              {/* <p>No credit card required to start your trial</p> */}
              <p className="mt-2">$1.99/month after 7 days free trial</p>
            </div>
          </div>

          {/* Additional Info */}
          {showFullDetails && (
            <div className="px-6 pb-8 border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="text-sm text-gray-500 dark:text-gray-400 space-y-2">
                <p>• Cancel anytime before trial ends</p>
                <p>• Automatic renewal after trial period</p>
                <p>• Instant access to all features</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}