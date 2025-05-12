const timetableData = [
  { "day": "monday", "period": 1, "start": "08:45", "end": "09:35", "subject": "コミュ英", "location": "25教室" },
  { "day": "monday", "period": 2, "start": "09:45", "end": "10:35", "subject": "公共", "location": "25教室" },
  { "day": "monday", "period": 3, "start": "10:45", "end": "11:35", "subject": "数学Ⅱ", "location": "2-35教室" },
  { "day": "monday", "period": 4, "start": "11:45", "end": "12:35", "subject": "古典", "location": "2-35教室" },
  { "day": "monday", "period": 5, "start": "13:20", "end": "14:10", "subject": "化学", "location": "物理室" },
  { "day": "monday", "period": 6, "start": "14:20", "end": "15:10", "subject": "体育", "location": "体育館" },
  { "day": "monday", "period": 7, "start": "15:40", "end": "16:30", "subject": "物理", "location": "物理室" },
  { "day": "tuesday", "period": 1, "start": "08:45", "end": "09:35", "subject": "化学", "location": "物理室" },
  { "day": "tuesday", "period": 2, "start": "09:45", "end": "10:35", "subject": "数学Ⅱ", "location": "2-35" },
  { "day": "tuesday", "period": 3, "start": "10:45", "end": "11:35", "subject": "論理表現", "location": "25教室" },
  { "day": "tuesday", "period": 4, "start": "11:45", "end": "12:35", "subject": "物理", "location": "物理室" },
  { "day": "tuesday", "period": 5, "start": "13:20", "end": "14:10", "subject": "家庭", "location": "25教室" },
  { "day": "tuesday", "period": 6, "start": "14:20", "end": "15:10", "subject": "家庭科", "location": "25教室" },
  { "day": "tuesday", "period": 7, "start": "15:20", "end": "16:10", "subject": "LHR", "location": "25教室" },
  { "day": "wednesday", "period": 1, "start": "08:45", "end": "09:35", "subject": "数学B", "location": "2-35" },
  { "day": "wednesday", "period": 2, "start": "09:45", "end": "10:35", "subject": "論国", "location": "2-35" },
  { "day": "wednesday", "period": 3, "start": "10:45", "end": "11:35", "subject": "化学", "location": "物理室" },
  { "day": "wednesday", "period": 4, "start": "11:45", "end": "12:35", "subject": "コミュ英", "location": "25教室" },
  { "day": "wednesday", "period": 5, "start": "13:20", "end": "14:10", "subject": "論表", "location": "25教室" },
  { "day": "wednesday", "period": 6, "start": "14:20", "end": "15:10", "subject": "物理", "location": "物理室" },
  { "day": "thursday", "period": 1, "start": "08:45", "end": "09:35", "subject": "化学", "location": "物理室" },
  { "day": "thursday", "period": 2, "start": "09:45", "end": "10:35", "subject": "宗教", "location": "宗教教室" },
  { "day": "thursday", "period": 3, "start": "10:45", "end": "11:35", "subject": "コミュ英", "location": "25教室" },
  { "day": "thursday", "period": 4, "start": "11:45", "end": "12:35", "subject": "論国", "location": "2-35" },
  { "day": "thursday", "period": 5, "start": "13:20", "end": "14:10", "subject": "古典", "location": "2-35" },
  { "day": "thursday", "period": 6, "start": "14:20", "end": "15:10", "subject": "数学Ⅱ", "location": "2-35" },
  { "day": "thursday", "period": 7, "start": "15:30", "end": "16:20", "subject": "保険", "location": "25教室" },
  { "day": "friday", "period": 1, "start": "08:45", "end": "09:35", "subject": "化学", "location": "物理室" },
  { "day": "friday", "period": 2, "start": "09:45", "end": "10:35", "subject": "数学Ⅱ", "location": "2-35" },
  { "day": "friday", "period": 3, "start": "10:45", "end": "11:35", "subject": "コミュ英", "location": "25教室" },
  { "day": "friday", "period": 4, "start": "11:45", "end": "12:35", "subject": "体育", "location": "体育館" },
  { "day": "friday", "period": 5, "start": "13:20", "end": "14:10", "subject": "数学B", "location": "2-35" },
  { "day": "friday", "period": 6, "start": "14:20", "end": "15:10", "subject": "公共", "location": "25教室" }
];

function generateTimetable() {
  const timetableElement = document.getElementById("timetable");

  // 曜日ごとにデータを分ける
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];
  const periods = ["1", "2", "3", "4", "5", "6", "7"];

  // ヘッダー行の作成
  const header = document.createElement("div");
  header.classList.add("header");
  header.innerHTML = "<div>時間帯</div><div>月曜日</div><div>火曜日</div><div>水曜日</div><div>木曜日</div><div>金曜日</div>";
  timetableElement.appendChild(header);

  // 各時間帯ごとにループして授業情報を埋め込む
  periods.forEach(period => {
    const row = document.createElement("div");
    row.classList.add("lesson");

    // 時間帯
    const timeSlot = document.createElement("div");
    timeSlot.classList.add("time-slot");
    timeSlot.innerText = `第${period}限`;
    row.appendChild(timeSlot);

    // 各曜日に対応する授業を追加
    days.forEach(day => {
      const lessonCell = document.createElement("div");
      lessonCell.classList.add("lesson");

      const lesson = timetableData.find(item => item.day === day && item.period.toString() === period);
      if (lesson) {
        lessonCell.innerHTML = `<strong>${lesson.subject}</strong><br>${lesson.start} - ${lesson.end}<br>${lesson.location}`;
      }
      row.appendChild(lessonCell);
    });

    timetableElement.appendChild(row);
  });
}

document.addEventListener("DOMContentLoaded", generateTimetable);
