// !Isialisasi variable

const apiURL = "https://mahes-api-catatan.vercel.app/api/v1/";
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
const modalTambahCatatan = document.getElementById("modalTambahCatatan");
const btnLoginModal = document.getElementById("btnLogin");
let btnDelete;
const modalLoginBody = document.getElementById("modalLoginBody");
const loginModalTitle = document.getElementById("modalLoginLabel");
const logoutBtn = document.getElementById("logout");
const btnLogout = document.getElementById("btnLogout");
let isLogin = localStorage.getItem("isLogin");
let isModal = localStorage.setItem("isModal", "false");

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
  let dataFetch = await fetch(`${apiURL}catatan/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const datas = await dataFetch.json();
  const { data } = datas;
  viewModalBody.innerHTML = `
    <h5 class="text-center">View Catatan Detail</h5>
    <h6 class="mt-2">Nama Catatan : ${data.name_catatan}</h6>
    <h6 class="mt-2">Isi Catatan : ${data.isi_catatan}</h6>
    <h6 class="mt-2">Diposting Oleh : ${data.user.username}</h6>
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

// ! Modal Login

const showLoginModal = () => {
  let isLogin = localStorage.getItem("isLogin");
  if (isLogin == "true") {
    localStorage.setItem("isModal", "false");
    let message = localStorage.getItem("succesMessage");
    if (message) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: `${message}`,
      });
      localStorage.removeItem("succesMessage");
    }

    return;
  }
  if (localStorage.getItem("token") && localStorage.getItem("token") !== null) {
    return;
  }
  localStorage.setItem("isModal", "true");
  const modalLogin = new bootstrap.Modal(document.getElementById("modalLogin"));
  modalLogin.show();
};

const isModalCheck = () => {
  let isModal = localStorage.getItem("isModal");
  if (isModal == "false") {
    showLoginModal();
    fetchServerLogin();
  }
};

setInterval(isModalCheck, 5000);
showLoginModal();

// ! Modal Login Loading

const showLoginModalLoading = () => {
  modalLoginBody.innerHTML = `
    <div class="placeholder-glow">
      <label class="placeholder col-6"></label>
      <div class="input-group flex-nowrap placeholder-glow">
    <span class="input-group-text placeholder" id="addon-wrapping">@</span>
    <input type="text" class="form-control placeholder col-12" aria-label="Username" aria-describedby="addon-wrapping" disabled/>
</div>
      <label class="placeholder col-6 mt-3"></label>
      <input class="form-control placeholder col-8" disabled/>
    </div>
  `;
};

const cekServerLogin = async () => {
  const status = await fetch(`${apiURL}db/status`);
  const data = await status.json();
  return data;
};

// ! fetching Data Ketersediaan Server

const fetchServerLogin = async () => {
  const url = document.location.search.slice(7, 15);
  showLoginModalLoading();
  if (url == "login") {
    try {
      const data = await cekServerLogin();
      if (data.success === true) {
        // localStorage.setItem("isModal", "true");
        if (
          localStorage.getItem("isLogin") == "false" ||
          localStorage.getItem("isLogin") == null
        ) {
          if (!localStorage.getItem("token")) {
            btnLogout.style.display = "none";
          }
        }

        modalLoginBody.innerHTML = `
    
          <h5 class="text-center">Enter Your Credentials</h5>
          <div class="input-group flex-nowrap">
         <span class="input-group-text" id="addon-wrapping">Username</span>
        <input type="text" id="username" class="form-control"  aria-label="Username" aria-describedby="addon-wrapping">
        </div>
          <div class="input-group flex-nowrap mt-3">
         <span class="input-group-text" id="addon-wrapping">Password</span>
        <input type="password" id="password" class="form-control"  aria-label="Password" aria-describedby="addon-wrapping">
        </div>
        <div class="textModalLoginFooter my-4  d-flex justify-content-start ">
        <div class="textForgetPassword d-flex align-items-center">
          <a href="#">Lupa Password ?</a>
        </div>
        <div class="buttonLogin d-flex justify-content-center align-content-center">
        <button type="button"  class="btn btn-primary mx-3 mt-2 bagde rounded-pill" onclick="login()" style="width: 170px;">Login</button>
        </div>
        <div class="textRegister d-flex align-items-center  justify-content-end" >
          <a href="?modal=register">Belum Punya Akun ?</a>
          </div>
        </div>
        `;

        return;
      }
      throw new Error(`Failed To Fetch Server`);
    } catch (err) {
      modalLoginBody.innerHTML = `
          <h5 class="text-center">${err}</h5>
         
        `;
      Swal.fire({
        title: "Oops!",
        text: `${err.message}`,
        icon: "error",
      });
    }
  } else if (url == "register") {
    try {
      const data = await cekServerLogin();
      if (data.success === true) {
        loginModalTitle.innerHTML = `Create Your Account !`;
        modalLoginBody.innerHTML = `
          <h5 class="text-center">Enter Your Credentials</h5>
          <div class="input-group flex-nowrap">
         <span class="input-group-text justify-content-center align-items-center" id="addon-wrapping" style="width : 35%">Username</span>
        <input type="text" class="form-control"  id="username" aria-label="Username" aria-describedby="addon-wrapping">
        </div>
          <div class="input-group flex-nowrap mt-3">
         <span class="input-group-text justify-content-center align-items-center " id="addon-wrapping" style="width : 35%">Password</span>
        <input type="password" id="password" class="form-control"  aria-label="Password" aria-describedby="addon-wrapping">
        </div>
        <div class="input-group flex-nowrap mt-3">
         <span class="input-group-text" id="addon-wrapping " style="width : 35%">Confirm Password</span>
        <input type="password" class="form-control"  aria-label="passwordConfirm" id="passwordConfirm" aria-describedby="addon-wrapping">
        </div>
        <div class="textModalLoginFooter my-4  d-flex justify-content-start ">
        
        <div class="buttonLogin d-flex justify-content-center align-content-center">
        <button onclick="register();" type="button" class="btn btn-primary mx-2 mt-1 bagde rounded-pill" style="width: 170px;">Register</button>
        </div>
        <div class="textRegister d-flex align-items-center  justify-content-end mt-2 me-3" style="width: 100%;" >
          <a  href="?modal=login">Sudah Punya Akun ?</a>
          </div>
        </div>
        `;

        return;
      }
      throw new Error(`Failed To Fetch Server`);
    } catch (err) {
      modalLoginBody.innerHTML = `
          <h5 class="text-center">${err}</h5>
         
        `;
      Swal.fire({
        title: "Oops!",
        text: `${err.message}`,
        icon: "error",
      });
    }
  } else {
    loginModalTitle.innerHTML = `Redirect Ke Halaman Yang Seharusnya...`;
    modalLoginBody.innerHTML = `
    <h6>Redirect...</h6>
    <h6>Jika Tidak Redirect Ke Halaman Klik <a href="/index.html?modal=login">Disini</a></h6>
    `;

    if (isLogin == "false") {
      setTimeout(() => {
        window.location.href = `/index.html?modal=login`;
      }, 2000);
    }
  }
  return;
};

// ! Login Function

const login = async () => {
  const loginUsernameValue = document.getElementById("username").value;
  const loginPasswordValue = document.getElementById("password").value;
  modalLoginBody.innerHTML = "Loading...";
  try {
    const response = await fetch(`${apiURL}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: loginUsernameValue,
        password: loginPasswordValue,
      }),
    });
    const responseJson = await response.json();
    if (responseJson.success === false) {
      throw new Error(responseJson.message);
    }

    localStorage.setItem("isLogin", "true");
    localStorage.setItem("token", responseJson.token);
    localStorage.setItem("id", responseJson.data.id);
    localStorage.setItem("succesMessage", responseJson.message);
    window.location.href = "/index.html";
  } catch (err) {
    fetchServerLogin();
    Swal.fire({
      title: "Oops!",
      text: `${err.message}`,
      icon: "error",
    });
  }
};

// ! Register

const register = () => {
  const registerUsernameValue = document.getElementById("username").value;
  const registerPasswordValue = document.getElementById("password").value;
  const registerConfirmPasswordValue =
    document.getElementById("passwordConfirm").value;
  modalLoginBody.innerHTML = "Loading...";
  if (registerPasswordValue == registerConfirmPasswordValue) {
    fetch(`${apiURL}users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: registerUsernameValue,
        password: registerPasswordValue,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.success === true) {
          Swal.fire({
            title: "Success !",
            text: `${data.message}`,
            icon: "success",
          });
          window.location.href = "/index.html?modal=login";
        } else {
          fetchServerLogin();

          Swal.fire({
            title: "Oops !",
            text: `${
              data.message.errors
                ? data.message.errors[0].message
                : data.message
            }`,
            icon: "error",
          });
        }
      });
  } else {
    Swal.fire({
      title: "Oops !",
      text: `Password Yang Anda Masukan Tidak Sama `,
      icon: "error",
    });
  }
};

// ! Logout Eventistener

logoutBtn.addEventListener("click", () => {
  localStorage.setItem("isLogin", "false");
  localStorage.removeItem("token");
  localStorage.removeItem("id");
  localStorage.setItem("succesMessage", "Berhasil Logout !");
  window.location.href = "/index.html?modal=login";
});

// ! Hidden Buuton Logout Jika Belum Login

// ! Cek Apakah Token Masih Valid

const verifyToken = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    const dataFetch = await fetch(`${apiURL}auth/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await dataFetch.json();
    if (result.success === false) {
      localStorage.setItem("isLogin", "false");
      localStorage.removeItem("token");
      localStorage.setItem("isModal", "true");
      localStorage.setItem("errorMessage", "Token Expired");
      reload();
    }
    return;
  }
};

verifyToken();
document.addEventListener("DOMContentLoaded", () => {
  fetchServerLogin();
});

// ! Fetching Data

const fetchingData = async () => {
  showTableLoading();
  try {
    if (!localStorage.getItem("token")) {
      return;
    }
    const dataFetch = await fetch(`${apiURL}catatan/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await dataFetch.json();
    if (data.success === false) {
      throw new Error(data.message);
    }
    dataTable.innerHTML = "";
    const statusServer = await cekServerLogin();
    if (statusServer.success === false) {
      dataTable.innerHTML = `
        <tr>
          <td colspan="4">
            <div class="placeholder-glow">
              <span class="placeholder col-2"></span>
              <span class="placeholder col-4"></span>
              <span class="placeholder col-4"></span>
              <span class="placeholder col-2"></span>
              </tr>
            </div>`;
      return;
    }

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

    if (!localStorage.getItem("token")) {
      showTableLoading();

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
    if (localStorage.getItem("isLogin") == "false") {
      return;
    }
    Swal.fire({
      title: "Oops !",
      text: `${error.message}`,
      icon: "error",
    });
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
  fetch(`${apiURL}catatan`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      name_catatan: inputNameCatatanValue,
      isi_catatan: inputIsiCatatanValue,
      user_id: localStorage.getItem("id"),
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

  fetch(`${apiURL}catatan/${id}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
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
  const datasCatatan = await fetch(`${apiURL}catatan/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
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
  const dataFetch = await fetch(`${apiURL}catatan/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
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
