import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello Native!</Text>
      <Button title="textão"></Button>
      <StatusBar style="auto" backgroundColor="red" />
    </View>
  )
}

interface ButtonProps {
  title: string
}

function Button(props: ButtonProps) {
  return (
    <TouchableOpacity>
      <Text>{props.title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 22
  }
})
