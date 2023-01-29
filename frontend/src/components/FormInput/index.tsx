export default function FormInput(props: any) {
    const { validation, invalid = "false", durty = "false", ...inputProps } = props;

    return (
        <input {...inputProps} data-invalid={invalid} data-durty={durty} />
    );
}