import React, { useState, useEffect, useRef } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { motion, useAnimation } from 'framer-motion';

function Note({ id, content, editing, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(editing);
  const [editedContent, setEditedContent] = useState(content);
  const textAreaRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    if (isEditing && textAreaRef.current) {
      textAreaRef.current.focus();
      textAreaRef.current.selectionStart = textAreaRef.current.selectionEnd = textAreaRef.current.value.length;
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);

    if (textAreaRef.current) {
      textAreaRef.current.selectionStart = textAreaRef.current.selectionEnd = textAreaRef.current.value.length;
    }
  };

  const handleUpdate = () => {
    setIsEditing(false);
    onUpdate(id, editedContent);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(content);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleUpdate();
    }
  };

  const handleBlur = () => {
    handleUpdate();
  };

  useEffect(() => {
    controls.start({ opacity: 1 });
  }, [controls]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={controls} className={`note${isEditing ? ' editing' : ''}`}>
      <div className="note-header">
        <span className="icon" onClick={handleEdit}>
          <FaEdit />
        </span>
        <span className="icon" onClick={() => onDelete(id)}>
          <FaTrashAlt />
        </span>
      </div>
      {isEditing ? (
        <>
          <textarea
            ref={textAreaRef}
            className="note-content"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            autoFocus
          ></textarea>
          <div className="note-buttons">
            <button onClick={handleUpdate}>Save</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </div>
        </>
      ) : (
        <div className="note-content">{editedContent === '' ? 'New note...' : editedContent}</div>
      )}
    </motion.div>
  );
}

export default Note;
