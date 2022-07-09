import React, { useRef } from 'react'
import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';
import './Diagram.css';

interface Props {
  nodes: Array<go.ObjectData>;
  links: Array<go.ObjectData>;
  modelData: go.ObjectData;
  onModelChange?: (e: go.IncrementalData) => void;
}

const Diagram: React.FC<Props> = (props) => {
  const ref = useRef<ReactDiagram>(null);

  function initDiagram(): go.Diagram {
    const $ = go.GraphObject.make;
    const diagram =
      $(go.Diagram,
        {
          'undoManager.isEnabled': true,
          model: new go.GraphLinksModel(
            {
              linkKeyProperty: 'key'
            })
        });


    diagram.nodeTemplate =
      $(go.Node, 'Auto',
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape,
          {
            name: 'SHAPE',
            fill: 'white',
            strokeWidth: 0,
            portId: '',
            fromLinkable: true,
            toLinkable: true,
            cursor: 'pointer'
          },
          new go.Binding("figure", "fig"),
          new go.Binding('fill', 'color')),
        $(go.TextBlock,
          { name: "TEXT", margin: 8, font: '400 18px Roboto, sans-serif' },
          new go.Binding('text').makeTwoWay()
        ),
        {
          contextMenu:
            $("ContextMenu",
              $("ContextMenuButton",
                $(go.TextBlock, "Change Font Size"),
                {
                  click: function (e, obj) {
                    diagram.commit(function () {
                      var context = obj.part;
                      if (!context) return;
                      // @ts-ignore
                      var node = context.adornedPart;
                      var tb = node.findObject("TEXT");
                      let fontEls = tb.font.split(' ');

                      const fontSize = parseInt(fontEls[1]) * 2;
                      fontEls[1] = `${fontSize}px`
                      tb.font = fontEls.join(' ');
                    }, "changed font size");
                  }
                })
            )
        }
      );

    diagram.linkTemplate =
      $(go.Link,
        new go.Binding('relinkableFrom', 'canRelink').ofModel(),
        new go.Binding('relinkableTo', 'canRelink').ofModel(),
        $(go.Shape, { strokeWidth: 6, name: "LINK" }),
        $(go.Shape, { toArrow: 'Standard', strokeWidth: 6 }),
        {
          contextMenu:
            $("ContextMenu",
              $("ContextMenuButton",
                $(go.TextBlock, "Change Size"),
                {
                  click: function (e, obj) {
                    diagram.commit(function (d) {
                      var context = obj.part;
                      if (!context) return;
                      // @ts-ignore
                      var node = context.adornedPart;
                      var tb = node.findObject("LINK");
                      tb.strokeWidth = tb.strokeWidth / 2
                    }, "changed size");
                  }
                })
            )
        }
      );

    return diagram;
  }

  return (
    <ReactDiagram
      ref={ref}
      divClassName='diagram-component'
      initDiagram={initDiagram}
      nodeDataArray={props.nodes}
      linkDataArray={props.links}
      modelData={props.modelData}
      onModelChange={props.onModelChange}
    />
  )
}

export default Diagram
