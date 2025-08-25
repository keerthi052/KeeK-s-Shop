import { useState } from "react";
import "../Styles/app.css";

const Passproduct = () => {
  const [items, setItems] = useState([
    { cid: 1, label: "HTML & CSS", checked: true },
    { cid: 2, label: "JavaScript", checked: false },
    { cid: 3, label: "React", checked: true },
  ]);

  const [inputText, setInputText] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const handleChecked = (id) => {
    const newItems = items.map((item) =>
      item.cid === id ? { ...item, checked: !item.checked } : item
    );
    setItems(newItems);
  };

  const handleEdit = (cid, label) => {
    setIsEdit(true);
    setCurrentId(cid);
    setInputText(label);
  };

  const handledelete = (id) => {
    const newItems = items
      .filter((item) => item.cid !== id)
      .map((item, index) => ({ ...item, cid: index + 1 }));
    setItems(newItems);
  };

  const handleAddOrSave = () => {
    if (!inputText.trim()) return;

    if (isEdit) {
      const updatedItems = items.map((item) =>
        item.cid === currentId ? { ...item, label: inputText } : item
      );
      setItems(updatedItems);
      setIsEdit(false);
      setCurrentId(null);
    } else {
      const newItem = {
        cid: items.length + 1,
        label: inputText,
        checked: false,
      };
      setItems([...items, newItem]);
    }

    setInputText("");
  };

  return (
    <div className="content">
      <ul>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button onClick={handleAddOrSave}>{isEdit ? "Save" : "Add"}</button>

        {items.map((item) => (
          <li key={item.cid}>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => handleChecked(item.cid)}
            />
            <label>{item.label}</label>
            <button onClick={() => handleEdit(item.cid, item.label)}>Edit</button>
            <button onClick={() => handledelete(item.cid)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Passproduct;
