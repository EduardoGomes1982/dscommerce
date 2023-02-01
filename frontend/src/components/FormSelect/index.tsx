import Select from "react-select";

export default function FormSelect(props: any) {
    const { className, validation, invalid = "false", dirty = "false", ...selectProps } = props;

    return (
        <div className={className} data-invalid={invalid} data-dirty={dirty}>
            <Select {...selectProps} />
        </div>
    );
}