import { useRouter } from 'next/navigation'; // For routing in the `app` directory
import { useEffect, useState, ComponentType } from 'react';

type WithAuthProps = {};

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
    const WithAuthComponent = (props: P & WithAuthProps) => {
        const router = useRouter();
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            const token = localStorage.getItem('token');

            if (!token) {
                // If token is not found, redirect to login page
                router.push('/login');
            } else {
                setIsAuthenticated(true);
            }

            setIsLoading(false);
        }, [router]);

        if (isLoading) {
            return <div>Loading...</div>;
        }

        if (!isAuthenticated) {
            return null; // Or you can return a loading indicator while redirecting
        }

        // If authenticated, render the wrapped component
        return <WrappedComponent {...props} />;
    };

    return WithAuthComponent;
};

export default withAuth;
