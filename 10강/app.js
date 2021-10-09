// 주인공 이름 입력 화면
const $startScreen = document.querySelector('#start-screen');

// 주인공 이름 입력 후 게임 메뉴
const $gameMenu = document.querySelector('#game-menu');
const $heroName = document.querySelector('#hero-name');
const $heroLevel = document.querySelector('#hero-level');
const $heroHp = document.querySelector('#hero-hp');
const $heroXp = document.querySelector('#hero-xp');
const $heroAtt = document.querySelector('#hero-att');

// 전투 메뉴
const $battleMenu = document.querySelector('#battle-menu');

// 몬스터 정보
const $monsterName = document.querySelector('#monster-name');
const $monsterHp = document.querySelector('#monster-hp');
const $monsterAtt = document.querySelector('#monster-att');
const $message = document.querySelector('#message');

// 게임
class Game {
  // 생성자 함수 (시작 화면에서 이름 입력 시 실행)
  constructor(name) {
    this.monster = null;
    this.hero = null;
    this.monsterList = [
      { name: '슬라임', hp: 25, att: 10, xp: 10 },
      { name: '스켈레톤', hp: 50, att: 15, xp: 20 },
      { name: '마왕', hp: 150, att: 35, xp: 50 }
    ];
    this.start(name);
    this.updateHeroStat(); // 생성시 화면을 새로 그려줌
  }

  start(name) {
    /* 아래의 두 EventListener들은 Game 클래스 밖으로 빼면
          this가 window 객체를 가리키게 된다!

          객체.메서드 안의 this는 해당 객체를 가리키게 된다!          

          따라서, addEventListner 함수 내의 this는 해당 tag 객체를 가리키게 된다
          (위의 constructor 함수에서는 Game 클래스의 인스턴스를 가리키던 것과 달라짐) 

          예전에는 self / _this 변수로 this를 저장해주기도 했음!

          여기서 화살표 함수의 경우, 바깥쪽 this와 안쪽 this를 동일하게 유지해 준다!
          (function의 경우, 자기만의 this를 갖게 됨)

          var과는 다르게, function은 다른 this를 사용할 경우를 위해 사라지지 않음!
          */

    // 아래의 this는 Game 클래스의 해당 사용자의 인스턴스
    $gameMenu.addEventListener('submit', this.onGameMenuInput); // 이 안의 this가 화살표함수여야 this가 유지되므로
    $battleMenu.addEventListener('submit', this.onBattleMenuInput); // 아래에서도 화살표 함수로 해당 event 콜백 함수를 작성했음
    this.changeScreen('game'); // 게임 메뉴 진입
    this.hero = new Hero(this, name); // 입력된 이름으로 Hero 객체 생성
  }

  changeScreen(screen) {
    if (screen === 'start') {
      // 시작메뉴만 보여주고 나머지는 가림
      $startScreen.style.display = 'block';
      $gameMenu.style.display = 'none';
      $battleMenu.style.display = 'none';
    } else if (screen === 'game') {
      // 게임 메뉴만 보여주고 나머지는 가림
      $startScreen.style.display = 'none';
      $gameMenu.style.display = 'block';
      $battleMenu.style.display = 'none';
    } else if (screen === 'battle') {
      // 전투 메뉴만 보여주고 나머지는 가림
      $startScreen.style.display = 'none';
      $gameMenu.style.display = 'none';
      $battleMenu.style.display = 'block';
    }
  }

  // 게임 메뉴에서의 input
  onGameMenuInput = (event) => {
    event.preventDefault();
    const input = event.target['menu-input'].value;
    if (input === '1') {
      // 모험
      this.changeScreen('battle'); // 모험 화면으로 전환

      // monster 랜덤으로 생성
      const randomIndex = Math.floor(Math.random() * this.monsterList.length);
      const randomMonster = this.monsterList[randomIndex];

      // JSON.parse(JSON.stringify(객체)) 대신에 monsterList로부터 정보를 꺼내서 Monster 객체에 넣어줌
      // (객체가 아닌 값은 깊은 복사를 할 필요가 없음)
      this.monster = new Monster(this, randomMonster.name, randomMonster.hp, randomMonster.att, randomMonster.xp);

      this.updateMonsterStat(); // Monster 화면 표시
      this.showMessage(`몬스터와 마주쳤다. ${this.monster.name}인 것 같다!`); // Monster 메시지 표시
    } else if (input === '2') {
      // 휴식
    } else if (input === '3') {
      // 종료
      this.quit();
    }
  };

  // 전투 메뉴에서의 input
  onBattleMenuInput = (event) => {
    event.preventDefault();

    const input = event.target['battle-input'].value;

    if (input === '1') {
      // 공격
      const { hero, monster } = this;

      // 서로 공격
      hero.attack(monster);
      monster.attack(hero);

      if (hero.hp <= 0) {
        // hero의 체력이 0이 되는 경우
        this.showMessage(`${hero.lev} 레벨에서 전사. 새 주인공을 생성하세요.`);
        this.quit(); // 죽었으므로 게임을 종료
      } else if (monster.hp <= 0) {
        // monster의 체력이 0이 되는 경우
        this.showMessage(`몬스터를 잡아 ${monster.xp} 경험치를 얻었다.`);
        hero.getXp(monster.xp);
        this.monster = null;
        this.changeScreen('game');
      } else {
        // 둘 다 죽지 않은 경우
        this.showMessage(`${hero.att}의 데미지를 주고, ${monster.att}의 데미지를 받았따.`);
      }

      // 유저와 몬스터의 업데이트된 정보를 화면에 표시
      this.updateHeroStat();
      this.updateMonsterStat();
    } else if (input === '2') {
      // 회복
    } else if (input === '3') {
      // 도망
    }
  };

  // user의 화면을 새로 그려줌
  updateHeroStat() {
    const { hero } = this;
    // hero가 전사한 경우 hero값이 null
    if (hero === null) {
      $heroName.textContent = '';
      $heroLevel.textContent = '';
      $heroHp.textContent = '';
      $heroXp.textContent = '';
      $heroAtt.textContent = '';
      return;
    }

    // Hero 클래스의 인스턴스에 대한 정보 표시
    $heroName.textContent = hero.name;
    $heroLevel.textContent = `${hero.lev}Lev`;
    $heroHp.textContent = `HP: ${hero.hp}/${hero.maxHp}`;
    $heroXp.textContent = `XP: ${hero.xp}/${15 * hero.lev}`;
    $heroAtt.textContent = `ATT: ${hero.att}`;
  }

  // Monster 클래스의 인스턴스에 대한 정보 표시
  updateMonsterStat() {
    const { monster } = this;
    if (monster === null) {
      $monsterName.textContent = '';
      $monsterHp.textContent = '';
      $monsterAtt.textContent = '';
      return;
    }

    $monsterName.textContent = monster.name;
    $monsterHp.textContent = `HP: ${monster.hp}/${monster.maxHp}`;
    $monsterAtt.textContent = `ATT: ${monster.att}`;
  }

  showMessage(text) {
    $message.textContent = text;
  }

  // 게임을 종료 (모든 정보를 초기화)
  quit() {
    this.hero = null;
    this.monster = null;
    this.updateHeroStat();
    this.updateMonsterStat();
    $gameMenu.removeEventListener('submit', this.onGameMenuInput);
    $battleMenu.removeEventListener('submit', this.onBattleMenuInput);
    this.changeScreen('start');
    game = null;
  }
}

class Unit {
  constructor(game, name, hp, att, xp) {
    this.gamae = game;
    this.name = name;
    this.maxHp = hp;
    this.hp = hp;
    this.xp = xp;
    this.att = att;
  }

  attack(target) {
    target.hp -= this.att;
  }
}

// Hero 객체 정의
class Hero extends Unit {
  constructor(game, name) {
    super(game, name, 100, 10, 0); // 부모 클래스의 생성자를 호출
    this.lev = 1;
  }

  // 안쓰면 알아서 부모 클래스(Unit)의 attack 메서드를 호출함
  attack(target) {
    super.attack(target);
  }

  heal(monster) {
    this.hp += 20;
    this.hp -= monster.att;
  }

  // 경험치를 얻을 때마다 레벨업을 할지 판단
  getXp(xp) {
    this.xp += xp;
    if (this.xp >= this.lev * 15) {
      // 경험치 = lev * 15가 되면
      this.xp -= this.lev * 15;
      this.lev += 1;
      this.maxHp += 5;
      this.att += 5;
      this.hp = this.maxHp;
      this.game.showMessage(`레벨업! 레벨${this.lev}`);
    }
  }
}

// Monster 객체 정의
class Monster extends Unit {
  constructor(game, name, hp, att, xp) {
    super(game, name, hp, att, xp);
  }

  // attack(target) {
  //   target.hp -= this.att;
  // }

  // attack 메서드를 작성하지 않으면 부모 클래스(Unit)의 attack 메서드를 호출
}

let game = null;

// 시작 화면에서 이름 입력 시 Game 객체 생성자 호출
$startScreen.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = event.target['name-input'].value;
  game = new Game(name);
});
