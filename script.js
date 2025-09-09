// ===== Navigation =====
function showPage(pageId, event) {
  document.querySelectorAll(".content > div:not(.header)").forEach(div => div.classList.add("hidden"));
  document.getElementById(pageId).classList.remove("hidden");
  document.querySelectorAll(".sidebar li").forEach(li => li.classList.remove("active"));
  event.target.classList.add("active");
}

// ===== Tasks (localStorage) =====
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
function renderTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";
  tasks.forEach((task, i) => {
    list.innerHTML += `
      <div class="task">
        <span>${task}</span>
        <span class="delete" onclick="deleteTask(${i})">❌</span>
      </div>
    `;
  });
}
function addTask() {
  let input = document.getElementById("taskInput");
  if (input.value.trim() !== "") {
    tasks.push(input.value.trim());
    localStorage.setItem("tasks", JSON.stringify(tasks));
    input.value = "";
    renderTasks();
    addNotification("تمت إضافة مهمة جديدة ✅");
  }
}
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
  addNotification("❌ تم حذف المهمة");
}
renderTasks();

// ===== Table (localStorage) =====
let tableTasks = JSON.parse(localStorage.getItem("tableTasks")) || [];
function renderTableTasks() {
  let body = document.getElementById("tableBody");
  body.innerHTML = "";
  tableTasks.forEach((row, i) => {
    body.innerHTML += `
      <tr>
        <td>${row.day}</td>
        <td>${row.task}</td>
        <td>${row.time}</td>
        <td><button onclick="deleteTableTask(${i})">❌</button></td>
      </tr>
    `;
  });
}
function addTableTask() {
  let day = document.getElementById("dayInput").value.trim();
  let task = document.getElementById("taskTableInput").value.trim();
  let time = document.getElementById("timeInput").value;
  if (day && task && time) {
    tableTasks.push({ day, task, time });
    localStorage.setItem("tableTasks", JSON.stringify(tableTasks));
    renderTableTasks();
    addNotification("📋 تمت إضافة مهمة للجدول");
  }
}
function deleteTableTask(index) {
  tableTasks.splice(index, 1);
  localStorage.setItem("tableTasks", JSON.stringify(tableTasks));
  renderTableTasks();
  addNotification("❌ تم حذف من الجدول");
}
renderTableTasks();

// ===== Calendar (localStorage) =====
let calendarEvents = JSON.parse(localStorage.getItem("calendarEvents")) || {};
let selectedDay = null;

function renderCalendar() {
  let daysContainer = document.getElementById("calendar-days");
  daysContainer.innerHTML = "";
  let days = 30;
  for (let i = 1; i <= days; i++) {
    let events = calendarEvents[i] || [];
    let eventsHtml = events.map((e, idx) =>
      `<div class="event">• ${e} <span onclick="deleteCalendarEvent(${i}, ${idx})">❌</span></div>`
    ).join("");
    daysContainer.innerHTML += `<div onclick="openCalendarForm(${i})">${i}${eventsHtml}</div>`;
  }
}

function openCalendarForm(day) {
  selectedDay = day;
  document.getElementById("selected-day").innerText = day;
  document.getElementById("calendar-form").style.display = "block";
}

function saveCalendarEvent() {
  let input = document.getElementById("calendarEventInput");
  let event = input.value.trim();
  if (event && selectedDay) {
    if (!calendarEvents[selectedDay]) calendarEvents[selectedDay] = [];
    calendarEvents[selectedDay].push(event);
    localStorage.setItem("calendarEvents", JSON.stringify(calendarEvents));
    input.value = "";
    renderCalendar();
    addNotification(`📅 تمت إضافة حدث في يوم ${selectedDay}`);
  }
}

function deleteCalendarEvent(day, index) {
  calendarEvents[day].splice(index, 1);
  if (calendarEvents[day].length === 0) delete calendarEvents[day];
  localStorage.setItem("calendarEvents", JSON.stringify(calendarEvents));
  renderCalendar();
  addNotification(`❌ تم حذف حدث من يوم ${day}`);
}

renderCalendar();


// ===== Notifications (toast + LocalStorage) =====
let notifications = JSON.parse(localStorage.getItem("notifications")) || [];
function addNotification(msg) {
  notifications.push(msg);
  localStorage.setItem("notifications", JSON.stringify(notifications));
  showToast(msg);
}
function showToast(message) {
  let container = document.getElementById("toast-container");
  let toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}
function showNotifications() {
  notifications.forEach(n => showToast(n));
}

// ===== Profile Modal =====
function showProfile() {
  document.getElementById("profileModal").classList.remove("hidden");
}
function closeModal(id) {
  document.getElementById(id).classList.add("hidden");
}
