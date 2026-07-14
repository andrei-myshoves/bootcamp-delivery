export function ErrorFallback() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
                <h1 className="text-2xl font-semibold">
                    Something went wrong
                </h1>

                <p className="mt-2 text-sm text-muted-foreground">
                    Please refresh the page and try again.
                </p>
            </div>
        </div>
    )
}