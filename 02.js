// ================= ELEMENT =================
const searchInput = document.getElementById("searchInput");
const building = document.getElementById("building");
const floor = document.getElementById("floor");
const loading = document.getElementById("loading");

// ================= STATE =================
let currentType = "aed"; // aed | assembly

// ================= DATA =================
const data = [
  // ===== AED =====
  { name: "บริเวณ รปภ.", building: "อาคารสำนักงานอธิการบดี ", floor: "1", type: "aed" },
  { name: "บริเวณหน้าลิฟท์", building: "อาคารสำนักงานอธิการบดี", floor: "2", type: "aed" },
  { name: "บริเวณหน้าห้องอธิการบดี", building: "อาคารสำนักงานอธิการบดี", floor: "3", type: "aed" },

  { name: "บริเวณโถงทางเดิน หน้าลิฟท์", building: " อาคารเฉลิมพระเกียรติ 80 พรรษา   ", floor: "1", type: "aed" },
  { name: "บริเวณหน้าลิฟท์", building: "อาคารเฉลิมพระเกียรติ 80 พรรษา บัณฑิตวิทยาลัย", floor: "9", type: "aed" },

  // ===== จุดรวมพล =====
  { name: "ลานหน้าอาคาร", building: "อาคารคณะวิทยาศาสตร์", floor: "1", type: "assembly" },
  { name: "สนามหญ้ากลาง", building: "อาคารคณะครุศาสตร์", floor: "1", type: "assembly" }
];

// ================= HIGHLIGHT =================
function highlight(text, keyword) {
  if (!keyword) return text;
  return text.replace(
    new RegExp(keyword, "gi"),
    match => `<mark>${match}</mark>`
  );
}

// ================= COUNT =================
function updateCount(list) {
  const resultCount = document.getElementById("resultCount");
  resultCount.innerText = `พบ ${list.length} รายการ`;
}

// ================= SEARCH =================
function searchData() {
  loading.style.display = "block";

  setTimeout(() => {
    const keyword = searchInput.value.trim().toLowerCase();
    const b = building.value.trim();
    const f = floor.value.trim();

    const result = data
      // 🔹 กรองตามประเภท (AED / จุดรวมพล)
      .filter(d => d.type === currentType)
      // 🔹 กรองเงื่อนไขเดิม
      .filter(d =>
        (!b || d.building === b) &&
        (!f || d.floor === f) &&
        d.name.toLowerCase().includes(keyword)
      );

    render(result, keyword);
    loading.style.display = "none";
  }, 300);
}

// ================= RESET =================
function resetData() {
  searchInput.value = "";
  building.value = "";
  floor.value = "";
  searchData(); // reset ตาม type ปัจจุบัน
}

// ================= RENDER =================
function render(list, keyword) {
  const tbody = document.querySelector("#resultTable tbody");
  const cardList = document.getElementById("cardList");

  tbody.innerHTML = "";
  cardList.innerHTML = "";

  updateCount(list);

  if (list.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="2" class="text-center text-muted">
          ไม่พบข้อมูล
        </td>
      </tr>
    `;
    return;
  }

  list.forEach(d => {
    tbody.innerHTML += `
      <tr>
        <td>${highlight(d.name, keyword)}</td>
        <td>${d.building} ชั้น ${d.floor || "-"}</td>
      </tr>
    `;

    cardList.innerHTML += `
      <div class="card mb-2 p-2">
        <strong>${highlight(d.name, keyword)}</strong><br>
        ${d.building} ชั้น ${d.floor || "-"}
      </div>
    `;
  });
}

// ================= ENTER SEARCH =================
searchInput.addEventListener("keyup", e => {
  if (e.key === "Enter") searchData();
});

// ================= NAV PILL =================
document.querySelectorAll(".nav-pills .nav-link").forEach(btn => {
  btn.addEventListener("click", () => {

    document.querySelectorAll(".nav-pills .nav-link")
      .forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    currentType = btn.dataset.type; // aed | assembly
    searchData();
  });
});

// ================= INIT =================
searchData();
