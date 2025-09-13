"use client";

import { useAuth } from '@/contexts/AuthContext';
// import { PricingSection } from '@/components/PricingSection';
import { useTrialStatus } from '@/hooks/useTrialStatus';
import { DemoWidget } from '@/components/DemoWidget';
import { MetricCard } from '@/components/MetricCard';
import { TypewriterEffect } from '@/components/TypewriterEffect';
import { FaReddit } from 'react-icons/fa';
import { 
  FaGithub, 
  FaDiscord, 
  FaProductHunt,
  FaXTwitter,
  FaHackerNews,
  FaInstagram,
  FaTiktok,
  FaYoutube
} from 'react-icons/fa6';
import { 
  GitPullRequest, 
  Clock, CheckCircle2
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Link as ScrollLink } from 'react-scroll';

/* eslint-disable @typescript-eslint/no-unused-vars */

// Add this before the component
const workflowSteps = [
  {
    title: "Collect",
    description: "Gather feedback from multiple platforms",
    preview: <TypewriterEffect text="Collecting feedback from Discord..." />
  },
  {
    title: "Analyze",
    description: "AI processes and prioritizes feedback",
    preview: <TypewriterEffect text="Analyzing sentiment..." />
  },
  {
    title: "Generate",
    description: "Create PRs with implemented changes",
    preview: <TypewriterEffect text="Generating PR..." />
  },
  {
    title: "Review",
    description: "Approve and merge changes",
    preview: <TypewriterEffect text="Ready to merge..." />
  }
];

// Add this before the component
const platforms = [
  { name: 'GitHub', icon: FaGithub },
  { name: 'Discord', icon: FaDiscord },
  { name: 'Reddit', icon: FaReddit },
  { name: 'ProductHunt', icon: FaProductHunt },
  { name: 'Twitter', icon: FaXTwitter },
  { name: 'HackerNews', icon: FaHackerNews },
  { name: 'Instagram', icon: FaInstagram },
  { name: 'TikTok', icon: FaTiktok },
  { name: 'YouTube', icon: FaYoutube }
];

// First, update the workflowSections array to include Overview
const workflowSections = [
  {
    id: "overview",
    title: "Overview",
    description: "See how it all works together",
    bgColor: "bg-white",
    content: <div>{/* Overview content */}</div>
  },
  {
    id: "collect",
    title: "Collect Feedback From Everywhere",
    description: "Connect once, monitor forever",
    bgColor: "bg-slate-50",
    content: <div>{/* Collect content */}</div>
  },
  {
    id: "analyze",
    title: "AI-Powered Analysis",
    description: "From feedback to insights, automatically",
    bgColor: "bg-slate-50",
    content: <div>{/* Analyze content */}</div>
  },
  {
    id: "generate",
    title: "Automatic Code Generation",
    description: "From insights to implementation",
    bgColor: "bg-white",
    content: <div>{/* Generate content */}</div>
  },
  {
    id: "review",
    title: "Easy Review Process",
    description: "Review and deploy with confidence",
    bgColor: "bg-slate-50",
    content: <div>{/* Review content */}</div>
  }
];

// Custom Hook to create section progress values
function useSectionProgressValues(numSections: number) {
  const { scrollYProgress } = useScroll();
  
  // Create all transforms at once, at the top level
  const section1Progress = useTransform(
    scrollYProgress,
    [0 / numSections, 1 / numSections],
    [0, 1]
  );
  const section2Progress = useTransform(
    scrollYProgress,
    [1 / numSections, 2 / numSections],
    [0, 1]
  );
  const section3Progress = useTransform(
    scrollYProgress,
    [2 / numSections, 3 / numSections],
    [0, 1]
  );
  const section4Progress = useTransform(
    scrollYProgress,
    [3 / numSections, 4 / numSections],
    [0, 1]
  );

  return [section1Progress, section2Progress, section3Progress, section4Progress];
}

export default function LandingPage() {
  const { user } = useAuth();
  const { isInTrial } = useTrialStatus();
  const [activeSection, setActiveSection] = useState("overview");
  const sectionProgressValues = useSectionProgressValues(workflowSections.length);
  
  const router = useRouter();

  const [dashboardRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-screen bg-slate-50 relative">
      {/* Enhanced Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 overflow-x-auto hide-scrollbar">
            {workflowSections.map((section, index) => (
              <ScrollLink
                key={section.id}
                to={section.id}
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                onSetActive={() => setActiveSection(section.id)}
                className="flex items-center cursor-pointer group min-w-fit"
              >
                <div className="relative">
                  <span 
                    className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 transition-all duration-300
                      ${activeSection === section.id 
                      ? 'bg-primary text-white' 
                      : 'bg-primary/10 text-primary group-hover:bg-primary/20'}`}
                  >
                    {index + 1}
                  </span>
                </div>
                <span 
                  className={`text-sm font-medium transition-colors duration-300 hidden md:block
                    ${activeSection === section.id 
                    ? 'text-primary' 
                    : 'text-slate-600 group-hover:text-primary'}`}
                >
                  {section.id.charAt(0).toUpperCase() + section.id.slice(1)}
                </span>
              </ScrollLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Vertical Progress Line */}
      <div className="fixed left-0 top-0 bottom-0 w-1 bg-slate-200">
        <motion.div
          className="w-full bg-primary"
          style={{ scaleY: scrollYProgress }}
          initial={{ scaleY: 0 }}
        />
      </div>

      {/* Hero Section - Now acts as Overview */}
      <div id="overview" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-light/10 to-accent-light/10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative pt-20 pb-16 sm:pb-24">
            {/* Header Content */}
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900">
                <span className="block">Feedback to Features</span>
                <span className="block text-primary">Automated & Seamless</span>
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-600">
                Transform user feedback directly into actionable code changes with AI.
              </p>
              
              {/* CTA Buttons */}
              <div className="mt-10 flex gap-4 justify-center">
                <button className="px-8 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg shadow-lg hover:shadow-xl transition-all">
                  Watch Demo
                </button>
                <button 
                  onClick={() => router.push('/dashboard')} 
                  className="px-8 py-3 bg-white hover:bg-slate-50 text-primary border-2 border-primary rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Start Free Trial
                </button>
              </div>
            </div>

            {/* Combined Preview: Code + Workflow Steps */}
            <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Code Preview */}
              <div className="relative">
                <pre className="relative rounded-xl bg-slate-900 p-8 shadow-2xl">
                  <code className="text-sm sm:text-base text-slate-100">
                    <TypewriterEffect text={`// Feedback received from Discord
"Users want dark mode support"

// Generated PR by AI
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  ...`} 
                  />
                </code>
              </pre>
              </div>

              {/* Workflow Steps */}
              <div className="grid grid-cols-1 gap-4">
                {workflowSteps.map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 1, y: 0 }}
                    className="relative p-4 bg-white rounded-xl shadow-lg"
                  >
                    <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold">
                      {index + 1}
                    </div>
                    <div className="ml-8">
                      <h3 className="font-semibold text-slate-900">{step.title}</h3>
                      <p className="text-sm text-slate-600">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Other sections */}
      {workflowSections.slice(1).map((section, index) => (
        <motion.section
          key={section.id}
          id={section.id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className={`relative py-20 ${section.bgColor}`}
          onViewportEnter={() => setActiveSection(section.id)}
        >
          {/* Section Progress Indicator */}
          <motion.div
            className="absolute top-0 left-0 w-full h-1 bg-primary/10"
            style={{
              scaleX: sectionProgressValues[index]
            }}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-4">
                  {section.title}
                </h2>
                <p className="text-slate-600 max-w-2xl mx-auto">
                  {section.description}
                </p>
              </motion.div>

              {/* Section specific content */}
              <div className="mt-12">
                {section.id === "collect" && (
                  <>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-8 items-center justify-items-center max-w-4xl mx-auto">
                      {platforms.map((platform) => (
                        <motion.div
                          key={platform.name}
                          whileHover={{ scale: 1.1 }}
                          className="flex flex-col items-center"
                        >
                          <platform.icon className="h-10 w-10 text-slate-700 hover:text-primary transition-colors" />
                          <span className="mt-2 text-sm text-slate-600">{platform.name}</span>
                        </motion.div>
                      ))}
                    </div>
                  </>
                )}
                {section.id === "analyze" && (
                  <div className="mt-16">
                    {/* Analysis Dashboard Preview */}
                    <motion.div 
                      ref={dashboardRef} 
                      initial={{ opacity: 0, y: 50 }} 
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      className="relative max-w-4xl mx-auto"
                    >
                      {/* Dashboard Card */}
                      <div className="bg-white rounded-xl shadow-xl p-6 border border-slate-200">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8">
                          <h3 className="text-lg font-semibold text-slate-900">Feedback Analysis</h3>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-slate-600">Last 7 Days</span>
                            <button className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-lg">
                              Live Demo
                            </button>
                          </div>
                        </div>

                        {/* Analysis Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                          <div className="bg-slate-50 rounded-lg p-4">
                            <div className="text-2xl font-bold text-slate-900">2,547</div>
                            <div className="text-sm text-slate-600">Total Feedback</div>
                            <div className="text-xs text-green-600 mt-1">↑ 12% from last week</div>
                          </div>
                          <div className="bg-slate-50 rounded-lg p-4">
                            <div className="text-2xl font-bold text-slate-900">85%</div>
                            <div className="text-sm text-slate-600">Sentiment Score</div>
                            <div className="text-xs text-green-600 mt-1">↑ 5% from last week</div>
                          </div>
                          <div className="bg-slate-50 rounded-lg p-4">
                            <div className="text-2xl font-bold text-slate-900">156</div>
                            <div className="text-sm text-slate-600">Action Items</div>
                            <div className="text-xs text-blue-600 mt-1">23 high priority</div>
                          </div>
                        </div>

                        {/* Analysis Content */}
                        <div className="space-y-4">
                          {/* Feedback Item */}
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="bg-slate-50 rounded-lg p-4"
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm font-medium text-slate-900">Feature Request</span>
                                  <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">High Priority</span>
                                </div>
                                <p className="text-sm text-slate-600 mt-1">
                                  &quot;Users want dark mode support across the platform&quot;
                                </p>
                              </div>
                              <div className="text-xs text-slate-500">5m ago</div>
                            </div>
                            <div className="mt-3 flex items-center space-x-3">
                              <div className="flex items-center space-x-1">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                <span className="text-xs text-slate-600">89% Positive</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                <span className="text-xs text-slate-600">45 Related Mentions</span>
                              </div>
                            </div>
                          </motion.div>

                          {/* AI Analysis */}
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="bg-primary/5 border border-primary/10 rounded-lg p-4"
                          >
                            <div className="flex items-center space-x-2 mb-2">
                              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                                <span className="text-primary text-sm">AI</span>
                              </div>
                              <span className="text-sm font-medium text-slate-900">Analysis Summary</span>
                            </div>
                            <p className="text-sm text-slate-600">
                              High-priority feature request with strong user demand. Implementation complexity: Medium. 
                              Recommended timeline: Next sprint. Estimated development time: 3-4 days.
                            </p>
                          </motion.div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-6 flex justify-end space-x-3">
                          <button className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900">
                            View Details
                          </button>
                          <button className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark">
                            Generate PR
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}
                {section.id === "generate" && (
                  <div className="mt-16">
                    <motion.div 
                      ref={dashboardRef} 
                      initial={{ opacity: 0, y: 50 }} 
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      className="relative max-w-4xl mx-auto"
                    >
                      <div className="bg-white rounded-xl shadow-xl p-6 border border-slate-200">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8">
                          <h3 className="text-lg font-semibold text-slate-900">Code Generation Status</h3>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-slate-600">Real-time</span>
                            <div className="flex items-center space-x-1">
                              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                              <span className="text-sm text-green-600">Live</span>
                            </div>
                          </div>
                        </div>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                          <MetricCard 
                            number="847"
                            label="PRs Generated"
                            icon={<GitPullRequest className="h-6 w-6 text-primary" />}
                          />
                          <MetricCard 
                            number="312h"
                            label="Time Saved"
                            icon={<Clock className="h-6 w-6 text-primary" />}
                          />
                          <MetricCard 
                            number="99%"
                            label="Accuracy Rate"
                            icon={<CheckCircle2 className="h-6 w-6 text-primary" />}
                          />
                        </div>

                        {/* Latest Generated PR */}
                        <div className="space-y-4">
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-slate-50 rounded-lg p-4"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-center space-x-3">
                                <GitPullRequest className="h-5 w-5 text-primary" />
                                <div>
                                  <div className="text-sm font-medium text-slate-900">feat: Add dark mode support</div>
                                  <p className="text-xs text-slate-600">Generated 5 minutes ago</p>
                                </div>
                              </div>
                              <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">Ready to Review</span>
                            </div>
                            <div className="mt-4 bg-slate-900 rounded-lg p-3">
                              <pre className="text-xs text-slate-300 overflow-x-auto">
                                <code>
                                  {`export const ThemeProvider = ({ children }) => {
                                    const [theme, setTheme] = useState('light');
                                    const toggleTheme = () => setTheme(prev => 
                                      prev === 'light' ? 'dark' : 'light'
                                    );
                                    ...`}
                                </code>
                              </pre>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}
                {section.id === "review" && (
                  <div className="mt-16">
                    <motion.div 
                      ref={dashboardRef} 
                      initial={{ opacity: 0, y: 50 }} 
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      className="relative max-w-4xl mx-auto"
                    >
                      <div className="bg-white rounded-xl shadow-xl p-6 border border-slate-200">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8">
                          <h3 className="text-lg font-semibold text-slate-900">Review Dashboard</h3>
                          <button className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-lg">
                            View All PRs
                          </button>
                        </div>

                        {/* PR Review Interface */}
                        <div className="space-y-4">
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-slate-50 rounded-lg p-4"
                          >
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                  <GitPullRequest className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-slate-900">Dark Mode Implementation</div>
                                  <div className="text-xs text-slate-600">PR #123 • Created by AI</div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">Awaiting Review</span>
                              </div>
                            </div>

                            {/* Preview Section */}
                            <div className="bg-white rounded-lg border border-slate-200 p-4 mb-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-slate-900">Preview</span>
                                <div className="flex space-x-2">
                                  <button className="px-2 py-1 text-xs bg-slate-100 text-slate-600 rounded">Light</button>
                                  <button className="px-2 py-1 text-xs bg-slate-900 text-white rounded">Dark</button>
                                </div>
                              </div>
                              <DemoWidget />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end space-x-3">
                              <button className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900">
                                Request Changes
                              </button>
                              <button className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark">
                                Approve & Merge
                              </button>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.section>
      ))}

      {/* Enhanced CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="relative py-20"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary-light/10 to-accent-light/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-white rounded-xl shadow-xl p-12 border border-slate-200">
            <div className="text-center">
              <motion.h2 
                initial={{ y: 20 }}
                whileInView={{ y: 0 }}
                className="text-3xl font-bold text-slate-900"
              >
                Ready to Transform Your Workflow?
              </motion.h2>
              <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                Start automating your feedback-to-code pipeline today
              </p>
              
              <div className="mt-10 flex gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Watch Demo
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push('/dashboard')}
                  className="px-8 py-3 bg-white hover:bg-slate-50 text-primary border-2 border-primary rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Start Free Trial
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

