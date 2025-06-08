export function ErrorComponent({ message }: { message: string }) {
    return (
        <div className="flex flex-col items-center justify-center h-full p-4">
            <h1 className="text-2xl font-bold text-red-600">Error</h1>
            <p className="mt-2 text-gray-700">{message}</p>
            <a
                href="/"
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Go Back
            </a>
        </div>
    );
}

// This component is used to display an error message and a button to go back to the home page.