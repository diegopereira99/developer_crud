import { TextField } from "@material-ui/core";
import { Control, Controller } from "react-hook-form";
import styles from "./styles.module.scss";

interface ControlledInputProps {
    control: Control<any>,
    name: string,
    type?: string,
    errors: any,
    rules: any,
    label: string,
    autoFocus?: boolean,
    children?: JSX.Element[] | JSX.Element,
    select?: boolean,
    required?: boolean
}

export default function ControlledInput({ control, name, errors, rules, type, label, autoFocus, select, required, children }: ControlledInputProps) {
    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field }) => (
                <TextField
                    {...field}
                    autoFocus={autoFocus}
                    select={select}
                    required={required}
                    value={field.value ?? ''}
                    error={!!errors[name]}
                    helperText={errors[name] && errors[name].message}
                    className={styles.developerInput}
                    margin="dense"
                    label={label}
                    type={type}
                    fullWidth
                    inputProps={{ 'aria-label': name }}
                >
                    {children}
                </TextField>
            )}
        />
    );
}