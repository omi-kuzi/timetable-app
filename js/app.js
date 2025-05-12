// timetable.json のデータを読み込む
fetch('timetable.json')
  .then(response => response.json())
  .then(timetable => {
    renderSchedule(timetable);
    if (Notification.permission === "granted") {
      checkNextClass(timetable);
    }
  });

// 曜日ごとに時間割を表示する関数
function renderSchedule(timetable) {
    const scheduleDiv = document.getElementById('schedule');

    const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday"];
    
    daysOfWeek.forEach(day => {
        const daySchedule = timetable.filter(item => item.day === day);
        
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        
        const dayTitle = document.createElement('h2');
        dayTitle.textContent = capitalizeFirstLetter(day);
        dayDiv.appendChild(dayTitle);
        
        daySchedule.forEach(period => {
            const periodDiv = document.createElement('div');
            periodDiv.classList.add('period');
            
            const periodText = document.createElement('p');
            periodText.textContent = `${period.period}限: ${period.subject} (${period.start} - ${period.end}) - ${period.location}`;
            periodDiv.appendChild(periodText);
            
            dayDiv.appendChild(periodDiv);
        });
        
        scheduleDiv.appendChild(dayDiv);
    });
}

// 曜日の最初の文字を大文字にする関数
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// 現在の時間を取得し、通知を送る
function checkNextClass(timetable) {
    const now = new Date();
    const currentDay = now.getDay(); // 0（日曜日）から6（土曜日）
    const currentTime = now.getHours() * 60 + now.getMinutes(); // 現在の時刻（分単位）

    // 日曜日を除外
    if (currentDay === 0) return;

    // 曜日ごとの時間割を取得
    const dayNames = ["monday", "tuesday", "wednesday", "thursday", "friday"];
    const currentDayName = dayNames[currentDay - 1]; // 現在の曜日名を取得

    // 次の授業を検索
    const nextClass = timetable.filter(item => item.day === currentDayName && (item.start.split(":")[0] * 60 + parseInt(item.start.split(":")[1]) > currentTime));

    if (nextClass.length > 0) {
        const classInfo = nextClass[0];
        const notifyTime = new Date(now);
        const [hours, minutes] = classInfo.start.split(":").map(num => parseInt(num));
        notifyTime.setHours(hours, minutes, 0);

        // 通知の発行
        setTimeout(() => {
            showNotification(classInfo.subject, `${classInfo.subject}の授業がもうすぐ開始します。${classInfo.location}`);
        }, notifyTime.getTime() - now.getTime());
    }
}

// 通知を表示する関数
function showNotification(title, body) {
    if (Notification.permission === "granted") {
        const notification = new Notification(title, {
            body: body,
            icon: "https://example.com/icon.png"
        });
    }
}

// ページ読み込み時に通知の許可を確認
if (Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            checkNextClass(timetable);
        }
    });
}
