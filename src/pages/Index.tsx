
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import FeedFilters from '@/components/posts/FeedFilters';
import PostCard from '@/components/posts/PostCard';
import TrendingSidebar from '@/components/feed/TrendingSidebar';
import CookieConsent from '@/components/common/CookieConsent';

// Mock data for posts
const MOCK_POSTS = [
  {
    id: '1',
    title: 'Understanding React Hooks: A Comprehensive Guide',
    excerpt: 'Learn how React Hooks work under the hood and how to use them effectively in your applications.',
    author: {
      name: 'Sarah Chen',
      avatar: '/placeholder.svg',
      role: 'Frontend Developer'
    },
    publishedAt: '2 hours ago',
    tags: ['react', 'javascript', 'webdev'],
    likes: 84,
    comments: 12,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '2',
    title: 'Kubernetes for Beginners: Getting Started with Container Orchestration',
    excerpt: 'A step-by-step guide for beginners to set up their first Kubernetes cluster and deploy applications.',
    author: {
      name: 'Michael Rodriguez',
      avatar: '/placeholder.svg',
      role: 'DevOps Engineer'
    },
    publishedAt: '5 hours ago',
    tags: ['kubernetes', 'devops', 'cloud'],
    likes: 56,
    comments: 8,
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '3',
    title: 'Building Machine Learning Pipelines with Python',
    excerpt: 'Discover how to create robust and scalable ML pipelines using Python and popular frameworks.',
    author: {
      name: 'Jessica Kim',
      avatar: '/placeholder.svg',
      role: 'Data Scientist'
    },
    publishedAt: '1 day ago',
    tags: ['python', 'machinelearning', 'ai'],
    likes: 122,
    comments: 25
  },
  {
    id: '4',
    title: 'Modern CSS Techniques Every Developer Should Know',
    excerpt: 'Explore powerful CSS techniques like Grid, Flexbox, and CSS Variables to level up your styling skills.',
    author: {
      name: 'Alex Johnson',
      avatar: '/placeholder.svg',
      role: 'UX Designer'
    },
    publishedAt: '2 days ago',
    tags: ['css', 'webdev', 'frontend'],
    likes: 93,
    comments: 16,
    image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '5',
    title: 'Getting Started with GraphQL: A REST Alternative',
    excerpt: 'Learn why GraphQL is becoming a popular alternative to REST and how to implement it in your project.',
    author: {
      name: 'Olivia Wang',
      avatar: '/placeholder.svg',
      role: 'Backend Engineer'
    },
    publishedAt: '3 days ago',
    tags: ['graphql', 'api', 'javascript'],
    likes: 67,
    comments: 9
  }
];

const Index = () => {
  const [currentView, setCurrentView] = useState<'card' | 'list'>('card');

  return (
    <MainLayout>
      <div className="container max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <FeedFilters 
              onViewChange={setCurrentView}
              currentView={currentView}
            />
            
            <div className="space-y-6">
              {MOCK_POSTS.map((post) => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  isListView={currentView === 'list'} 
                />
              ))}
            </div>
          </div>
          
          <div className="hidden lg:block">
            <TrendingSidebar />
          </div>
        </div>
      </div>
      
      <CookieConsent />
    </MainLayout>
  );
};

export default Index;
