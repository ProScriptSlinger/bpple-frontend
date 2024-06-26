"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSocket } from "./socketContext";
import { useUser } from "./appContext";
import CallActionModal from "../components/Modal/CallActionModal";
import CallModal from "../components/Modal/CallModal";
import { toast } from "react-toastify";
import Peer from "simple-peer";

const PeerContext = createContext();

export function usePeerConnection() {
  return useContext(PeerContext);
}

export function PeerConnectionProvider({ children }) {
  const { socket } = useSocket();
  const [callSignal, setCallSignal] = useState(null);
  const [callEnded, setCallEnded] = useState(false);
  const [ringing, setRinging] = useState(false);
  const [callDetails, setCallDetails] = useState(null);
  const [callState, setCallState] = useState("idle");
  const [callActionModal, setCallActionModal] = useState(false);
  const [calling, setCalling] = useState(false);
  const [call, setCall] = useState(false);

  //who start call room_id
  useEffect(() => {
    if (socket.current) {
      socket.current.on("comming-user", (data) => {
        console.log("comming-user", data);
        setCallState("calling");
        setRinging(true);
        setCallDetails(data.details);
        setCallSignal(data.signal);
      });

      socket.current.on("caller-ended-call", (data) => {
        console.log("caller-ended-call", data);
        setCall(false);
        setRinging(false);
        setCallActionModal(false);
        setCallEnded(true);
        setCallState("idle");
      });

      socket.current.on("call-rejected", (data) => {
        console.log("call-rejected", data);
        console.error("Call rejected!");
        toast.warning("Call rejected!");
        setCalling(false);
        setCallState("idle");
      });

      socket.current.on("call-answered", (data) => {
        console.log("call-answered", data);
        setCalling(false);
        setCall(true);
        setCallActionModal(true);
        setCallState("answered");
      });

      socket.current.on("error", (error) => {
        console.error("Socket error:", error);
      });
    }
  }, [socket.current]);

  const emitEvent = (eventName, eventData) => {
    if (socket.current) {
      socket.current.emit(eventName, eventData);
    } else {
      console.error("Socket is not initialized.");
    }
  };

  const value = {
    emitEvent,
    callSignal,
    setCallSignal,
    callEnded,
    setCallEnded,
    ringing,
    setRinging,
    callDetails,
    setCallDetails,
    callState,
    setCallState,
    callActionModal,
    setCallActionModal,
    calling,
    setCalling,
    call,
    setCall,
  };

  return (
    <PeerContext.Provider value={value}>
      <CallActionModal />

      {children}
    </PeerContext.Provider>
  );
}
