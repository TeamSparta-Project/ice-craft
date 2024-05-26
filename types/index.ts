import { TrackReference, TrackReferenceOrPlaceholder } from "@livekit/components-react";
import { User } from "@supabase/supabase-js";
import { LocalParticipant, Participant, RemoteParticipant, Track } from "livekit-client";
import { StaticImageData } from "next/image";
import { Dispatch, MutableRefObject, RefObject, SetStateAction } from "react";

export interface MafiaRoom {
  room: string;
  userInfo: User | undefined | null;
}

// 미디어 상태 객체의 구조를 정의
export interface MediaStatus {
  [userId: string]: { camera: boolean; mike: boolean };
}

// socket 이벤트 핸들러 인터페이스 정의
export interface SocketEventHandler {
  [eventName: string]: (...args: any[]) => void;
}

export interface Role {
  [job: string]: string[];
}

export interface RenderCardsProps {
  cards: {
    의사: { src: string; alt: string };
    경찰: { src: string; alt: string };
    마피아: { src: string; alt: string };
    시민: { src: string; alt: string };
  };
  role: Role;
  showAllCards: boolean;
}

export interface Participants {
  tracks: TrackReferenceOrPlaceholder[];
  checkClickHandle: (event: React.MouseEvent<HTMLElement>, participant: Participant, index: number) => void;
}

export interface playerMedia {
  userId: string;
  camera: boolean;
  mike: boolean;
}

export interface OverlayState {
  showOverlay: string | null;
  activeParticipantSid: string | null;
  activeParticipantIndex: number | null;
  isLocalOverlay: boolean;
  isRemoteOverlay: boolean;
  clearActiveParticipant: () => void;
  setActiveParticipant: (sid: string | null, index: number | null) => void;
  toggleOverlay: (participantSid: string, index: number) => void;
  setIsOverlay: (newIsOverlay: boolean) => void;
  setIsRemoteOverlay: (newIsOverlay: boolean) => void;
}

// export type Role = "citizens" | "mafia" | "doctor" | "police" | null;

// export interface MafiaGameToolTip {
//   role: Role;
// }

export interface MafiaModalContent {
  count: number;
  content: string;
  nickname?: string;
}

export interface CountState {
  isStart: boolean;
  timer: number;
  setTimer: (newCount: number) => void;
  setIsStart: (newToggle: boolean) => void;
}

export interface ImageState {
  imageState: StaticImageData | null;
  setImageState: (newImage: StaticImageData | null) => void;
}

export interface ActiveNameState {
  activeName: string | null;
  setActiveName: (newName: string | null) => void;
}

export interface ConnectState {
  join: boolean;
  nickname: string;
  userId: string;
  roomId: string;
  setJoinStatus: (status: boolean) => void;
  setRoomId: (id: string) => void;
  setUserId: (id: string) => void;
  setUserNickname: (id: string) => void;
}

export interface MessageState {
  messages: string[];
  addMessage: (newMessage: string) => void;
  clearMessages: () => void;
}

export interface VoteData {
  userId: string;
  nickname: string;
}

export interface CardInfo {
  src: string;
  alt: string;
}

export interface ModalData {
  title: string;
  message: string;
  nickname: string;
  timer: number;
  isOpen: boolean;
}

export interface RemoteReadyStates {
  [key: string]: boolean;
}

export interface ExitState {
  isExit: boolean;
  setIsExit: (newToggle: boolean) => void;
}

export interface ReadyState {
  isReady: boolean;
  setIsReady: (newReady: boolean) => void;
}

export interface CreateState {
  isCreate: boolean;
  setIsCreate: (newReady: boolean) => void;
}

export interface ShowModalState {
  isOpen: boolean;
  title: string;
  timer: number;
  role: Role;
  actions: {
    setIsOpen: (newIsOpen: boolean) => void;
    setTimer: (newTimer: number) => void;
    setTitle: (newTitle: string) => void;
    setRole: (newRole: Role) => void;
  };
}

export interface TimerState {
  timerIds: NodeJS.Timeout[];
  setTimerIds: (newTimerId: NodeJS.Timeout) => void;
}

export interface TotalSocketState {
  userId: string;
  roomId: string;
  votedPlayer: string;
  voteBoard?: any;
  setIsOpen: (newIsOpen: boolean) => void;
  setTitle: (newTitle: string) => void;
  setMessage: (newMessage: string) => void;
  setTimer: (newTimer: number) => void;
  setIsClose: (newIsClose: boolean) => void;
  setIsOverlay: (newIsOverlay: boolean) => void;
  setTimerIds: Dispatch<SetStateAction<NodeJS.Timeout[]>>;
  clearActiveParticipant: () => void;
}

export interface VoteState {
  votedPlayer: string;
  isVoted: boolean;
  timerRef: MutableRefObject<boolean>;
  setVoteTimerClose: Dispatch<SetStateAction<NodeJS.Timeout | undefined>>;
  setIsOverlay: (newIsOverlay: boolean) => void;
  clearActiveParticipant: () => void;
  setVoted: (newIsVoted: boolean) => void;
}
export type SetModalState = Omit<TotalSocketState, "userId" | "roomId" | "votedPlayer" | "voteBoard" | "setTimerIds">;

export interface MediaState {
  tracks: TrackReferenceOrPlaceholder[];
  localUserId: string | undefined;
  participants: (RemoteParticipant | LocalParticipant)[];
  players: string[];
  userId: string;
  roomId: string;
  sources: Track.Source[];
  setTimerIds: Dispatch<SetStateAction<NodeJS.Timeout[]>>;
}

export interface VoteResults {
  [nickname: string]: number;
}
