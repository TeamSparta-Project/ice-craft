import MoonIcon from "@/assets/images/moon.svg";
import SunIcon from "@/assets/images/sun.svg";
import { useGameState, useIsDay } from "@/store/game-store";
import { useRoomAction } from "@/store/room-store";
import S from "@/style/livekit/livekit.module.css";
import { allAudioSetting } from "@/utils/participantCamSettings/camSetting";
import { socket } from "@/utils/socket/socket";
import { DisconnectButton, useLocalParticipant, useTracks } from "@livekit/components-react";
import { Track } from "livekit-client";
import Image from "next/image";
import { useEffect, useState } from "react";
import SpeakTimer from "./SpeakTimer";

const MafiaHeader = () => {
  //NOTE - livekit Hooks
  const { localParticipant } = useLocalParticipant();
  const roomId = localParticipant.metadata;
  const userId = localParticipant.identity;

  //NOTE - global state
  const isGameState = useGameState();
  const isDay = useIsDay();
  const { setIsEntry } = useRoomAction();

  const [morning, setMorning] = useState(false);
  const [night, setNight] = useState(false);

  //NOTE - 게임 입장 및 종료 시
  useEffect(() => {
    if (isGameState === "gameReady" || "gameEnd") {
      setMorning(false);
      setNight(false);
    }
  }, [isGameState]);

  //NOTE - 방 나가기 이벤트 헨들러
  const leaveRoom = () => {
    setIsEntry(false);
    socket.emit("exitRoom", roomId, userId);
  };

  //NOTE - 밤, 낮 배경
  useEffect(() => {
    if (isDay === "낮") {
      setMorning(true);
      setNight(false);
      return;
    }

    if (isDay === "밤") {
      setNight(true);
      setMorning(false);
    }
  }, [isDay]);

  //NOTE - 마피아 테마
  const dayTime = morning ? S.day : "";
  const nightTime = night ? S.night : "";
  const resultClassName = `${dayTime} ${nightTime}`;

  //FIXME - 임시: 전체 소리 끄기
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.Microphone, withPlaceholder: true }
    ],
    { onlySubscribed: true } // 구독됐을 경우에만 실행
  );

  return (
    <div className={`${S.roomBackground} ${resultClassName}`}>
      <div className={S.goToMainPage}>
        <DisconnectButton onClick={leaveRoom}>
          <span>＜</span> 방 나가기
        </DisconnectButton>
      </div>
      <button
        onClick={() => {
          allAudioSetting(tracks, false);
        }}
        style={{ background: "red" }}
      >
        전체 소리 끄기
      </button>
      {isGameState === "gameStart" && (
        <div className={S.gameTimer}>
          <SpeakTimer />
          <p className={S.dayAndNight}>
            <span className={S.sun}>{morning && <Image src={SunIcon} className={S.sunImage} alt="sun icon" />}</span>
            <span className={S.moon}>{night && <Image src={MoonIcon} className={S.moonImage} alt="moon icon" />}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default MafiaHeader;
