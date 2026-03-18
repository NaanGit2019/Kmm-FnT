import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

// ==============================|| ELEMENT ERROR - COMMON ||============================== //

export default function ErrorBoundary() {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        if (error.status === 404) {
            return (
                <Alert variant="destructive">
                    <AlertTitle>Error 404</AlertTitle>
                    <AlertDescription>This page doesn&apos;t exist!</AlertDescription>
                </Alert>
            );
        }

        if (error.status === 401) {
            return (
                <Alert variant="destructive">
                    <AlertTitle>Error 401</AlertTitle>
                    <AlertDescription>You aren&apos;t authorized to see this</AlertDescription>
                </Alert>
            );
        }

        if (error.status === 503) {
            return (
                <Alert variant="destructive">
                    <AlertTitle>Error 503</AlertTitle>
                    <AlertDescription>Looks like our API is down</AlertDescription>
                </Alert>
            );
        }

        if (error.status === 418) {
            return (
                <Alert variant="destructive">
                    <AlertTitle>Error 418</AlertTitle>
                    <AlertDescription>Contact administrator</AlertDescription>
                </Alert>
            );
        }
    }

    return (
        <Alert variant="destructive">
            <AlertTitle>Under Maintenance</AlertTitle>
            <AlertDescription>Something went wrong. Please try again later.</AlertDescription>
        </Alert>
    );
}
