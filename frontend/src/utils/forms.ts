export function update(inputs: any, name: string, newValue: any) {
    const data: any = { ...inputs, [name]: { ...inputs[name], value: newValue } };
    return data;
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
    const data: any = { ...inputs, [name]: { ...inputs[name], invalid: isInvalid.toString() } }
    return data;
}

export function toDirty(inputs: any, name: string) {
    const data: any = { ...inputs, [name]: { ...inputs[name], dirty: "true" } };
    return data;
}

export function updateAndValidate(inputs: any, name: string, newValue: any) {
    return validate(update(inputs, name, newValue), name);
}

export function dirtyAndValidate(inputs: any, name: string) {
    return validate(toDirty(inputs, name), name);
}