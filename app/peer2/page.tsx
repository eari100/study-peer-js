'use client'

import {ChangeEvent, useEffect, useState} from "react";
import Peer, {DataConnection} from "peerjs";

export default function Peer2() {
    console.log('peer2')
    const [peerId, setPeerId] = useState<string>('')
    const [peer, setPeer] = useState<Peer>()
    const [conn, setConn] = useState<DataConnection>()
    const handlePeerIdChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPeerId(event.target.value)
    }

    const connectPeer = () => {
        console.log('connectPeer')
        console.log('peerId ', peerId)
        const conn = peer!.connect(peerId)
        // setConn(conn)

        // receive connection
        //peer!.on('connection', (conn)=>{})
        conn.on('open', () => {
            console.log('open')

            conn.on('data', function(data) {
                console.log('Received', data);
            });

            // Send messages
            conn.send('my name is peer2');
        })
    }

    useEffect(() => {
        const peer = new Peer()
        setPeer(peer)

        peer.on('open', id => {
            console.log('My peer ID is: ', id)

            // conn!.on('data', data => console.log('Received', data))
            //
            // conn!.send('peer2')
        })

        // peer.on('connection', (dataConnection) => {
        //     console.log('peer connection')
        //
        //     dataConnection.on('open', () => {
        //
        //     })
        // })

        // peer.on('open', () => {
        //     // receive message
        //     conn.on('data', data => console.log('Received', data))
        //
        //     conn.send('Hello!')
        // })

    }, [peerId])

    return (
        <div>
            <input
                type='text'
                onChange={handlePeerIdChange}
            />
            <button onClick={connectPeer}>연결</button>
        </div>
    )
}