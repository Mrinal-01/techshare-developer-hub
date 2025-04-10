
import MainLayout from '@/components/layout/MainLayout';

const Explore = () => {
  return (
    <MainLayout>
      <div className="container max-w-screen-xl mx-auto">
        <div className="text-center p-12 max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Explore Page</h1>
          <p className="text-muted-foreground mb-8">
            This page will contain content discovery features. Come back soon to explore content by categories, topics, and more.
          </p>
          <div className="p-12 bg-muted/30 rounded-lg border border-dashed">
            <p className="text-muted-foreground">Explore page under development</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Explore;
