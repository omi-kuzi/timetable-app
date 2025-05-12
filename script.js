let notificationEnabled = false;

function toggleNotification() {
  notificationEnabled = !notificationEnabled;
  const button = document.getElementById("notification-toggle");

  // 通知オン・オフを切り替える
  if (notificationEnabled) {
    button.innerText = "通知オフ";
    startNotifications(); // 通知を開始する関数を呼び出す
  } else {
    button.innerText = "通知オン";
    stopNotifications(); // 通知を停止する関数を呼び出す
  }
}

// 通知を開始する関数
function startNotifications() {
  // 通知の設定（10分前に通知を送る処理）
  setInterval(checkAndNotify, 60000); // 1分ごとにチェック
}

// 通知を停止する関数
function stopNotifications() {
  clearInterval(notificationInterval); // 通知を停止
}

// 通知を送るかどうかをチェックする関数
function checkAndNotify() {
  const now = new Date();
  const currentDay = now.toLocaleString('ja-JP', { weekday: 'long' }).toLowerCase(); // 今日の曜日
  const currentTime = now.getHours() * 60 + now.getMinutes(); // 現在時刻（分単位）

  timetableData.forEach(item => {
    const [hour, minute] = item.start.split(":").map(Number);
    const startTime = hour * 60 + minute; // 授業開始時刻（分単位）

    // 授業開始10分前の時刻と比較
    if (item.day === currentDay && currentTime === startTime - 10) {
      // 通知を表示
      showNotification(item);
    }
  });
}

// 通知を表示する関数
function showNotification(lesson) {
  new Notification(`もうすぐ授業: ${lesson.subject}`, {
    body: `場所: ${lesson.location}`,
    icon: 'notification-icon.png', // アイコンを設定
  });
}

// 時間割を生成
generateTimetable();

function generateTimetable() {
  const tbody = document.querySelector("#timetable tbody");

  // 曜日ごとにデータを分けて時間帯を表示
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];
  const periods = ["1", "2", "3", "4", "5", "6", "7"];

  periods.forEach(period => {
    const row = document.createElement("tr");

    // 時間帯を表示
    const timeSlotCell = document.createElement("td");
    timeSlotCell.innerText = `第${period}限`;
    row.appendChild(timeSlotCell);

    // 各曜日の授業を追加
    days.forEach(day => {
      const cell = document.createElement("td");
      const lesson = timetableData.find(item => item.day === day && item.period == period);
      if (lesson) {
        cell.classList.add("lesson");
        cell.innerHTML = `<strong>${lesson.subject}</strong><br>${lesson.location}`;
      }
      row.appendChild(cell);
    });

    tbody.appendChild(row);
  });
}
