// Database Validation Utilities
// Since Prisma doesn't support @@check constraints, we implement validation in application code

export const ValidationRules = {
  Submission: {
    attemptType: {
      enum: ['First', 'Revision'] as const,
      validate: (value: string): value is 'First' | 'Revision' => {
        return ['First', 'Revision'].includes(value);
      }
    },
    
    timeSpentSeconds: {
      min: 1,
      validate: (value: number): boolean => {
        return Number.isInteger(value) && value > 0;
      }
    },
    
    patternRecognitionSeconds: {
      min: 0,
      nullable: true,
      validate: (value: number | null): boolean => {
        return value === null || (Number.isInteger(value) && value >= 0);
      }
    },
    
    status: {
      enum: ['solved', 'failed', 'partial', 'abandoned'] as const,
      validate: (value: string): value is 'solved' | 'failed' | 'partial' | 'abandoned' => {
        return ['solved', 'failed', 'partial', 'abandoned'].includes(value);
      }
    }
  },

  MockInterview: {
    timeLimit: {
      min: 1,
      validate: (value: number): boolean => {
        return Number.isInteger(value) && value > 0;
      }
    },
    
    timeTakenSeconds: {
      min: 0,
      nullable: true,
      validate: (value: number | null): boolean => {
        return value === null || (Number.isInteger(value) && value >= 0);
      }
    },
    
    explanationScore: {
      min: 1,
      max: 5,
      nullable: true,
      validate: (value: number | null): boolean => {
        return value === null || (Number.isInteger(value) && value >= 1 && value <= 5);
      }
    },
    
    codeQualityScore: {
      min: 1,
      max: 5,
      nullable: true,
      validate: (value: number | null): boolean => {
        return value === null || (Number.isInteger(value) && value >= 1 && value <= 5);
      }
    },
    
    overallScore: {
      min: 1.0,
      max: 5.0,
      nullable: true,
      validate: (value: number | null): boolean => {
        return value === null || (typeof value === 'number' && value >= 1.0 && value <= 5.0);
      },
      calculate: (explanation: number | null, codeQuality: number | null): number | null => {
        if (explanation === null || codeQuality === null) return null;
        return (explanation + codeQuality) / 2;
      }
    }
  },

  Revision: {
    timeSpentSeconds: {
      min: 0,
      nullable: true,
      validate: (value: number | null): boolean => {
        return value === null || (Number.isInteger(value) && value >= 0);
      }
    },
    
    interval: {
      min: 1,
      validate: (value: number): boolean => {
        return Number.isInteger(value) && value > 0;
      }
    },
    
    result: {
      enum: ['easy', 'good', 'hard', 'again'] as const,
      nullable: true,
      validate: (value: string | null): value is 'easy' | 'good' | 'hard' | 'again' | null => {
        return value === null || ['easy', 'good', 'hard', 'again'].includes(value);
      }
    },
    
    completedAt: {
      validateWithScheduled: (completedAt: Date | null, scheduledAt: Date): boolean => {
        return completedAt === null || completedAt >= scheduledAt;
      }
    }
  }
} as const;

// Helper functions for validation
export function validateSubmission(data: Partial<{
  attemptType: string;
  timeSpentSeconds: number;
  patternRecognitionSeconds: number | null;
  status: string;
}>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (data.attemptType && !ValidationRules.Submission.attemptType.validate(data.attemptType)) {
    errors.push('attemptType must be "First" or "Revision"');
  }
  
  if (data.timeSpentSeconds !== undefined && !ValidationRules.Submission.timeSpentSeconds.validate(data.timeSpentSeconds)) {
    errors.push('timeSpentSeconds must be a positive integer');
  }
  
  if (data.patternRecognitionSeconds !== undefined && !ValidationRules.Submission.patternRecognitionSeconds.validate(data.patternRecognitionSeconds)) {
    errors.push('patternRecognitionSeconds must be a non-negative integer or null');
  }
  
  if (data.status && !ValidationRules.Submission.status.validate(data.status)) {
    errors.push('status must be "solved", "failed", "partial", or "abandoned"');
  }
  
  return { valid: errors.length === 0, errors };
}

export function validateMockInterview(data: Partial<{
  timeLimit: number;
  timeTakenSeconds: number | null;
  explanationScore: number | null;
  codeQualityScore: number | null;
  overallScore: number | null;
}>): { valid: boolean; errors: string[]; calculatedOverallScore?: number | null } {
  const errors: string[] = [];
  
  if (data.timeLimit !== undefined && !ValidationRules.MockInterview.timeLimit.validate(data.timeLimit)) {
    errors.push('timeLimit must be a positive integer');
  }
  
  if (data.timeTakenSeconds !== undefined && !ValidationRules.MockInterview.timeTakenSeconds.validate(data.timeTakenSeconds)) {
    errors.push('timeTakenSeconds must be a non-negative integer or null');
  }
  
  if (data.explanationScore !== undefined && !ValidationRules.MockInterview.explanationScore.validate(data.explanationScore)) {
    errors.push('explanationScore must be an integer between 1-5 or null');
  }
  
  if (data.codeQualityScore !== undefined && !ValidationRules.MockInterview.codeQualityScore.validate(data.codeQualityScore)) {
    errors.push('codeQualityScore must be an integer between 1-5 or null');
  }
  
  // Calculate overall score
  const calculatedOverallScore = ValidationRules.MockInterview.overallScore.calculate(
    data.explanationScore ?? null,
    data.codeQualityScore ?? null
  );
  
  if (data.overallScore !== undefined && !ValidationRules.MockInterview.overallScore.validate(data.overallScore)) {
    errors.push('overallScore must be a number between 1.0-5.0 or null');
  }
  
  return { 
    valid: errors.length === 0, 
    errors,
    calculatedOverallScore 
  };
}

export function validateRevision(data: Partial<{
  timeSpentSeconds: number | null;
  interval: number;
  result: string | null;
  completedAt: Date | null;
  scheduledAt: Date;
}>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (data.timeSpentSeconds !== undefined && !ValidationRules.Revision.timeSpentSeconds.validate(data.timeSpentSeconds)) {
    errors.push('timeSpentSeconds must be a non-negative integer or null');
  }
  
  if (data.interval !== undefined && !ValidationRules.Revision.interval.validate(data.interval)) {
    errors.push('interval must be a positive integer');
  }
  
  if (data.result !== undefined && !ValidationRules.Revision.result.validate(data.result)) {
    errors.push('result must be "easy", "good", "hard", "again", or null');
  }
  
  if (data.completedAt !== undefined && data.scheduledAt !== undefined) {
    if (!ValidationRules.Revision.completedAt.validateWithScheduled(data.completedAt, data.scheduledAt)) {
      errors.push('completedAt cannot be before scheduledAt');
    }
  }
  
  return { valid: errors.length === 0, errors };
}

// Auto-calculation helpers
export function calculateMockOverallScore(explanationScore: number | null, codeQualityScore: number | null): number | null {
  return ValidationRules.MockInterview.overallScore.calculate(explanationScore, codeQualityScore);
}

// Schedule revision helper
export function scheduleNextRevision(submissionDate: Date, attempt: number = 0): Date {
  const intervals = [1, 3, 7, 14, 30, 60]; // Days
  const interval = intervals[Math.min(attempt, intervals.length - 1)];
  
  const nextDate = new Date(submissionDate);
  nextDate.setDate(nextDate.getDate() + interval);
  
  return nextDate;
}

export type AttemptType = typeof ValidationRules.Submission.attemptType.enum[number];
export type SubmissionStatus = typeof ValidationRules.Submission.status.enum[number];  
export type RevisionResult = typeof ValidationRules.Revision.result.enum[number];