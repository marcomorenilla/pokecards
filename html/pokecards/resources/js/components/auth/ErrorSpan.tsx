import React from 'react';

interface ErrorProps {
    children: React.ReactNode;
}
export function ErrorSpan({ children }: ErrorProps) {
    return <span className="self-start text-sm text-red-500">{children}</span>;
}
