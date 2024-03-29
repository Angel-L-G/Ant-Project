import React from 'react'
import { Accordion } from 'react-bootstrap'
import "../index.css"

type Props = {}

const Main = (props: Props) => {
    return (
        <div style={{ backgroundColor: "blue !important" }}>
            <Accordion>
                <Accordion.Item eventKey="0" style={{ backgroundColor: "blue !important" }}>
                    <Accordion.Header style={{ backgroundColor: "blue !important" }}>Hola 1</Accordion.Header>
                    <Accordion.Body style={{ backgroundColor: "blue" }}>
                        <a href='/Hola 1-1' style={{ display: 'block' }}>Hola 1-1</a>
                        <a href='/Hola 1-2' style={{ display: 'block' }}>Hola 1-2</a>
                        <a href='/Hola 1-3' style={{ display: 'block' }}>Hola 1-3</a>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1" style={{ backgroundColor: "blue !important" }}>
                    <Accordion.Header style={{ backgroundColor: "blue !important" }}>Hola 2</Accordion.Header>
                    <Accordion.Body style={{ backgroundColor: "blue" }}>
                        <a href='/Hola 2-1' style={{ display: 'block' }}>Hola 2-1</a>
                        <a href='/Hola 2-2' style={{ display: 'block' }}>Hola 2-2</a>
                        <a href='/Hola 2-3' style={{ display: 'block' }}>Hola 2-3</a>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}

export default Main