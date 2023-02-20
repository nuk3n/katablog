import './tag.scss';

function Tag({ id, onTagRemove }) {
  return (
    <div className="articlePage__tag">
      <input type="text" placeholder="Tag" className="articlePage__tagInput" />
      <button type="button" className="articlePage__tagDeleteButton" onClick={() => onTagRemove(id)}>
        Delete
      </button>
    </div>
  );
}

export default Tag;
