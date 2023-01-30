export default function FormTextArea(props: any) {
    const { validation, invalid = "false", dirty = "false", ...textareaProps } = props;

    return (
        <textarea {...textareaProps} data-invalid={invalid} data-dirty={dirty} />
    );
}