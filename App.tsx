import 'react-native-gesture-handler' // Import dependency of react-native-screens
import { enableScreens } from 'react-native-screens' // react-native-screens is a react-navigation dependency
import React from 'react'
import { Platform, SafeAreaView, View, Text, LogBox } from 'react-native'
import { RecoilRoot } from 'recoil'
import { MainView } from './src'

// remove highlight effect for react native web inputs
const noGlow = `
textarea, select, input, button {
	-webkit-appearance: none;
	outline: none!important;
}
textarea:focus, select:focus, input:focus, button:focus {
	-webkit-appearance: none;
	outline: none!important;
}
`
export const injectWebCss = () => {
    const style = document.createElement('style')
    style.textContent = `textarea, select, input, button { outline: none!important; }`
    return document.head.append(style)
}
{
    Platform.OS == 'web' ? injectWebCss() : null
}

// remove the ole' android emulator yellow log box
LogBox.ignoreLogs(['Setting a timer', 'Require cycle'])
enableScreens()

export default function App() {
    return (
        <RecoilRoot>
            <SafeAreaView style={{ flex: 1 }}>
                <MainView />
            </SafeAreaView>
        </RecoilRoot>
    )
}
