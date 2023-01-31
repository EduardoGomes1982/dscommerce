import Select from "react-select";

export default function FormSelect(props: any) {
    const { className, validation, invalid = "false", dirty = "false", ...selectProps } = props;
    const addStyle = "padding: 0;" + className;

    return (
        <div className={addStyle} data-invalid={invalid} data-dirty={dirty}>
            <Select {...selectProps} />
        </div>
    );
}