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
            return null;
        }

        return <WrappedComponent {...props} />;
    };

    return WithAuthComponent;
};

export default withAuth;
