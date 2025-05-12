// JSONの時間割データを取得
fetch('timetable.json')
  .then(response => response.json())
  .then(timetable => {
    renderSchedule(timetable);  // 時間割を表示
    requestNotificationPermission();  // 通知の許可をリクエスト
    checkNextClass(timetable);  // 次の授業を確認
  });

// 曜日ごとの時間割を表示する関数
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

// 通知の許可をリクエストする関数
function requestNotificationPermission() {
    if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                console.log("通知が許可されました。");
            }
        });
    }
}

// 現在の時間を取得し、次の授業の通知を送る関数
function checkNextClass(timetable) {
    const now = new Date();
    const currentDay = now.getDay(); // 0(日曜日)〜6(土曜日)
    const currentTime = now.getHours() * 60 + now.getMinutes(); // 現在の時刻（分単位）

    // 日曜日を除外
    if (currentDay === 0) return;

    const dayNames = ["monday", "tuesday", "wednesday", "thursday", "friday"];
    const currentDayName = dayNames[currentDay - 1]; // 現在の曜日名を取得

    // 次の授業を検索
    const nextClass = timetable.filter(item => item.day === currentDayName &&
        (parseTime(item.start) > currentTime));  // 現在の時間より後の授業

    if (nextClass.length > 0) {
        const classInfo = nextClass[0];  // 次の授業
        const notifyTime = new Date(now);
        const [hours, minutes] = classInfo.start.split(":").map(num => parseInt(num));
        notifyTime.setHours(hours, minutes, 0); // 次の授業の開始時間に合わせて通知

        // 通知の発行タイミングを設定
        const timeUntilNotify = notifyTime.getTime() - now.getTime();
        setTimeout(() => {
            showNotification(classInfo.subject, `${classInfo.subject}の授業がもうすぐ始まります！`);
        }, timeUntilNotify);
    }
}

// 時刻を分に変換するヘルパー関数
function parseTime(time) {
    const [hours, minutes] = time.split(":").map(num => parseInt(num));
    return hours * 60 + minutes;
}

// 通知を表示する関数
function showNotification(title, body) {
    if (Notification.permission === "granted") {
        new Notification(title, {
            body: body,
            icon: "https://example.com/icon.png"  // アイコンのURLを適宜設定
        });
    }
}
