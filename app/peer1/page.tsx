'use client'

import {useEffect, useState} from "react";
import Peer, {DataConnection} from "peerjs";
//https://github.com/peers/peerjs/issues/819
export default function Peer1() {
    const [peerId, setPeerId] = useState<string>('')
    const [peer, setPeer] = useState<Peer>()
    const [conn, setConn] = useState<DataConnection>()
    const [receivedMessage, setReceivedMessage] = useState<string>()

    useEffect(() => {
        const peer = new Peer()
        setPeer(peer)

        peer.on('open', id => {
            console.log('My peer ID is: ', id)
            //const conn = peer.connect(peerId)

            // conn.on('data', data => console.log('Received', data))
            // conn.send('peer1')
        })

        peer.on('connection', (dataConnection) => {
            console.log('dataConnection', dataConnection)
            dataConnection.on('open', ()=> {

                dataConnection.on('data', (data) => {
                    console.log('Received', data)
                })

                dataConnection.send('my name is peer1')
            })

        })

        //
        // // start connection
        // const conn = peer.connect('dest-peer-id')
        // // receive connection
        // peer.on('connection', (conn)=>{})
        //
        // peer.on('open', () => {
        //     // receive message
        //     conn.on('data', data => console.log('Received', data))
        //
        //     conn.send('Hello!')
        // })

    }, [])

    return (
        <>
        </>
    )
}