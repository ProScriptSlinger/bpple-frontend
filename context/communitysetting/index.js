"use client";
import React, { useContext, createContext, useEffect, useState } from "react";

const ModalContext = createContext({
  communitySettingmodal: false,
  setCommunitySettingmodal: () => {},
  communityProfileModal: false,
  setCommunityProfileModal: () => {},
  communityMemberProfileModal: false,
  setCommunityMemberProfileModal: () => {},
  friendProfileModal: false,
  setFriendProfileModal: () => {},
  userSearchModal: false,
  setUserSearchModal: () => {},
  newCommunityModal: false,
  setNewCommunityModal: () => {},
  newChannelModal: false,
  setNewChannelModal: () => {},
  newRoomModal: false,
  setNewRoomModal: () => {},
  nftBuyModal: false,
  setNftBuyModal: () => {},
  nftBuyConfirmModal: false,
  setNftBuyConfirmModal: () => {},
  callActionModal: false,
  setCallActionModal: () => {},
  calling: false,
  setCalling: () => {},
  newGroupModal: false,
  setNewGroupModal: () => {},
  nftListModal: false,
  setNftListModal: () => {},
  nftUnListModal: false,
  setNftUnListModal: () => {},
  recordingModal: false,
  setRecordingModal: () => {},
  nftTransferModal: false,
  setNftTransferModal: () => {},
});

export const useSettingModal = () => {
  return useContext(ModalContext);
};

const SettingModalProvider = ({ children }) => {
  const [communitySettingmodal, setCommunitySettingmodal] =
    React.useState(false);
  const [communityProfileModal, setCommunityProfileModal] =
    React.useState(false);
  const [communityProfileInModal, setCommunityProfileInModal] = React.useState(
    {}
  );
  const [communityMemberProfileModal, setCommunityMemberProfileModal] =
    React.useState(false);
  const [friendProfileModal, setFriendProfileModal] = React.useState(false);
  const [userSearchModal, setUserSearchModal] = React.useState(false);
  const [newCommunityModal, setNewCommunityModal] = React.useState(false);
  const [newChannelModal, setNewChannelModal] = React.useState(false);
  const [newRoomModal, setNewRoomModal] = React.useState(false);
  const [nftBuyModal, setNftBuyModal] = React.useState(false);
  const [nftBuyConfirmModal, setNftBuyConfirmModal] = React.useState(false);
  const [callActionModal, setCallActionModal] = React.useState(false);
  const [calling, setCalling] = React.useState(false);
  const [newGroupModal, setNewGroupModal] = React.useState(false);
  const [nftListModal, setNftListModal] = React.useState(false);
  const [nftUnListModal, setNftUnListModal] = React.useState(false);
  const [recordingModal, setRecordingModal] = React.useState(false);
  const [nftTransferModal, setNftTransferModal] = React.useState(false);
  const _functions = {
    1: setCommunitySettingmodal,
    2: setCommunityProfileModal,
    3: setCommunityMemberProfileModal,
    4: setFriendProfileModal,
    5: setUserSearchModal,
    6: setNewChannelModal,
    7: setNewCommunityModal,
    8: setNewRoomModal,
    9: setNftBuyModal,
    10: setNftBuyConfirmModal,
    11: setCallActionModal,
    12: setCalling,
    13: setNewGroupModal,
    15: setNftListModal,
    16: setNftUnListModal,
    17: setRecordingModal,
    18: setNftTransferModal,
  };

  const initialValue = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18,
  ];

  const handleformat = (index) => {
    const functionArray = initialValue.filter((item) => item !== index);
    functionArray.forEach((item) => {
      _functions[item](false);
    });
  };

  useEffect(() => {
    if (communitySettingmodal) handleformat(1);
  }, [communitySettingmodal]);

  useEffect(() => {
    if (communityProfileModal) handleformat(2);
  }, [communityProfileModal]);

  useEffect(() => {
    if (communityMemberProfileModal) handleformat(3);
  }, [communityMemberProfileModal]);

  useEffect(() => {
    if (friendProfileModal) handleformat(4);
  }, [friendProfileModal]);

  useEffect(() => {
    if (userSearchModal) handleformat(5);
  }, [userSearchModal]);

  useEffect(() => {
    if (newChannelModal) handleformat(6);
  }, [newChannelModal]);

  useEffect(() => {
    if (newCommunityModal) handleformat(7);
  }, [newCommunityModal]);

  useEffect(() => {
    if (newRoomModal) handleformat(8);
  }, [newRoomModal]);

  useEffect(() => {
    if (nftBuyModal) handleformat(9);
  }, [nftBuyModal]);

  useEffect(() => {
    if (nftBuyConfirmModal) handleformat(10);
  }, [nftBuyConfirmModal]);

  useEffect(() => {
    if (callActionModal) handleformat(11);
  }, [callActionModal]);

  useEffect(() => {
    if (calling) handleformat(12);
  }, [calling]);

  useEffect(() => {
    if (newGroupModal) handleformat(13);
  }, [newGroupModal]);

  useEffect(() => {
    if (nftListModal) handleformat(15);
  }, [nftListModal]);

  useEffect(() => {
    if (nftUnListModal) handleformat(16);
  }, [nftUnListModal]);

  useEffect(() => {
    if (recordingModal) handleformat(17);
  }, [recordingModal]);

  useEffect(() => {
    if (nftTransferModal) handleformat(18);
  }, [nftTransferModal]);

  const [sideBarCloseButton, setSideBarCloseButton] = useState(true);
  const [siderWidth, setSiderWidth] = useState(300);

  const handleCloseSiderBar = () => {
    setSiderWidth(80);
    const sidebar = document.querySelector(".resize-sidebar-current");
    sidebar.style.width = `${80}px`;
    setSideBarCloseButton(false);
  };

  return (
    <ModalContext.Provider
      value={{
        sideBarCloseButton,
        siderWidth,
        handleCloseSiderBar,
        communitySettingmodal,
        setCommunitySettingmodal,
        communityProfileModal,
        setCommunityProfileModal,
        communityMemberProfileModal,
        setCommunityMemberProfileModal,
        friendProfileModal,
        setFriendProfileModal,
        userSearchModal,
        setUserSearchModal,
        newCommunityModal,
        setNewCommunityModal,
        newChannelModal,
        setNewChannelModal,
        newRoomModal,
        setNewRoomModal,
        nftBuyModal,
        setNftBuyModal,
        nftBuyConfirmModal,
        setNftBuyConfirmModal,
        nftListModal,
        setNftListModal,
        nftUnListModal,
        setNftUnListModal,
        callActionModal,
        setCallActionModal,
        calling,
        setCalling,
        newGroupModal,
        setNewGroupModal,
        communityProfileInModal,
        setCommunityProfileInModal,
        recordingModal,
        setRecordingModal,
        nftTransferModal,
        setNftTransferModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default SettingModalProvider;
