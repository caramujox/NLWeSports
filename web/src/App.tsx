//JSX: Javascript+XML

interface ButtonProps {
  title: string
}

function Button(props: ButtonProps) {
  return <button>{props.title}</button>
}
function App() {
  return (
    <div>
      <h1>Hello NLW!</h1>
      <Button title="Send 1" />
      <Button title="hello" />
      <Button title="worlds!" />
    </div>
  )
}

export default App
