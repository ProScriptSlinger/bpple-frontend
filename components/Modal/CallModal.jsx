"use client";
import { useSocket } from "../../context/socketContext";
import Peer from "simple-peer";
import React, { useEffect, useRef, useState } from "react";
import { usePeerConnection } from "../../context/peerContext";

const room_id = "1245";

const CallModal = () => {
  const { socket } = useSocket();
  const { callSignal, setCallSignal, call, setCall } = usePeerConnection();
  const [stream, setStream] = useState(null);
  const userVideoRef = useRef(null);
  const myVideoRef = useRef(null);
  // const [callSignal, setCallSignal] = useState(null);
  const peerRef = useRef(null);

  useEffect(() => {
    const handleMediaStreamError = (error) => {
      console.error("Error accessing media devices:", error);
    };

    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        setStream(stream);
        if (myVideoRef.current) {
          myVideoRef.current.srcObject = stream;
        }
      })
      .catch(handleMediaStreamError);

    return () => {
      if (peerRef.current) {
        peerRef.current.destroy();
        peerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (socket.current) {
      socket.current.emit("join-room", { room_id });

      socket.current.on("someone-is-comming", (data) => {
        console.log(data);
        setCallSignal(data.signal);
      });

      socket.current.on("call-answered", (signal) => {
        console.log(signal);
        peerRef.current.signal(signal);
      });
    }
  }, [socket.current]);

  const CallUser = () => {
    console.log("calling user ");

    const peer = new Peer({ initiator: true, trickle: false, stream: stream });

    peer.on("signal", (data) => {
      socket.current.emit("call-user", { signal: data, room_id });
      console.log(data);
    });

    peer.on("stream", (stream) => {
      console.log(stream);
      userVideoRef.current.srcObject = stream;
    });

    peer.on("error", (err) => {
      console.error("Peer connection error:", err);
    });

    peerRef.current = peer;
  };

  const CallAnswered = () => {
    if (!callSignal) {
      console.error("Call signal is null.");
      return;
    }
    console.log("answering call ");

    const peer = new Peer({ initiator: false, trickle: false, stream: stream });

    peer.on("signal", (data) => {
      socket.current.emit("user-answered-call", { signal: data, room_id });
      console.log("signal", data);
    });

    peer.on("stream", (stream) => {
      console.log("stream", stream);
      userVideoRef.current.srcObject = stream;
    });

    console.log("Peer connected, setting remote description.");
    peer.signal(callSignal);

    // Set up error handling for the peer connection
    peer.on("error", (err) => {
      console.error("Peer connection error:", err);
    });

    peerRef.current = peer;
  };

  const leave = () => {
    if (peerRef.current) {
      peerRef.current.destroy();
    }
  };

  return (
    <div className=" ">
      <div className="  z-50 text-[14px] w-full font-ttfirs fixed  top-0 right-0 h-screen flex items-center justify-center">
        <div className=" bg-[#181818]/40  z-0 text-[14px] w-full font-ttfirs fixed  top-0 right-0 h-screen flex items-center justify-center " />
        <div className=" w-full z-2 relative py-20 max-w-[350px] p-10 mx-auto bg-[#181818]/50 backdrop-blur-xl  rounded-3xl  border  border-[#393939]">
          <div className=" grid">
            <button onClick={leave} className={`p-5 border  border-red-400`}>
              leave
            </button>
            <>
              <button
                onClick={CallAnswered}
                className={`p-5 border  border-red-400
                `}
              >
                CallAnswered
              </button>
              <button
                onClick={CallUser}
                className={`p-5 border border-red-400`}
              >
                CallUser
              </button>
              <button
                onClick={() => setCall(false)}
                className={`p-5 border border-red-400`}
              >
                Cancel
              </button>
            </>
          </div>

          <video
            playsInline
            ref={userVideoRef}
            autoPlay
            className=" flex w-full h-[200px]"
          />
          <video
            ref={myVideoRef}
            autoPlay
            muted={true}
            playsInline
            className=" flex w-full h-[200px]"
          />
        </div>
      </div>
    </div>
  );
};

export default CallModal;
