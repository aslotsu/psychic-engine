import { FeedbackForm } from '@/components/FeedbackForm';

export default function FeedbackPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4">
      <div className="container mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Share Your Feedback</h1>
          <p className="text-muted-foreground text-lg">
            Your insights help us create better experiences
          </p>
        </div>
        <FeedbackForm />
      </div>
    </main>
  );
}
