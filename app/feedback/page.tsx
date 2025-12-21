import { FeedbackForm } from '@/components/FeedbackForm';

export default function FeedbackPage() {
  return (
    <main className="min-h-screen bg-muted/30 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header Section - Google Forms Style */}
        <div className="bg-card rounded-lg border border-l-8 border-l-primary p-8 mb-6">
          <h1 className="text-3xl font-bold mb-2">Event Feedback</h1>
          <p className="text-muted-foreground">
            Thank you for attending! We value your feedback as it helps us serve you better
            and create more meaningful experiences. Please take a few moments to share your thoughts.
          </p>
          <div className="mt-4 text-sm text-muted-foreground">
            <span className="text-destructive">*</span> Required
          </div>
        </div>

        {/* Form */}
        <FeedbackForm />
      </div>
    </main>
  );
}
