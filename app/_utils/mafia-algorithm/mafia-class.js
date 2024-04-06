class Citizen {
  constructor(userId, userNickname, index) {
    this.userId = userId;
    this.userNickname = userNickname;
    this.isReady = false;
    this.index = index; //NOTE - 필요한지 생각해보기
    this.role = "시민";
    this.isLived = true;
    this.voteTo = "";
    this.votedCount = 0;
  }

  //NOTE - 게임 준비하기
  ready(isReady) {
    this.isReady = isReady;
  }

  //NOTE - 플레이어를 선택하는 투표
  voteToPlayer(citizen) {
    this.voteTo = receiverIndex;
    citizen.votedCount++;
  }

  //NOTE - 찬성, 반대를 결정하는 투표
  voteYesOrNo(votes, yesOrNo) {
    votes.push(yesOrNo);
    return votes;
  }
  //NOTE - 방나가기, setRoles 따로 처리하기
  exit() {
    this.isLived = false;
  }
}

class Mafia extends Citizen {
  constructor(citizen) {
    super(citizen.userId, citizen.userNickname, citizen.index);
    this.role = "마피아";
  }

  //NOTE - 플레이어 죽임,setRoles 따로 처리하기
  killCitizen(citizen, roles) {
    citizen.isLived = false;

    return citizen;
  }
}