import React from 'react';

interface FormProps {
    children: React.ReactNode;
}

export function Checkbox({ children }: FormProps) {
    return (
        <section className="flex gap-3 self-start">
            <input type="checkbox" name="acept" id="acept" />
            <label htmlFor="acept">{children}</label>
        </section>
    );
}
