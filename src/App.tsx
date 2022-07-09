import Diagram from './components/Diagram'


const App = () => {

  return (
    <div>
      <Diagram
        nodes={[
          { key: 0, text: 'Value', color: 'lightblue', loc: '0 0', fig: 'Ellipse' },
          { key: 1, text: 'Blue', color: 'violet', loc: '300 0', fig: 'RoundedRectangle' },
          { key: 2, text: 'Dolphin', color: 'lightgreen', loc: '0 300', fig: 'RoundedRectangle' },
          { key: 3, text: 'BlueSea', color: 'orange', loc: '300 300', fig: 'Ellipse' },
          { key: 4, text: 'Awesome', color: 'pink', loc: '150 400', fig: 'RoundedRectangle' },
        ]}
        links={[
          { key: -1, from: 0, to: 1 },
          { key: -2, from: 1, to: 3 },
          { key: -3, from: 3, to: 4 },
          { key: -4, from: 4, to: 2 },
          { key: -5, from: 2, to: 0 },
        ]}
        modelData={{ canRelink: true }}
      />
    </div>
  )
}

export default App
