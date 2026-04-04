// 🔥 FULL CLERK MOCK (covers everything)

// hooks
export const useUser = () => ({
  user: {
    id: "dev-user",
    firstName: "Dev",
    imageUrl: ""
  },
  isLoaded: true,
  isSignedIn: true
});

export const useAuth = () => ({
  userId: "dev-user",
  isSignedIn: true
});

// provider
export const ClerkProvider = ({ children }) => children;

// auth wrappers
export const SignedIn = ({ children }) => children;
export const SignedOut = ({ children }) => null;

// buttons / components
export const SignIn = () => null;
export const SignUp = () => null;

export const SignInButton = ({ children }) => children || null;
export const SignOutButton = ({ children }) => children || null;

export const UserButton = () => null;