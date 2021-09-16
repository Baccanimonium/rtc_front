import React, {useCallback, useRef} from "react";
import {View} from "react-native";

export const Form = ({ fields, value, style, onChange }) => {
    const valueRef = useRef(value)
    valueRef.current = value
    const onInput = useCallback((id) => (value) => {
        onChange({...valueRef.current, [id]: value})
    },[] )
    return (
        <View style={style}>
            {fields.map(({component: Comp, id, ...payload}) => (
                <Comp
                    {...payload}
                    key={id}
                    value={value[id]}
                    onChangeText={onInput(id)}
                />
            ))}
        </View>
    )
}

export default Form