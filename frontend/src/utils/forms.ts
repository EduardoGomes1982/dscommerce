export function update(inputs: any, name: string, newValue: any) {
    return { ...inputs, [name]: { ...inputs[name], value: newValue } };
}

export function toValues(inputs: any) {
    const data: any = {};
    Object.keys(inputs).forEach(e => data[e] = inputs[e].value);
    return data;
}