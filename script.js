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

// 時間割を生成
generateTimetable();
