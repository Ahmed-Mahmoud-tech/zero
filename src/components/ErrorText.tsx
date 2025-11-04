interface ErrorTextProps {
    error?: string | string[];
    touched?: boolean;
}

export default function ErrorText({ error, touched }: ErrorTextProps) {
    if (!error || !touched) return null;

    const errorMessage = Array.isArray(error) ? error[0] : error;

    return (
        <p className="text-red-600 text-xs mt-1">{errorMessage}</p>
    );
}
