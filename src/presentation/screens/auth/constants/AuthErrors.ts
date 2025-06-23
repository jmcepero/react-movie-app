/**
 * Interface defining the structure of an authentication error
 */
export interface AuthError {
  code: string;
  message: string;
}

/**
 * Mapping of Firebase Auth error codes to user-friendly messages
 */
export const AUTH_ERRORS: Record<string, AuthError> = {
  'auth/email-already-in-use': {
    code: 'auth/email-already-in-use',
    message: 'This email is already registered. Would you like to sign in?',
  },
  'auth/invalid-email': {
    code: 'auth/invalid-email',
    message: 'The email format is invalid. Please check your address.',
  },
  'auth/weak-password': {
    code: 'auth/weak-password',
    message: 'Password is too weak. It must be at least 6 characters long.',
  },
  'auth/network-request-failed': {
    code: 'auth/network-request-failed',
    message:
      'Network error. Please check your internet connection and try again.',
  },
  'auth/too-many-requests': {
    code: 'auth/too-many-requests',
    message: 'Too many failed attempts. Please try again later.',
  },
  'auth/user-disabled': {
    code: 'auth/user-disabled',
    message: 'This account has been disabled. Please contact support.',
  },
  'auth/operation-not-allowed': {
    code: 'auth/operation-not-allowed',
    message: 'This operation is not allowed. Please contact support.',
  },
  'auth/user-not-found': {
    code: 'auth/user-not-found',
    message: 'No user is registered with this email.',
  },
  'auth/wrong-password': {
    code: 'auth/wrong-password',
    message: 'Incorrect password. Please try again.',
  },
  'app/google-play-services': {
    code: 'app/google-play-services',
    message:
      'Google Play Services is not available or outdated on this device.',
  },
  'app/incomplete-user-data': {
    code: 'app/incomplete-user-data',
    message: 'Could not complete sign-in with Google.',
  },
  'app/google-sign-in-canceled': {
    code: 'app/google-sign-in-canceled',
    message: 'Google sign-in was canceled.',
  },
  'auth/invalid-credential': {
    code: 'auth/invalid-credential',
    message: 'The email or password you entered is incorrect.',
  },
  'app/unknown-error': {
    code: 'app/unknown-error',
    message: 'An unexpected error occurred. Please try again.',
  },
};

export const getAuthErrorMessage = (errorCode: string): string => {
  return (
    AUTH_ERRORS[errorCode]?.message || `Authentication error: ${errorCode}`
  );
};
