import { useState } from 'react'
import styles from '../../styles/form.module.scss'

/* The onChange function should look like this

    handleChange = (e) => {
        if (e.target.name) {
            this.setState({ [e.target.name]: e.target.value });
        } else {
            this.setState({ [e.currentTarget.name]: "" });
        }
    } 
*/

export default function Input(props) {
    const { type, name, label, placeholder, err_msg, disabled, onChange, value, required, className, trailing, noconfirm, acoff, readOnly, selectOptions } = props;
    const [hide, setHide] = useState(true);

    if (type === "image") {
        return (
            <div className={styles.dynamic_input}>
                <input
                    id={name}
                    type='file'
                    className={`cursor-pointer ${styles.input_field} ${className ? className : ''} ${
                        err_msg ? styles.error : ''
                        } ${
                        (value || value === 0) ? styles.filled : ''
                        } ${
                        disabled ? styles.disabled : ''
                        } ${
                        !label ? styles.nolabel : 'opacity-0'
                        }`}
                    onChange={onChange}
                    name={name}
                    disabled={disabled}
                    required={required}
                    readOnly={readOnly}
                    placeholder={placeholder}
                    autoComplete={acoff ? "off" : ""}
                    accept="image/*"
                />
                {label && (
                    <label htmlFor={name} className={styles.label}>
                        {label}
                    </label>
                )}
            </div>
        )
    }

    if (type === "select") {
        return (
            <div className={`${styles.dynamic_input} ${disabled && styles.disabled}`}>
                <select
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    disabled={disabled}
                    className={styles.input_field}
                >
                    <option disabled value="">
                        -- Select an option --
                        </option>
                    {selectOptions.map(({ label, value }) => (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    ))}
                </select>
                <label htmlFor={name} className={styles.label}>
                    {label}
                </label>
            </div>
        )
    }

    return (
        <div className={styles.dynamic_input}>
            <input
                type={hide ? type : 'text'}
                className={`${styles.input_field} ${className ? className : ''} ${
                    err_msg ? styles.error : ''
                    } ${
                    (value || value === 0) ? styles.filled : ''
                    } ${
                    disabled ? styles.disabled : ''
                    } ${
                    !label ? styles.nolabel : ''
                    }`}
                value={value}
                onChange={onChange}
                name={name}
                disabled={disabled}
                required={required}
                readOnly={readOnly}
                placeholder={placeholder}
                autoComplete={acoff ? "off" : ""}
            />
            {label && <div className={styles.label}>{label}</div>}
            {err_msg && <div className={styles.err_msg}>{err_msg}</div>}
            {trailing ?
                <div className={styles.trailing_text}>{trailing}</div>
                : (value && !disabled) && !readOnly && type !== "color" ?
                    <button name={name} type="button" onClick={onChange} className={styles.trailing}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.92 0.185398L5.99999 5.10544L1.07983 0.185276C0.9612 0.066648 0.800308 2.0923e-06 0.632545 0C0.464781 -2.09221e-06 0.30389 0.0666398 0.185265 0.185265C0.0666397 0.30389 -2.14877e-06 0.464781 0 0.632545C2.14887e-06 0.800308 0.0666481 0.9612 0.185276 1.07983L5.10544 5.99999L0.185402 10.92C0.0667773 11.0387 0.000135402 11.1995 0.000137551 11.3673C0.0001397 11.5351 0.0667857 11.696 0.185414 11.8146C0.241338 11.8749 0.309547 11.9226 0.385442 11.9543C0.461338 11.9861 0.543158 12.0012 0.625387 11.9987C0.707616 11.9961 0.788345 11.976 0.862132 11.9396C0.93592 11.9032 1.00105 11.8514 1.05314 11.7878L5.97318 6.86773L10.9202 11.8147C11.0388 11.9334 11.1997 12 11.3675 12C11.5352 12 11.6961 11.9334 11.8147 11.8147C11.9334 11.6961 12 11.5352 12 11.3675C12 11.1997 11.9334 11.0388 11.8147 10.9202L6.89457 6.00001L11.8146 1.07997C11.9332 0.961348 11.9999 0.800457 11.9999 0.632693C11.9999 0.46493 11.9332 0.304037 11.8146 0.185409C11.696 0.0667815 11.5351 0.000135118 11.3673 0.000133025C11.1995 0.000130933 11.0387 0.0667733 10.92 0.185398Z" fill="#595A5C" />
                        </svg>
                    </button>
                    :
                    ''
            }
            {type === 'password' && !noconfirm && <div className="flex items-center pt-3">
                <input type="checkbox" onClick={() => setHide(!hide)} className="h-5 w-5" />
                <div className="ml-3 text-sm">Show Password</div>
            </div>}
        </div>
    )
}