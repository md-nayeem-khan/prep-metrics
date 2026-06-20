import { NextRequest, NextResponse } from 'next/server';

// Global error handler for API routes
export function withErrorHandler<T extends unknown[]>(
  handler: (...args: T) => Promise<NextResponse>
) {
  return async (...args: T): Promise<NextResponse> => {
    try {
      return await handler(...args);
    } catch (error) {
      console.error('API Error:', error);
      
      // Log to monitoring service
      logApiError(error, args[0] as NextRequest);

      // Return appropriate error response
      if (error instanceof ApiError) {
        return NextResponse.json(
          { success: false, error: error.message },
          { status: error.statusCode }
        );
      }

      if (error instanceof ValidationError) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Validation failed',
            details: error.errors 
          },
          { status: 400 }
        );
      }

      // Generic server error
      return NextResponse.json(
        { 
          success: false, 
          error: 'Internal server error'
        },
        { status: 500 }
      );
    }
  };
}

// Custom error classes
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public errors: string[] = []
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends ApiError {
  constructor(resource: string) {
    super(`${resource} not found`, 404);
    this.name = 'NotFoundError';
  }
}

export class UnauthorizedError extends ApiError {
  constructor() {
    super('Unauthorized', 401);
    this.name = 'UnauthorizedError';
  }
}

export class RateLimitError extends ApiError {
  constructor() {
    super('Rate limit exceeded', 429);
    this.name = 'RateLimitError';
  }
}

// Centralized error logging
function logApiError(error: unknown, request: NextRequest) {
  const errorData = {
    message: error instanceof Error ? error.message : 'Unknown error',
    stack: error instanceof Error ? error.stack : undefined,
    method: request.method,
    url: request.url,
    headers: Object.fromEntries(request.headers.entries()),
    timestamp: new Date().toISOString(),
  };

  console.error('API Error logged:', errorData);
  
  // In production, send to monitoring service
  // Example: Sentry.captureException(error, { extra: errorData });
}

// Response helpers
export const successResponse = <T>(data: T, status: number = 200) => {
  return NextResponse.json({ success: true, data }, { status });
};

export const errorResponse = (message: string, status: number = 400) => {
  return NextResponse.json({ success: false, error: message }, { status });
};

export const validationErrorResponse = (errors: string[]) => {
  return NextResponse.json(
    { 
      success: false, 
      error: 'Validation failed',
      details: errors 
    },
    { status: 400 }
  );
};

// Database error handler
export function handleDatabaseError(error: unknown): never {
  console.error('Database error:', error);
  
  if (error instanceof Error) {
    // Check for specific database errors
    if (error.message.includes('UNIQUE constraint')) {
      throw new ApiError('Resource already exists', 409);
    }
    
    if (error.message.includes('FOREIGN KEY constraint')) {
      throw new ApiError('Invalid reference', 400);
    }
    
    if (error.message.includes('NOT NULL constraint')) {
      throw new ValidationError('Missing required fields');
    }
  }

  // Generic database error
  throw new ApiError('Database operation failed', 500);
}

// Safe database operation wrapper
export async function safeDbOperation<T>(
  operation: () => Promise<T>,
  errorMessage: string = 'Database operation failed'
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    console.error(`Database operation error: ${errorMessage}`, error);
    handleDatabaseError(error);
  }
}

// Retry mechanism for failed operations
export async function retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');
      
      if (attempt === maxRetries) {
        throw lastError;
      }
      
      console.warn(`Operation failed (attempt ${attempt}/${maxRetries}):`, lastError.message);
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay * attempt));
    }
  }
  
  throw lastError!;
}

// Circuit breaker pattern for external services
class CircuitBreaker {
  private failureCount = 0;
  private isOpen = false;
  private lastFailureTime = 0;
  
  constructor(
    private failureThreshold: number = 5,
    private timeout: number = 60000 // 1 minute
  ) {}
  
  async execute<T>(operation: () => Promise<T>): Promise<T> {
    if (this.isOpen) {
      if (Date.now() - this.lastFailureTime < this.timeout) {
        throw new ApiError('Circuit breaker is open', 503);
      } else {
        // Half-open state - try one request
        this.isOpen = false;
      }
    }
    
    try {
      const result = await operation();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }
  
  private onSuccess() {
    this.failureCount = 0;
    this.isOpen = false;
  }
  
  private onFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    
    if (this.failureCount >= this.failureThreshold) {
      this.isOpen = true;
    }
  }
}

// Global circuit breakers for different services
export const databaseCircuitBreaker = new CircuitBreaker(3, 30000);
export const externalApiCircuitBreaker = new CircuitBreaker(5, 60000);