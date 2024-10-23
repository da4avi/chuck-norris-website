export default function Button({
    name,
    value,
    className,
    children,
    type,
    onClick,
    disabled
}) {
    return (
        <button disabled={disabled} name={name} value={value} className={className} type={type} onClick={onClick}>
            {children}
        </button>
    )
}