// !Isialisasi variable
const apiURL = "https://mahes-api-catatan.vercel.app/api/v1/catatan/";
const dataTable = document.getElementById("data-table");
const tambahCatatan = document.getElementById("tambahCatatan");
const inputNameCatatan = document.getElementById("namaCatatan");
const inputIsiCatatan = document.getElementById("isiCatatan");
const tambahButtonX = document.getElementById("closeModalTambahCatatanX");
const closeDelete = document.getElementById("deleteModal");
const closeDeleteModal = document.getElementById("closeDeleteModal");
const editModal = document.getElementById("editModal");
const viewModalBody = document.getElementById("viewModalBody");
const editModalBody = document.getElementById("editModalBody");
const closeDeleteModalX = document.getElementById("closeDeleteModalX");
const closeEditModalX = document.getElementById("closeEditModalX");
let btnDelete;

// ! Kondisi Dimana kata Lebih Diganti Dengan ...
const truncateText = (text, wordLimit) => {
  const words = text.split(" ");
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : text;
};

// ! Display Untuk Button Delete
const displayBtnDelete = (id) => {
  const existingBtn = document.getElementById("dynamicDeleteButton");
  if (existingBtn) {
    existingBtn.remove();
  }
  btnDelete = document.createElement("button");
  btnDelete.id = "dynamicDeleteButton";
  btnDelete.innerHTML = "Confirm Delete";
  btnDelete.className = "btn btn-danger";
  btnDelete.addEventListener("click", () => deleteCatatan(id));
  closeDeleteModal.after(btnDelete);
};

// ! Loading Untuk Table
const showTableLoading = () => {
  dataTable.innerHTML = `
    <tr>
      <td colspan="4">
        <div class="placeholder-glow">
          <span class="placeholder col-2"></span>
          <span class="placeholder col-4"></span>
          <span class="placeholder col-4"></span>
          <span class="placeholder col-2"></span>
        </div>
      </td>
    </tr>
  `;
};

// !Loading Untuk Modal

const showViewModalLoading = () => {
  viewModalBody.innerHTML = `
    <div class="placeholder-glow">
      <h5 class="placeholder col-6"></h5>
      <p class="placeholder col-8"></p>
      <p class="placeholder col-7"></p>
    </div>
  `;
};

const showEditModalLoading = () => {
  editModalBody.innerHTML = `
    <div class="placeholder-glow">
      <label class="placeholder col-6"></label>
      <input class="form-control placeholder col-6" disabled/>
      <label class="placeholder col-6 mt-3"></label>
      <input class="form-control placeholder col-8" disabled/>
    </div>
  `;
};

const displayViewMore = async (id) => {
  showViewModalLoading();
  let dataFetch = await fetch(`${apiURL}${id}`);
  let data = await dataFetch.json();

  viewModalBody.innerHTML = `
    <h5 class="text-center">View Catatan Detail</h5>
    <h6 class="mt-2">Nama Catatan : ${data.data.name_catatan}</h6>
    <h6 class="mt-2">Isi Catatan : ${data.data.isi_catatan}</h6>
  `;
};

const localMessage = () => {
  const message = localStorage.getItem("message");
  const icon = localStorage.getItem("icon");
  const title = localStorage.getItem("title");
  if (message) {
    Swal.fire({
      title: `${title}`,
      text: `${message}`,
      icon: `${icon}`,
    });
    localStorage.removeItem("message");
    localStorage.removeItem("icon");
    localStorage.removeItem("title");
  }
};

localMessage();

// ! Loading Untuk Tombol
const loadingSendRequest = (e, tipe) => {
  close;
  closeDeleteModal.setAttribute("disabled", true);
  closeDeleteModalX.setAttribute("disabled", true);
  closeEditModalX.setAttribute("disabled", true);
  tambahButtonX.setAttribute("disabled", true);
  editModal.setAttribute("disabled", true);

  e.innerHTML = `
  <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
  <span role="status">Loading...</span>
`;
};

const reload = () => {
  window.location.reload();
};

// ! Fetching Data

const fetchingData = async () => {
  showTableLoading();
  try {
    const dataFetch = await fetch(`${apiURL}`);
    const data = await dataFetch.json();
    dataTable.innerHTML = "";

    // Cek apakah data kosong
    if (data.data.length === 0) {
      dataTable.innerHTML = `
        <tr>
          <td colspan="4" class="text-center">
            <p>Tidak ada catatan yang tersedia.</p>
          </td>
        </tr>
      `;
      return;
    }

    let no = 1;
    data.data.forEach((item) => {
      dataTable.innerHTML += `
        <tr>
          <th>${no++}</th>
          <td>${truncateText(item.name_catatan, 3)}</td>
          <td>${truncateText(item.isi_catatan, 4)}</td>
          <td>
            <button
              class="badge text-bg-primary rounded-pill border-0 p-2"
              data-bs-toggle="modal"
              data-bs-target="#viewModal"
              onclick="displayViewMore('${item.id}')"
              aria-hidden="true"
            >
              View
            </button>
            <button
              class="badge text-bg-warning text-white rounded-pill border-0 p-2"
              data-bs-toggle="modal"
              data-bs-target="#editModal"
              aria-hidden="true"
              onclick="editCatatan('${item.id}')"
            >
              Edit
            </button>
            <button
              class="badge text-bg-danger rounded-pill border-0 p-2"
              data-bs-toggle="modal"
              data-bs-target="#deleteModal"
              aria-hidden="true"
              onclick="displayBtnDelete('${item.id}')"
            >
              Delete
            </button>
          </td>
        </tr>
      `;
    });
  } catch (error) {
    localStorage.setItem("message", error.message);
    localStorage.setItem("icon", "error");
    localStorage.setItem("title", "Oops!");
    localMessage();
  }
};

fetchingData();

tambahCatatan.addEventListener("click", (e) => {
  const inputNameCatatanValue = inputNameCatatan.value.trim();
  const inputIsiCatatanValue = inputIsiCatatan.value.trim();

  if (
    inputNameCatatanValue.split(" ").length > 20 ||
    inputIsiCatatanValue.split(" ").length > 20
  ) {
    alert("Both name and content must not exceed 20 words.");
    return;
  }
  loadingSendRequest(tambahCatatan);
  fetch(`${apiURL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name_catatan: inputNameCatatanValue,
      isi_catatan: inputIsiCatatanValue,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        localStorage.setItem("message", data.message);
        localStorage.setItem("icon", "success");
        localStorage.setItem("title", "Success !");
        reload();
        return;
      }
      throw new Error(`${data.message}`);
    })
    .catch((error) => {
      localStorage.setItem("message", error.message);
      localStorage.setItem("icon", "error");
      localStorage.setItem("title", "Oops!");
      inputNameCatatan.value = "";
      inputIsiCatatan.value = "";
      window.location.reload();
    });
});

const deleteCatatan = (id) => {
  loadingSendRequest(dynamicDeleteButton, "danger");

  fetch(`${apiURL}${id}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (id == "e7ad052e-d032-4473-adf3-012ab29f6514") {
        localStorage.setItem("icon", "error");
        localStorage.setItem("title", "Oops!");
        window.location.reload();
        throw new Error(`${data.message}`);
      }
      localStorage.setItem("message", data.message);
      localStorage.setItem("icon", "success");
      localStorage.setItem("title", "Success !");
      window.location.reload();
    })
    .catch((error) => {
      localStorage.setItem("message", error.message);
      localStorage.setItem("icon", "error");
      localStorage.setItem("title", "Oops!");
      window.location.reload();
    });
};

const editCatatan = async (id) => {
  showEditModalLoading();
  const datasCatatan = await fetch(`${apiURL}${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const datasCatatanJson = await datasCatatan.json();
  const data = await datasCatatanJson.data;
  editModalBody.innerHTML = `
    <label for="editNamaCatatan" class="fw-bold fs-5">Nama Catatan :</label>
    <input class="form-control" type="text" id="editNamaCatatan" value="${data.name_catatan}"/>
    <label for="editIsiCatatan" class="fw-bold fs-5 mt-3">Isi Catatan :</label>
    <input class="form-control" value="${data.isi_catatan}" id="editIsiCatatan"/>
    <div class="modal-footer">
      <button type="button" id="closeEditModal" onclick="updateCatatan('${data.id}')" class="btn btn-primary">
        Simpan Perubahan
      </button>
    </div>
  `;
};

const updateCatatan = async (id) => {
  loadingSendRequest(closeEditModal, "primary");
  const editNamaCatatan = document.getElementById("editNamaCatatan").value;
  const editIsiCatatan = document.getElementById("editIsiCatatan").value;
  const dataFetch = await fetch(`${apiURL}${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name_catatan: editNamaCatatan,
      isi_catatan: editIsiCatatan,
    }),
  })
    .then((data) => data.json())
    .then((data) => {
      if (data.success) {
        localStorage.setItem("message", data.message);
        localStorage.setItem("icon", "success");
        localStorage.setItem("title", "Success !");
        return window.location.reload();
      }
      throw new Error(`${data.message}`);
    })
    .catch((err) => {
      localStorage.setItem("message", err.message);
      localStorage.setItem("icon", "error");
      localStorage.setItem("title", "Oops!");
      window.location.reload();
    });
};
