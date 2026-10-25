"use strict";
// Original synthetic fixtures. Nothing here is connected to hotel systems.
const incidents = [
  { title: "Flickering corridor light", location: "East corridor", department: "Maintenance", status: "Open", time: "08:40" },
  { title: "Replace towels on supply cart", location: "Service area", department: "Housekeeping", status: "In progress", time: "09:05" },
  { title: "Check meeting room display", location: "Meeting room", department: "Maintenance", status: "Open", time: "09:20" },
  { title: "Refill lobby water station", location: "Lobby", department: "Food & beverage", status: "Resolved", time: "08:15" }
];
const routines = [
  { title: "Inspect shared spaces", department: "Housekeeping", time: "09:00", done: true },
  { title: "Check equipment readiness", department: "Maintenance", time: "10:00", done: false },
  { title: "Prepare afternoon service", department: "Food & beverage", time: "14:00", done: false }
];
let view = "overview", query = "", department = "All departments";
const content = document.querySelector("#content");
const dialog = document.querySelector("#voice-dialog");
const escapeHTML = value => value.replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
function incidentPanel() {
  return `<section class="panel" aria-labelledby="incident-heading"><div class="panel-head"><h2 id="incident-heading">Incident board</h2>${view === "incidents" ? `<div class="tools"><input id="search" type="search" aria-label="Search incidents" placeholder="Search incidents" value="${escapeHTML(query)}"><select id="department" aria-label="Filter by department">${["All departments", "Maintenance", "Housekeeping", "Food & beverage"].map(d => `<option${d === department ? " selected" : ""}>${escapeHTML(d)}</option>`).join("")}</select></div>` : `<span>All departments · ${incidents.length} demo records</span>`}</div><div class="table-wrap"><table><thead><tr><th scope="col">INCIDENT / LOCATION</th><th scope="col">DEPARTMENT</th><th scope="col">STATUS</th><th scope="col">NEXT STEP</th></tr></thead><tbody id="incident-rows"></tbody></table></div></section>`;
}
function renderRows() {
  const filtered = incidents.map((item, index) => ({ ...item, index })).filter(i => (department === "All departments" || i.department === department) && `${i.title} ${i.location}`.toLowerCase().includes(query.toLowerCase()));
  document.querySelector("#incident-rows").innerHTML = filtered.map(i => `<tr><td><strong>${escapeHTML(i.title)}</strong><small>${escapeHTML(i.location)} · ${i.time}</small></td><td>${escapeHTML(i.department)}</td><td><span class="pill ${i.status === "In progress" ? "progress" : i.status === "Resolved" ? "resolved" : ""}">${i.status}</span></td><td><button class="action" data-advance="${i.index}" aria-label="${i.status === "Open" ? "Start" : i.status === "In progress" ? "Resolve" : "Reopen"}: ${escapeHTML(i.title)}">${i.status === "Open" ? "Start work" : i.status === "In progress" ? "Resolve" : "Reopen"}</button></td></tr>`).join("") || '<tr><td colspan="4" class="empty">No incidents match this filter.</td></tr>';
}
function routinePanel() {
  return `<section class="panel" aria-labelledby="routine-heading"><div class="panel-head"><h2 id="routine-heading">Today's routines</h2><span>Demo schedule</span></div>${routines.map((r, i) => `<label class="routine"><input type="checkbox" data-routine="${i}" ${r.done ? "checked" : ""}><span><strong>${r.title}</strong><small>${escapeHTML(r.department)}</small></span><span class="routine-time">${r.time}</span></label>`).join("")}</section>`;
}
function summary() {
  document.querySelector("#open-count").textContent = incidents.filter(i => i.status !== "Resolved").length;
  document.querySelector("#progress-count").textContent = incidents.filter(i => i.status === "In progress").length;
  document.querySelector("#routine-count").textContent = `${routines.filter(r => r.done).length} / ${routines.length}`;
}
function render() {
  summary();
  const descriptions = { overview: ["Keep the next step visible.", "One place for the issues and routines that need your team's attention."], incidents: ["From report to resolution.", "Filter the fictional incident board and move an item to its next step."], routines: ["Make recurring work visible.", "A small checklist of fictional tasks. Completion updates the overview."] };
  document.querySelector("#breadcrumb").textContent = view.toUpperCase();
  document.querySelector("#page-title").textContent = descriptions[view][0];
  document.querySelector("#page-description").textContent = descriptions[view][1];
  document.querySelectorAll("[data-view]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.view === view)));
  content.innerHTML = view === "routines" ? routinePanel() : incidentPanel() + (view === "overview" ? `<div class="bottom-grid">${routinePanel()}<aside class="note"><span class="eyebrow">DESIGNED AROUND THE HANDOFF</span><h2>Context that stays with the work.</h2><p>A location, a responsible department and a visible next step help the next shift pick up where the last one left off.</p><button class="text-link" id="view-incidents">Explore the incident board →</button></aside></div>` : "");
  if (view !== "routines") renderRows();
  document.querySelector("#search")?.addEventListener("input", e => { query = e.target.value; renderRows(); });
  document.querySelector("#department")?.addEventListener("change", e => { department = e.target.value; renderRows(); });
  document.querySelector("#view-incidents")?.addEventListener("click", () => { view = "incidents"; render(); });
}
document.querySelectorAll("[data-view]").forEach(b => b.addEventListener("click", () => { view = b.dataset.view; query = ""; department = "All departments"; render(); }));
content.addEventListener("click", e => {
  const b = e.target.closest("[data-advance]"); if (!b) return;
  const item = incidents[Number(b.dataset.advance)];
  item.status = { Open: "In progress", "In progress": "Resolved", Resolved: "Open" }[item.status];
  renderRows(); summary();
  document.querySelector(`[data-advance="${b.dataset.advance}"]`)?.focus();
});
content.addEventListener("change", e => { if (e.target.matches("[data-routine]")) { routines[Number(e.target.dataset.routine)].done = e.target.checked; summary(); } });
document.querySelector("#voice-button").addEventListener("click", () => dialog.showModal());
document.querySelector("#close-dialog").addEventListener("click", () => dialog.close());
render();
