export default function FormInput(props: any) {
    const { validation, invalid = "false", dirty = "false", ...inputProps } = props;

    return (
        <input {...inputProps} data-invalid={invalid} data-dirty={dirty} />
    );
}