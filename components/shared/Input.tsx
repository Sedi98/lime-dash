import React from 'react'

interface InputProps {
    placeholder?: string;
    type?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg';
    icon?: React.ReactNode;
    className?: string;
    value?: string
    changeAction?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = ({
    placeholder = "",
    type = "text",
    size = "md",
    icon,
    className = "",
    value,
    changeAction
}) => {
    // Map size to DaisyUI classes
    const sizeClasses = {
        xs: 'input-xs text-xs',
        sm: 'input-sm text-sm',
        md: 'input-md text-base',
        lg: 'input-lg text-lg'
    };

    return (
        <label className={`input input-bordered flex items-center gap-2 ${sizeClasses[size]} ${className}`}>
            {icon && <span className="flex-shrink-0 opacity-70">{icon}</span>}
            <input
                type={type}
                placeholder={placeholder}
                className="w-full outline-none bg-transparent"
                value={value}
                onChange={changeAction}
            />
        </label>
    );
}

export default Input;