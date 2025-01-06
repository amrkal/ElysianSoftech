// app/index.tsx
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function IndexPage() {
  const router = useRouter();

  // Use useEffect to ensure navigation happens after layout is ready
  useEffect(() => {
    // Add a small delay to ensure layout is initialized
    setTimeout(() => {
      router.push('/loginPage');
    }, 0);  // A 0ms delay ensures it happens after layout is mounted
  }, [router]);

  return null; // Just redirects, no need to render anything here
}
