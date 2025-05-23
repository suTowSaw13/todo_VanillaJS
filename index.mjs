const onClickAdd = () => {
  //テキストボックスの値を取得し、初期化する
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  //未完了リストに追加
  createIncompleteTodo(inputText);
};

//渡された引数を基に未完了のTODOを作成する関数
const createIncompleteTodo = (todo) => {
  //li生成
  const li = document.createElement("li");

  //div生成
  const div = document.createElement("div");
  div.className = "list-row";

  //p作成
  const p = document.createElement("p");
  p.className = "todo-item";
  p.innerText = todo;

  //button（完了）生成
  const completerButton = document.createElement("button");
  completerButton.innerText = "完了";
  completerButton.addEventListener("click", () => {
    //押された完了ボタンの親にあるliタグは以下の完了ボタンと削除ボタンを削除
    const moveTarget = completerButton.closest("li");
    completerButton.nextElementSibling.remove();
    completerButton.remove();
    //戻すボタンを生成してdivタグは以下に設定
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    backButton.addEventListener("click", () => {
      //todoの内容を取得して未完了リストに追加
      const todoText = backButton.previousElementSibling.innerText;
      createIncompleteTodo(todoText);
      //押された戻すボタンの親にあるliタグを削除
      backButton.closest("li").remove();
    });
    moveTarget.firstElementChild.append(backButton);
    //完了リストに移動
    document.getElementById("complete-list").appendChild(moveTarget);
  });

  //button（削除）生成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    //押された削除ボタンの親にあるliタグを未完了リストから削除
    const deleteTarget = deleteButton.closest("li");
    document.getElementById("incomplete-list").removeChild(deleteTarget);
  });

  //liタグの子要素に各要素を設定
  div.appendChild(p);
  div.appendChild(completerButton);
  div.appendChild(deleteButton);
  li.appendChild(div);

  //未完了リストに追加
  document.getElementById("incomplete-list").appendChild(li);
};

document.getElementById("add-button").addEventListener("click", onClickAdd);
