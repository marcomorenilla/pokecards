import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
}

export function TypeBadge({ children }: BadgeProps) {
    return <div className="w-fit rounded-xl p-1">{children}</div>;
}
