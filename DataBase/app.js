// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getFirestore, addDoc, collection, getDocs, getDoc, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSoLqQmyZzSjI6_6DIINAm2iU3JeDhnLI",
  authDomain: "firestore-and-authentication.firebaseapp.com",
  projectId: "firestore-and-authentication",
  storageBucket: "firestore-and-authentication.firebasestorage.app",
  messagingSenderId: "434794202539",
  appId: "1:434794202539:web:3722eacf3df90b53a57eee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const todolist = collection(db, "todos");

const todoForm = document.getElementById("todoForm");
const input = document.getElementById("input");
const mainDiv = document.getElementById("dynamic-div");
const btn = document.getElementById("btn");

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("from submit");

    const todoValue = input.value;
    const obj = {
        title: todoValue,
        createdAt: Date.now()
    }

    addDoc(todolist, obj).then((res) => {
        alert("Task added successfully");
        input.value = "";
        getTodos();
    }).catch((err) => {
        console.log("Task Adding Failed", err);
    })
})

const getTodos = () => {
    mainDiv.innerHTML = "Loading...";
    getDocs(collection(db, "todos")).then((result) => {
        mainDiv.innerHTML = "";
        result.forEach((todo) => {
            console.log(todo.data());

            const div = document.createElement("div");
            const h3 = document.createElement("h3");
            const childDiv = document.createElement("div");
            const editBtn = document.createElement("button");
            const deleteBtn = document.createElement("button");
            editBtn.innerText = "Edit";
            editBtn.onclick = () => editFunc(todo.id);
            deleteBtn.onclick = () => deleteFunc(todo.id);
            deleteBtn.innerText = "Delete";
            h3.innerText = todo.data().title;
            mainDiv.appendChild(div);
            div.appendChild(h3);
            div.appendChild(childDiv);
            childDiv.appendChild(editBtn);
            childDiv.appendChild(deleteBtn);

            div.style.backgroundColor = "#ffffff";
            div.style.display = "flex";
            div.style.padding = "5px 10px";
            div.style.marginBottom = "10px";
            div.style.borderRadius = "10px";
            div.style.border = "1px solid #b9b9b9";
            div.style.justifyContent = "space-between";
            div.style.alignItems = "center";
            editBtn.style.marginRight = "10px";

        })
    }).catch((err) => {
        console.log("Error fetching todos", err);
    })
}
getTodos();

const editFunc = (id) => {
    const docRef = doc(todolist, id)
    getDoc(docRef).then((res) => {
        const todoData = res.data();
        input.value = todoData.title;
        btn.innerText = "Update";
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const updatedObj = {
            title: input.value,
        };
        updateDoc(docRef, updatedObj).then(() => {
            alert("Task updated successfully");
            getTodos();
            input.value = "";
            btn.innerText = "Add Task";
        }).catch((err) => {
            console.log("Error updating task", err);
        })
    })
    // btn.Event Listener End

    })
    // getDoc.then End
    .catch((err) => {
        console.log("Error fetching task for edit", err);
    })
}

const deleteFunc = (id) => {
    const docRef = doc(todolist, id);
    deleteDoc(docRef).then(() => {
        alert("Task deleted successfully");
        getTodos();
    })
        .catch((err) => {
            console.log("Error deleting task", err);
        })
}