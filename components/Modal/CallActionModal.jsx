"use client";
import React, { useEffect, useState } from "react";
import { useSettingModal } from "../../context/communitysetting";
import Peer from "simple-peer";
import { useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import InCallModal from "./InCallModal";
import IncomingCallModal from "./IncomingCallModal";
import { usePeerConnection } from "../../context/peerContext";
import { useSocket } from "../../context/socketContext";
import { toast } from "react-toastify";
const CallingModal = (props) => {
  return (
    <>
      <div className="w-full px-[15px] py-[10px] bg-[#202020] inline-flex items-center justify-between rounded-[12px] mb-[10px]">
        <div className="inline-flex items-center">
          <Image
            src={props.item.avatar}
            width={0}
            height={0}
            alt=""
            className="w-[40px] h-auto"
          />
          <div className="ml-[10px] text-left">
            <p className="text-[13px]">{props.item.name}</p>
            <div className="text-[10px]">
              {props.item.type === "screen" ? (
                <p className="text-[#4DE265]">Sharing Screen</p>
              ) : props.item.type === "speaking" ? (
                <p className="text-[#50FFFF]">Speaking</p>
              ) : props.item.type === "rase_hand" ? (
                <p className="text-[#50FFFF]">Raise hand</p>
              ) : props.item.type === "listening" ? (
                <p className="text-[#6F6F6F]">Listening</p>
              ) : null}
            </div>
          </div>
        </div>
        {props.item.type === "screen" ? (
          <Image
            src="/icon/share_screen.svg"
            alt=""
            className="w-[15px] h-auto"
            width={0}
            height={0}
          />
        ) : props.item.type === "speaking" ? (
          <Image
            src="/icon/mic_blue.svg"
            alt=""
            className="w-[20px] h-auto"
            width={0}
            height={0}
          />
        ) : props.item.type === "listening" ? (
          <Image
            src="/icon/mic_grey.svg"
            alt=""
            className="w-[20px] h-auto"
            width={0}
            height={0}
          />
        ) : null}
      </div>
    </>
  );
};

const CallActionModal = () => {
  const {
    callSignal,
    setCallSignal,
    callActionModal,
    setCallActionModal,
    calling,
    setCalling,
    call,
    setCall,
    ringing,
    setRinging,
    callDetails,
    callState,
    emitEvent,
    inCallSignal,
    setInCallSignal,
  } = usePeerConnection();

  const [streamState, setStreamState] = useState({ video: true, audio: true });

  const [isCaller, setIsCaller] = useState(false);
  const userVideoRef = useRef(null);
  const myVideoRef = useRef(null);
  const [stream, setStream] = useState(null);

  const peerRef = useRef(null);

  const { socket } = useSocket();
  const callings = [
    { avatar: "/avatar/8.svg", type: "screen", name: "@KitshunaFowyu" },
    { avatar: "/avatar/8.svg", type: "speaking", name: "@KitshunaFowyu" },
  ];
  const callMembers = [
    { avatar: "/avatar/8.svg", type: "rase_hand", name: "@KitshunaFowyu" },
    { avatar: "/avatar/8.svg", type: "listening", name: "@KitshunaFowyu" },
    { avatar: "/avatar/8.svg", type: "listening", name: "@KitshunaFowyu" },
    { avatar: "/avatar/8.svg", type: "listening", name: "@KitshunaFowyu" },
    { avatar: "/avatar/8.svg", type: "listening", name: "@KitshunaFowyu" },
  ];

  useEffect(() => {
    if (stream) {
      console.log("useEffect------->");
      const peer = new Peer({ initiator: true, trickle: false, stream });

      peer.on("signal", (data) => {
        console.log("peer signal------->", data);
        setCallSignal(data);
      });

      peer.on("stream", (stream) => {
        console.log("stream------->".stream);
        userVideoRef.current.srcObject = stream;
      });

      peer.on("error", (err) => {
        console.error("Peer connection error:", err);
      });

      peerRef.current = peer;
    }

    return () => {
      if (peerRef.current) {
        peerRef.current.destroy();
      }
    };
  }, [stream]);

  // useEffect(() => {
  //   if ((calling || call) && peerRef.current && callSignal && stream) {
  //     console.log("Add stream ------>", stream);
  //     const videoTrack = stream.getVideoTracks()[0];
  //     const audioTrack = stream.getAudioTracks()[0];
  //     peerRef.current.addTrack(videoTrack, stream);
  //     peerRef.current.addTrack(audioTrack, stream);
  //     // peerRef.current.addStream(stream);
  //     myVideoRef.srcObject = stream;
  //   }
  // }, [stream, calling, call]);

  useEffect(() => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        console.log("devices ------->", devices);
        let cameraAvailable = false;
        let microphoneAvailable = false;

        devices.forEach((device) => {
          if (device.kind === "videoinput") {
            cameraAvailable = true;
          } else if (device.kind === "audioinput") {
            microphoneAvailable = true;
          }
        });

        if (cameraAvailable || microphoneAvailable) {
          console.log(
            `Camera or microphone are available.`,
            cameraAvailable,
            microphoneAvailable
          );
          // Proceed with getUserMedia
          navigator.mediaDevices
            .getUserMedia({
              audio: microphoneAvailable,
              video: cameraAvailable,
            })
            .then((stream) => {
              // Access the audio and video stream
              console.log("Found Stream------->", stream);
              setStream(stream);
            })
            .catch((error) => {
              console.error("Error accessing audio and video stream:", error);
            });
        } else {
          console.log("Camera or microphone is not available.");
          toast.warning("Camera or microphone is not available.");
          // Handle the case where camera or microphone is not available
        }
      })
      .catch((error) => {
        console.error("Error enumerating media devices:", error);
      });
  }, []);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("someone-is-comming", (data) => {
        console.log(data);
        setInCallSignal(data.signal);
        setRinging(true);
      });

      socket.current.on("call-answered", (signal) => {
        console.log("call answered ------->", signal);
        setCalling(false);
        setCall(true);
        setCallActionModal(true);
        console.log(signal);
        peerRef.current.signal(signal);
      });

      socket.current.on("call-rejected", (signal) => {
        console.log(signal);
        leave();
      });
      socket.current.on("caller-ended-call", (data) => {
        console.log("caller-ended-call", data);
        leave();
        setCall(false);
        setRinging(false);
        setCallActionModal(false);
      });
    }
  }, [socket.current]);

  useEffect(() => {
    calling && callSignal && CallUser();
  }, [calling]);

  const CallUser = () => {
    if (peerRef.current && callSignal) {
      console.log("calling user ");
      setCalling(true);
      setIsCaller(true);
      socket.current.emit("call-user", {
        signal: callSignal,
        details: callDetails,
        room_id: callDetails.room_id,
      });
    } else {
      console.log("have no peer instance------->");
    }
  };

  const CallAnswered = () => {
    if (!inCallSignal) {
      console.error("Call signal is null.");
      return;
    }
    setCall(true);
    setCallActionModal(true);
    setIsCaller(false);
    setRinging(false);
    console.log("answering call ");

    socket.current.emit("user-answered-call", {
      signal: callSignal,
      room_id: callDetails.room_id,
    });

    peerRef.current.on("stream", (stream) => {
      console.log("stream", stream);
      userVideoRef.current.srcObject = stream;
    });

    console.log("Peer connected, setting remote description.");
    peerRef.current.signal(inCallSignal);

    // Set up error handling for the peer connection
    peerRef.current.on("error", (err) => {
      console.error("Peer connection error:", err);
    });
  };

  const leave = () => {
    if (
      peerRef?.current &&
      peerRef?.current.streams &&
      peerRef?.current.streams.length > 0
    ) {
      console.log("Removed sream-------->");
      peerRef.current.removeStream();
    } else console.log("No sream-------->");
  };

  const rejectCall = () => {
    emitEvent("reject-call", { room_id: callDetails.room_id });
    setRinging(false);
  };

  const cancelCall = () => {
    emitEvent("end-call", { room_id: callDetails.room_id });
    leave();
    setCalling(false);
    setCallActionModal(false);
  };

  return (
    <>
      {
        <div className={`${(!callActionModal || !call) && "hidden"}`}>
          {/* <div className="fixed left-0 mobile:right-[400px] right-0 top-0 bottom-0 bg-black bg-opacity-[65%] backdrop-blur-[12px] flex items-center justify-center z-30" onClick={() => {setCall(false)}}></div> */}
          <div
            className={`fixed left-0 mobile:right-[400px] right-0 top-0 bottom-0 flex items-center justify-center z-30`}
          >
            <div
              className="w-full h-full bg-black bg-opacity-[65%] backdrop-blur-[12px]"
              onClick={() => {
                setCall(false);
              }}
            ></div>
            <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[75%]">
              <video
                ref={userVideoRef}
                autoPlay
                playsInline
                alt="my-video"
                className="w-full h-full"
                poster={
                  !isCaller
                    ? callDetails?.receiver?.avatar ?? "/icon/person.png"
                    : callDetails?.caller?.avatar ?? "/icon/person.png"
                }
              />
              <div className="absolute left-[3%] bottom-[5%] w-full">
                <video
                  ref={myVideoRef}
                  autoPlay
                  muted={true}
                  playsInline
                  alt="my-video"
                  className="w-[15%] h-auto"
                  poster={
                    isCaller
                      ? callDetails?.receiver?.avatar ?? "/icon/person.png"
                      : callDetails?.caller?.avatar ?? "/icon/person.png"
                  }
                />
              </div>
              <div className="absolute right-[3%] bottom-[55%] w-full">
                <div className="w-full absolute">
                  <div className="absolute right-0 w-[5%]">
                    <Image
                      src="/icon/share_screen_grey.svg"
                      className="w-full h-auto mb-[15%]"
                      width={0}
                      height={0}
                      alt=""
                    />
                    <Image
                      src="/icon/add_person_grey.svg"
                      className="w-full h-auto mb-[15%]"
                      width={0}
                      height={0}
                      alt=""
                    />
                    <Image
                      src="/icon/audio_call_grey.svg"
                      className="w-full h-auto mb-[15%]"
                      width={0}
                      height={0}
                      alt=""
                    />
                    <Image
                      src="/icon/camera_call_grey.svg"
                      className="w-full h-auto mb-[15%]"
                      width={0}
                      height={0}
                      alt=""
                    />
                    <Image
                      src="/icon/mic_call_grey.svg"
                      className="w-full h-auto mb-[15%]"
                      width={0}
                      height={0}
                      alt=""
                    />
                    <button
                      onClick={() => {
                        setCall(false);
                        setCalling(false);
                        cancelCall();
                      }}
                    >
                      <Image
                        src="/icon/call_off.svg"
                        className="w-full h-auto"
                        width={0}
                        height={0}
                        alt=""
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div className="absolute right-[3%] top-[5%] w-full">
                <button className="w-full absolute">
                  <div className="absolute right-0 w-[5%] aspect-square rounded-full border-[1px] border-white items-center justify-center flex">
                    <Image
                      src="/icon/zoom_call.svg"
                      width={0}
                      height={0}
                      alt=""
                      className="w-[50%] h-auto"
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      }
      <div
        className={`${
          callActionModal ? "w-[400px]" : "w-0"
        } flex flex-none h-full bg-[#171717] transition-all duration-500 overflow-auto absolute right-0 z-20 prevent-select`}
      >
        <div className="w-[400px] h-full bg-[#171717] px-[26px] pt-[50px] pb-[50px]">
          <div className="w-[340px] h-full flex flex-col">
            <div className="inline-flex justify-between w-full items-center">
              <button
                onClick={() => {
                  setCallActionModal(false);
                }}
              >
                <Image
                  src="/icon/back_bgwhite.svg"
                  width={0}
                  height={0}
                  alt=""
                  className="w-[30px] h-auto"
                />
              </button>
              <p>Call Actions</p>
              <Image
                src="/icon/detail_white.svg"
                width={0}
                height={0}
                alt=""
                className="w-[30px] h-auto"
              />
            </div>
            <div className="w-full mt-[100px] h-full overflow-auto">
              <div className="w-full">
                {callings.map((item, index) => (
                  <button
                    className="w-full"
                    key={index}
                    onClick={() => setCall(!call)}
                  >
                    <CallingModal item={item} />
                  </button>
                ))}
              </div>
              <p className="mt-[30px]">Members</p>
              <div className="w-full mt-[30px]">
                {callMembers.map((item, index) => (
                  <button
                    className="w-full"
                    key={index}
                    onClick={() => {
                      setCall(!call);
                      setCalling(!calling);
                    }}
                  >
                    <CallingModal item={item} />
                  </button>
                ))}
              </div>
            </div>
            <div className="w-full mt-[20px] inline-flex justify-between bottom-0">
              <Image
                src="/icon/audio_call.svg"
                width={0}
                height={0}
                alt=""
                className="w-[50px] h-auto"
              />
              <Image
                src="/icon/addperson_call.svg"
                width={0}
                height={0}
                alt=""
                className="w-[50px] h-auto"
              />
              <Image
                src="/icon/camera_call.svg"
                width={0}
                height={0}
                alt=""
                className="w-[50px] h-auto"
              />
              <Image
                src="/icon/mic_call.svg"
                width={0}
                height={0}
                alt=""
                className="w-[50px] h-auto"
              />
              <button onClick={() => cancelCall()}>
                <Image
                  src="/icon/call_off.svg"
                  width={0}
                  height={0}
                  alt=""
                  className="w-[50px] h-auto"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      {calling && (
        <InCallModal cancelCall={cancelCall} callDetails={callDetails} />
      )}
      {ringing && (
        <IncomingCallModal
          CallAnswered={CallAnswered}
          callDetails={callDetails}
          rejectCall={rejectCall}
        />
      )}
    </>
  );
};
export default CallActionModal;
