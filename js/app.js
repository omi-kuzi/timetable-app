// 曜日の英語表記
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// HTMLに時間割を表示する関数
function displayTimetable(timetable) {
  const timetableContainer = document.getElementById('timetable');

  timetable.forEach(classInfo => {
    const classElement = document.createElement('div');
    classElement.classList.add('class-info');
    classElement.innerHTML = `
      <h3>${classInfo.day} - ${classInfo.subject}</h3>
      <p>時間: ${classInfo.start}</p>
      <p>場所: ${classInfo.location}</p>
      <p>期間: ${classInfo.period}限</p>
    `;
    timetableContainer.appendChild(classElement);
  });
}

// JSONファイルから時間割を読み込む
fetch('timetable.json')
  .then(response => response.json())
  .then(timetable => {
    // 時間割を画面に表示
    displayTimetable(timetable);

    // 通知機能を設定
    function checkNextClass() {
      const currentTime = new Date();
      const currentDay = currentTime.getDay(); // 日曜日は0、月曜日は1、火曜日は2、...
      const currentMinutes = currentTime.getMinutes();
      const currentHours = currentTime.getHours();
      
      // 現在の時間と比較して、次の授業の開始10分前に通知
      timetable.forEach(classInfo => {
        if (classInfo.day === daysOfWeek[currentDay] && classInfo.period) {
          const [classHours, classMinutes] = classInfo.start.split(':').map(Number);
          
          // 次の授業開始時間までの差を計算
          const timeDiff = (classHours * 60 + classMinutes) - (currentHours * 60 + currentMinutes);
          
          // 時間差が10分以内の場合、通知する
          if (timeDiff <= 10 && timeDiff >= 0) {
            showNotification(classInfo.subject, classInfo.location);
          }
        }
      });
    }

    // 通知を表示する関数
    function showNotification(subject, location) {
      if (Notification.permission === "granted") {
        const notification = new Notification(`授業が始まります！`, {
          body: `${subject} - ${location}`,
          icon: "your-icon-path.png" // アイコンを設定（オプション）
        });
      }
    }

    // 通知の許可をリクエスト
    if (Notification.permission !== "denied") {
      Notification.requestPermission();
    }

    // 1分ごとに次の授業が始まる前に通知
    setInterval(checkNextClass, 60000); // 60000ms = 1分
  })
  .catch(error => {
    console.error("時間割の読み込みに失敗しました:", error);
  });
