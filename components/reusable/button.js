import styles from '../../styles/form.module.scss'
import Link from 'next/link'

export default function Button({ children, type, onClick, disabled, variant, size, href, className, loading, style, styleClass, ...props }) {

    if (href) {
        return (
            <Link href={href} passHref={true}>
                <a
                    onClick={onClick}
                    className={`${styles.button} ${styleClass != '' ? styles[styleClass] : ''} ${className ? className : ''} ${
                        variant === 'darker' ? styles.darker
                            : variant === 'secondary' ? styles.secondary
                                : variant === 'light' ? styles.light
                                    : variant === 'outline' ? styles.outline
                                        : variant === 'danger' ? styles.danger
                                            : ''
                        } ${
                        size === "sm" ? styles.sm
                            : size === "md" ? styles.md
                                : size === "lg" ? styles.lg
                                    : ''
                        } ${disabled && styles.disabled}`}
                    style={style}
                    {...props}
                >
                    {loading ? <div className="absolute animate-spin rounded-full border-t-2 border-white h-5 w-5 py-2"></div> : children}
                </a>
            </Link>
        )
    } else if (onClick || type === "submit") {
        return (
            <button
                onClick={onClick}
                type={type || "button"}
                disabled={disabled}
                className={`${styles.button} ${styleClass ? styles[styleClass] : ''} ${className ? className : ''} ${
                    variant === 'darker' ? styles.darker
                        : variant === 'secondary' ? styles.secondary
                            : variant === 'light' ? styles.light
                                : variant === 'outline' ? styles.outline
                                    : variant === 'outline-primary' ? styles.outline_primary
                                        : variant === 'danger' ? styles.danger
                                            : variant === 'link' ? styles.link
                                                : ''
                    } ${
                    size === "sm" ? styles.sm
                        : size === "md" ? styles.md
                            : size === "lg" ? styles.lg
                                : ''
                    } ${variant === 'link' && disabled ? styles.disabledLink
                        : disabled ? styles.disabled
                            : ''}`}
                style={style}
                {...props}
            >
                {loading ? <div className="absolute animate-spin rounded-full border-t-2 border-white h-5 w-5 py-2"></div> : children}
            </button>
        )
    } else {
        return (
            <div
                className={`${styles.button} ${styleClass ? styles[styleClass] : ''} ${className ? className : ''} ${
                    variant === 'darker' ? styles.darker
                        : variant === 'secondary' ? styles.secondary
                            : variant === 'light' ? styles.light
                                : variant === 'outline' ? styles.outline
                                    : variant === 'outline-primary' ? styles.outline_primary
                                        : variant === 'danger' ? styles.danger
                                            : ''
                    } ${
                    size === "sm" ? styles.sm
                        : size === "md" ? styles.md
                            : size === "lg" ? styles.lg
                                : ''
                    } ${disabled && styles.disabled}`}
                style={style}
                {...props}
            >
                {loading ? <div className="absolute animate-spin rounded-full border-t-2 border-white h-5 w-5 py-2"></div> : children}
            </div>
        )
    }
}