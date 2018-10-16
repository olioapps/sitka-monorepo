import * as React from "react"
import { Button } from "react-native"

export const ButtonMobile = () => {
    return (
        <Button
            title="Button herrre"
            onPress={() => {
                console.log("buttonPressed")
            }}
        />
    )
}
