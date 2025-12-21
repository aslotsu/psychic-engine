'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const FeedbackFormSchema = z.object({
  // Event Details
  eventName: z.string().min(1, {
    message: 'Please enter the event name.',
  }),

  // Overall Experience
  overallRating: z.enum(['1', '2', '3', '4', '5']),

  // What did you like/not like
  whatLiked: z.string().min(10, {
    message: 'Please share at least 10 characters about what you liked.',
  }),
  whatImprove: z.string().optional(),

  // Detailed Ratings
  worshipRating: z.enum(['1', '2', '3', '4', '5']),
  teachingRating: z.enum(['1', '2', '3', '4', '5']),
  fellowshipRating: z.enum(['1', '2', '3', '4', '5']),
  venueRating: z.enum(['1', '2', '3', '4', '5']),

  // Future Engagement
  attendFuture: z.enum(['yes', 'no', 'maybe']),
  wouldRecommend: z.enum(['yes', 'no', 'maybe']),

  // Additional Information
  howHeard: z.string().min(1, {
    message: 'Please let us know how you heard about this event.',
  }),
  prayerRequests: z.string().optional(),
  additionalComments: z.string().optional(),

  // Contact Info (optional)
  name: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
});

export function FeedbackForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const form = useForm<z.infer<typeof FeedbackFormSchema>>({
    resolver: zodResolver(FeedbackFormSchema),
    defaultValues: {
      eventName: '',
      overallRating: undefined,
      whatLiked: '',
      whatImprove: '',
      worshipRating: undefined,
      teachingRating: undefined,
      fellowshipRating: undefined,
      venueRating: undefined,
      attendFuture: undefined,
      wouldRecommend: undefined,
      howHeard: '',
      prayerRequests: '',
      additionalComments: '',
      name: '',
      email: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FeedbackFormSchema>) {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("http://localhost:8080/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "Event Feedback Form",
          data: {
            ...data,
            timestamp: new Date().toISOString(),
          },
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        form.reset();

        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus("idle");
        }, 5000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  // Helper component for rating scales
  const RatingScale = ({ value, onChange }: { value?: string; onChange: (value: string) => void }) => (
    <RadioGroup value={value} onValueChange={onChange} className="flex gap-2">
      {['1', '2', '3', '4', '5'].map((rating) => (
        <div key={rating} className="flex flex-col items-center gap-1">
          <RadioGroupItem value={rating} id={`rating-${rating}`} className="peer sr-only" />
          <label
            htmlFor={`rating-${rating}`}
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-muted bg-background text-sm font-medium cursor-pointer transition-all hover:border-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground"
          >
            {rating}
          </label>
          {rating === '1' && <span className="text-xs text-muted-foreground">Poor</span>}
          {rating === '5' && <span className="text-xs text-muted-foreground">Excellent</span>}
        </div>
      ))}
    </RadioGroup>
  );

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Event Details Section */}
          <div className="bg-card rounded-lg border p-6 space-y-6">
            <FormField
              control={form.control}
              name="eventName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Which event did you attend? <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Sunday Service, Prayer Meeting, Youth Gathering" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Overall Experience Section */}
          <div className="bg-card rounded-lg border p-6 space-y-6">
            <FormField
              control={form.control}
              name="overallRating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    How would you rate your overall experience? <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <RatingScale value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* What You Liked/Improve Section */}
          <div className="bg-card rounded-lg border p-6 space-y-6">
            <FormField
              control={form.control}
              name="whatLiked"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    What did you like most about the event? <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share what resonated with you..."
                      className="min-h-[100px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="whatImprove"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">What could be improved?</FormLabel>
                  <FormDescription>Optional - Your suggestions help us grow</FormDescription>
                  <FormControl>
                    <Textarea
                      placeholder="Share your suggestions..."
                      className="min-h-[100px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Detailed Ratings Section */}
          <div className="bg-card rounded-lg border p-6 space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-1">Rate Your Experience</h3>
              <p className="text-sm text-muted-foreground">
                Please rate the following aspects <span className="text-destructive">*</span>
              </p>
            </div>

            <FormField
              control={form.control}
              name="worshipRating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Worship Experience</FormLabel>
                  <FormControl>
                    <RatingScale value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="teachingRating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Teaching / Message</FormLabel>
                  <FormControl>
                    <RatingScale value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fellowshipRating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Fellowship & Community</FormLabel>
                  <FormControl>
                    <RatingScale value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="venueRating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Venue & Facilities</FormLabel>
                  <FormControl>
                    <RatingScale value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Future Engagement Section */}
          <div className="bg-card rounded-lg border p-6 space-y-6">
            <FormField
              control={form.control}
              name="attendFuture"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Would you attend future events? <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <RadioGroup value={field.value} onValueChange={field.onChange} className="flex flex-col gap-3">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="attend-yes" />
                        <label htmlFor="attend-yes" className="text-sm font-medium cursor-pointer">
                          Yes, definitely
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="maybe" id="attend-maybe" />
                        <label htmlFor="attend-maybe" className="text-sm font-medium cursor-pointer">
                          Maybe
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="attend-no" />
                        <label htmlFor="attend-no" className="text-sm font-medium cursor-pointer">
                          No
                        </label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="wouldRecommend"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Would you recommend this event to others? <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <RadioGroup value={field.value} onValueChange={field.onChange} className="flex flex-col gap-3">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="recommend-yes" />
                        <label htmlFor="recommend-yes" className="text-sm font-medium cursor-pointer">
                          Yes, definitely
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="maybe" id="recommend-maybe" />
                        <label htmlFor="recommend-maybe" className="text-sm font-medium cursor-pointer">
                          Maybe
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="recommend-no" />
                        <label htmlFor="recommend-no" className="text-sm font-medium cursor-pointer">
                          No
                        </label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Additional Information Section */}
          <div className="bg-card rounded-lg border p-6 space-y-6">
            <FormField
              control={form.control}
              name="howHeard"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    How did you hear about this event? <span className="text-destructive">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="friend">Friend or family member</SelectItem>
                      <SelectItem value="social-media">Social media</SelectItem>
                      <SelectItem value="website">Website</SelectItem>
                      <SelectItem value="flyer">Flyer or poster</SelectItem>
                      <SelectItem value="church-announcement">Church announcement</SelectItem>
                      <SelectItem value="email">Email invitation</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="prayerRequests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Prayer Requests</FormLabel>
                  <FormDescription>Optional - We would be honored to pray for you</FormDescription>
                  <FormControl>
                    <Textarea
                      placeholder="Share any prayer requests..."
                      className="min-h-[100px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="additionalComments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Additional Comments</FormLabel>
                  <FormDescription>Optional - Anything else you'd like to share</FormDescription>
                  <FormControl>
                    <Textarea
                      placeholder="Share any other thoughts..."
                      className="min-h-[100px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Contact Information Section */}
          <div className="bg-card rounded-lg border p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-1">Contact Information</h3>
              <p className="text-sm text-muted-foreground">Optional - Only if you'd like us to follow up with you</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your.email@example.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Submit Section */}
          <div className="bg-card rounded-lg border p-6 space-y-4">
            <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto px-8">
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </Button>

            {submitStatus === "success" && (
              <div className="rounded-lg bg-green-50 p-4 text-sm text-green-800 dark:bg-green-900/20 dark:text-green-400">
                <strong>Thank you for your feedback!</strong>
                <p className="mt-1">
                  Your response has been received. We deeply appreciate you taking the time to share your thoughts with us.
                  May God bless you!
                </p>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-400">
                <strong>Submission Error</strong>
                <p className="mt-1">
                  We're sorry, but there was a problem submitting your feedback. Please try again or contact us directly.
                </p>
              </div>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
