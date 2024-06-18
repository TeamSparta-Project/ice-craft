import React from "react";
import PeopleIcon from "@/assets/images/icon_person.svg";
import MafiaItem from "@/assets/images/mafia_item.png";

const RoomListItem = () => {
  return (
    <li key={item.room_id}>
      <Image src={MafiaItem} alt="room image" />
      <div className={S.roomTitle}>
        <h3>{item.title}</h3>
        <div className={S.gameName}>
          <p className={S.mafiaHashtag}>#&nbsp;{item.game_category}</p>
          <p className={S.currentPeople}>
            <Image src={PeopleIcon} alt="people icon" />
            <span>
              {item.current_user_count}/{item.total_user_count}
            </span>
          </p>
        </div>
      </div>
      <button disabled={isGoInClick.current} onClick={() => joinRoomHandler(item)} className={S.gotoButton}>
        입장하기
      </button>
    </li>
  );
};

export default RoomListItem;