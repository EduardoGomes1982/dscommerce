export function update(inputs: any, name: string, newValue: any) {
    return { ...inputs, [name]: { ...inputs[name], value: newValue } };
}

export function updateAll(inputs: any, newValues: any) {
    const data: any = {};
    Object.keys(inputs).forEach(e => data[e] = { ...inputs[e], value: newValues[e] });
    return data;
}

export function toValues(inputs: any) {
    const data: any = {};
    Object.keys(inputs).forEach(e => data[e] = inputs[e].value);
    return data;
}

export function validate(inputs: any, name: string) {
    if (!inputs[name].validation)
        return inputs;
    const isInvalid: boolean = !inputs[name].validation(inputs[name].value);
    return { ...inputs, [name]: { ...inputs[name], invalid: isInvalid.toString() } };
}