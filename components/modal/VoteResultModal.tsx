import { useCountDown } from "@/hooks/useCountDown";
import { useModalActions, useModalIsOpen, useModalTimer, useVoteResultElement } from "@/store/show-modal-store";
import S from "@/style/modal/modal.module.css";
import { useEffect, useState } from "react";

const VoteResultModal = () => {
  const timer = useModalTimer();
  const [count, setCount] = useState(timer * 10);
  const isModal = useModalIsOpen();
  const voteResults = useVoteResultElement();
  const { setIsOpen, setVoteIsOpen } = useModalActions();

  //NOTE - 타이머 기능
  useCountDown(() => setCount((prevCount) => prevCount - 1), 100, isModal);

  // 모달창 종료
  useEffect(() => {
    if (count === 0 && isModal) {
      setVoteIsOpen(false);
    }
  }, [count]);

  // console.log("Modal", count);

  return (
    <>
      <div className={S.modalWrap}>
        <div className={S.modal}>
          <div>
            <h1>마피아 의심 투표 결과</h1>
            <ul>
              {Object.entries(voteResults).map(([nickname, voteCount]) => (
                <li key={nickname}>
                  <span>{nickname}</span> &rarr; {voteCount}
                </li>
              ))}
            </ul>
            <progress className={S.progress} value={(timer * 10 - count) * (100 / (timer * 10))} max={100}></progress>
          </div>
        </div>
      </div>
    </>
  );
};

export default VoteResultModal;
