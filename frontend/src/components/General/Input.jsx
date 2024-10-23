export default function Input({
    name,
    className,
    value,
    label,
    onChange
}) {
    return (
        <>
            <label htmlFor={name}>{label}</label>
            <input
                name={name}
                value={value}
                className={className}
                onChange={onChange}
            />
        </>
    );
}
