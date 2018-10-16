import * as React from "react"
import { StyleSheet, Text, View } from "react-native"

export default class App extends React.Component {
    public render(): JSX.Element {
        return (
            <View style={styles.container}>
                <Text>Open up App.js to start working on your app, yo !</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: "#fff",
        flex: 1,
        justifyContent: "center",
    },
})
